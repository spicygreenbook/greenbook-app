
function getPrismicGroupAdvanced(ref) {
    return ref.value.map(line => {
        let ret = {};
        let passValue = line;
        Object.keys(line).forEach(key => {
            ret[key] = getPrismicValue(line[key], key);
        })
        return ret;
    })
}
const getPrismicGroup = (ref, key) => {
    if (!key && ref) {
        let obj = {}
        Object.keys(ref).forEach(key => {
            obj[key] = getPrismicValue(ref[key]);
        })
        return obj
    } else {
        if (ref[key] && (ref[key].type === 'Text' || ref[key].type === 'Select' || ref[key].type === 'Link.web')) {
            return ref[key].value
        } else if (ref[key] && ref[key].type === 'Image') {
            if (ref[key].value.main && ref[key].value.main.url) {
                return {
                    width: ref[key].value.main.dimensions.width,
                    height: ref[key].value.main.dimensions.height,
                    url: ref[key].value.main.url
                }
            } else {
                return null
            }
        } else {
            console.log('get', 'key', key, 'ref', ref)
        }
    }
}

const getPrismicValue = (ref, key) => {
    if (ref) {
        if (ref.type === 'StructuredText') {
            return ref.value.map(line => line.text)
        } else if (ref.type === 'Text' || ref.type === 'Number' || ref.type === 'Select') {
            return Array.isArray(ref.value) ? ref.value.map(line => line.text).join('') : ref.value
        } else if (ref.type === 'Date') {
            let val = Array.isArray(ref.value) ? ref.value.map(line => line.text).join('') : ref.value;
            if (val) {
                var prts = val.split('-');
                val = prts[1] + '/' + prts[2] + '/' + prts[0];
            }
            return val;
        } else if (ref.type === 'Link.web') {
            return ref.value.url
        } else if (ref.type === 'Link.document') {
            let url = '';
            if (ref.value && ref.value.document) {
                if (ref.value.document.type === 'content') {
                    url = '/' + ref.value.document.slug;
                } else if (ref.value.document.type === 'listing') {
                    url = '/biz/' + ref.value.document.slug;
                }
            }
            return url;
        } else if (ref.type === 'GeoPoint') {
            if (!ref.value.latitude &&  !ref.value.longitude) {
                return '';
            } else {
                return {
                    lat: ref.value.latitude,
                    lng: ref.value.longitude
                }
            }
        } else if(ref.type === 'Image') {
            return {
                width: ref.value.main.dimensions.width,
                height: ref.value.main.dimensions.height,
                url: ref.value.main.url
            }
        } else if(ref.type === 'Group') {
            return ref.value.map(item => {
                return getPrismicGroup(item, key)
            }).filter(item => item)
        } else if(ref.type === 'Embed') {
            return ref.value.oembed
        } else {
            console.log('unhandled type', ref)
        }
    } else {
        //console.log('tried passing empty ref', ref, 'with key', key)
    }
    return '';
}

async function getListings(config) {
    if (!config){ config = {}; }
    if (config.ref_id) {
        console.log('using custom master ref', config.ref_id)
        var master_ref = config.ref_id;
    } else {
        var masterRef = await fetch('https://spicygreenbook.cdn.prismic.io/api/v2');
        var masterRef_json = await masterRef.json();
        var master_ref;
        masterRef_json.refs.forEach(line => {
            if(line.id === 'master') {
                master_ref = line.ref;
            }
        })
    }

    let results = [];
    var url = 'https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref='+master_ref+'&q=%5B%5Bat(document.type%2C+%22listing%22)%5D%5D&pageSize=100';
    let data = await fetch(url);
    let getLoop = async (nextInfo) => {
        nextInfo.results.map((doc, i) => {
            results.push(doc);
        })
        if (nextInfo.next_page) {
            console.log('fetching', nextInfo.next_page)
            let data = await fetch(nextInfo.next_page);
            getLoop(await data.json());
        }
    }
    await getLoop(await data.json());

    let allCuisines = new Set();
    let listings = results.map((doc, i) => {

        let images = getPrismicValue(doc.data.listing.images, 'image');
        let primary_image = getPrismicValue(doc.data.listing.primary_image);
        images = (primary_image ? [primary_image] : []).concat(images ? images : []);

        let cuisines = getPrismicValue(doc.data.listing.cuisines, 'cuisine');
        cuisines.forEach(cuisine => {
            allCuisines.add(cuisine);
        })
        let services = getPrismicValue(doc.data.listing.services, 'service');

        if (doc.uid === 'pineapple-express-trap-kitchen') {
            console.log('raw', doc.data.listing)
        }

        let photos_credit_name = getPrismicValue(doc.data.listing.photos_credit_name);
        let photos_credit_link = getPrismicValue(doc.data.listing.photos_credit_link);
        let photos_credit_instagram = getPrismicValue(doc.data.listing.photos_credit_instagram);
        let attribution = (photos_credit_name ? [{
            attribution_name: photos_credit_name.join(''),
            attribution_type: 'Photography',
            attribution_instagram: photos_credit_instagram,
            attribution_link: photos_credit_link
        }] : []).concat(getPrismicValue(doc.data.listing.attribution));

        let listing = {
            id: doc.id,
            _slug: doc.uid,
            _singleRef: doc.href,
            name: getPrismicValue(doc.data.listing.name),
            primary_image: primary_image,
            cuisines: cuisines,
            //_cuisines: cuisines.map(cuisine => { return (cuisine || '').toLowerCase().trim()}).filter(cuisine => cuisine),
            services: services,
            phone_number: getPrismicValue(doc.data.listing.phone_number),
            yelp_link: getPrismicValue(doc.data.listing.yelp_link),
            hours: getPrismicValue(doc.data.listing.hours) || [],
            website_url: getPrismicValue(doc.data.listing.website_url),
            youtube_video: getPrismicValue(doc.data.listing.youtube_video),
            instagram: getPrismicValue(doc.data.listing.instagram),
            geocoordinates: getPrismicValue(doc.data.listing.geocoordinates),
            address: getPrismicValue(doc.data.listing.address),
            description: getPrismicValue(doc.data.listing.description),
            bio: getPrismicValue(doc.data.listing.bio),
            _bio: doc.data.listing.bio || {},
            home_page_order: getPrismicValue(doc.data.listing.home_page_order),
            service_area_radius: getPrismicValue(doc.data.listing.service_area_radius),
            images: images,
            attribution: attribution
        };

        return listing;
    })

    return {
        listings: listings,
        cuisines: Array.from(allCuisines)
        //cuisines: cuisines,
        //neighborhoods: neighborhoods
    }
}



async function getContent(config) {
    if (!config){ config = {}; }
    if (config.ref_id) {
        console.log('using custom master ref', config.ref_id)
        var master_ref = config.ref_id;
    } else {
        var masterRef = await fetch('https://spicygreenbook.cdn.prismic.io/api/v2');
        var masterRef_json = await masterRef.json();
        var master_ref;
        masterRef_json.refs.forEach(line => {
            if(line.id === 'master') {
                master_ref = line.ref;
            }
        })
    }

    var url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D`;
    let data = await fetch(url);
    let parsed_data = await data.json();

    let content = {};
    //console.log('parsed', parsed_data)
    let listings = parsed_data.results.map((doc, i) => {
        if (config.type === 'home_page' && doc.data.home_page) {
            content.uid = doc.uid;
            Object.keys(doc.data.home_page).forEach(key => {
                if (doc.data.home_page[key].type === 'Group') {
                    content[key] = getPrismicGroupAdvanced(doc.data.home_page[key]);
                } else {
                    content[key] = getPrismicValue(doc.data.home_page[key]);
                }
            })
        } else if (config.type === 'content' && config.uid && doc.uid === config.uid) {
            content.uid = doc.uid;
            Object.keys(doc.data.content).forEach(key => {
                if (doc.data.content[key].type === 'Group') {
                    content[key] = getPrismicGroupAdvanced(doc.data.content[key]);
                } else {
                    content[key] = getPrismicValue(doc.data.content[key]);
                }
                content['_' + key] = doc.data.content[key];
            })
        }
    })

    Object.keys(content).forEach(key => {
        if (Array.isArray(content[key])) {
            content[key] = content[key].filter(row => {
                return row !== undefined
            })
        }
    })


    return {
        content
    }
}

async function getUpdates(config) {
    if (!config){ config = {}; }
    if (config.ref_id) {
        console.log('using custom master ref', config.ref_id)
        var master_ref = config.ref_id;
    } else {
        var masterRef = await fetch('https://spicygreenbook.cdn.prismic.io/api/v2');
        var masterRef_json = await masterRef.json();
        var master_ref;
        masterRef_json.refs.forEach(line => {
            if(line.id === 'master') {
                master_ref = line.ref;
            }
        })
    }

    let url;
    let rows = [];
    if (config.type === 'updates'){
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.updates.date%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'staff') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.staff.order%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'staff') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.staff.order%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'press') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.press.date%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    }
    if (url) {
        let data = await fetch(url);
        let parsed_data = await data.json();
        //console.log('parsed_data', parsed_data)

        //console.log('parsed', parsed_data)
        rows = parsed_data.results.map((doc, i) => {
            let content = {};
            Object.keys(doc.data[config.type]).forEach(key => {
                if (doc.data[config.type][key].type === 'Group') {
                    content[key] = getPrismicGroupAdvanced(doc.data[config.type][key]);
                } else {
                    content[key] = getPrismicValue(doc.data[config.type][key]);
                }
                content['_' + key] = doc.data[config.type][key];
            })
            return content;
        })
    }
    return rows
}

async function getData(config) {
    if (!config){ config = {}; }
    if (config.ref_id) {
        console.log('using custom master ref', config.ref_id)
        var master_ref = config.ref_id;
    } else {
        var masterRef = await fetch('https://spicygreenbook.cdn.prismic.io/api/v2');
        var masterRef_json = await masterRef.json();
        var master_ref;
        masterRef_json.refs.forEach(line => {
            if(line.id === 'master') {
                master_ref = line.ref;
            }
        })
    }

    let url;
    let rows = [];
    if (config.type === 'updates'){
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.updates.date%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'listing') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.listing.home_page_order%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'staff') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.staff.order%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'press') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.press.date%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    }
    if (url) {
        let data = await fetch(url);
        let parsed_data = [];
        let getLoop = async (nextInfo) => {
            nextInfo.results.map((doc, i) => {
                parsed_data.push(doc);
            })
            if (nextInfo.next_page) {
                console.log('fetching', nextInfo.next_page)
                let data = await fetch(nextInfo.next_page);
                getLoop(await data.json());
            }
        }
        await getLoop(await data.json());

        console.log('parsed_data', parsed_data)

        //console.log('parsed', parsed_data)
        rows = parsed_data.results.map((doc, i) => {
            let content = {};
            Object.keys(doc.data[config.type]).forEach(key => {
                if (doc.data[config.type][key].type === 'Group') {
                    content[key] = getPrismicGroupAdvanced(doc.data[config.type][key]);
                } else {
                    content[key] = getPrismicValue(doc.data[config.type][key]);
                }
                content['_' + key] = doc.data[config.type][key];
            })
            return content;
        })
    }
    return rows
}

async function getAllData(config) {
    let types = ['listing', 'updates', 'press', 'staff'];
    let ret = {};
    types.forEach(type => {
        /*ret[type] = async getData({
            type: type
        })*/

    })
}


module.exports = {
    getData: getData,
    getAllData: getAllData,
}
