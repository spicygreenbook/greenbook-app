import fetch from 'isomorphic-unfetch'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export async function getContent(config) {
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
    if (config.type && config.uid) {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(my.${config.type}.uid%2C+%22${config.uid}%22)%5D%5D`
    }

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
        } else if (config.uid && doc.uid === config.uid) {
            content.uid = doc.uid;
            //console.log('doc', doc)
            Object.keys(doc.data[config.type]).forEach(key => {
                if (doc.data[config.type][key].type === 'Group') {
                    content[key] = getPrismicGroupAdvanced(doc.data[config.type][key]);
                } else {
                    content[key] = getPrismicValue(doc.data[config.type][key]);
                }
                content['_' + key] = doc.data[config.type][key];
            })

            if (content.attribution || content.photos_credit_name) {
                if (!content.attribution) { content.attribution = []; }
                let attribution = (content.photos_credit_name ? [{
                    attribution_name: content.photos_credit_name.join('') || '',
                    attribution_type: 'Photography',
                    attribution_instagram: content.photos_credit_instagram || '',
                    attribution_link: content.photos_credit_link || ''
                }] : []);
                //console.log('more attr', content.attribution[0])
                if (content.attribution.length && content.attribution.length) {
                    attribution = attribution.concat(content.attribution);
                } else if (!attribution.length && content.attribution.length){
                    attribution = content.attribution
                }
                attribution = attribution.filter(item => {
                    return item && item.attribution_name && item.attribution_name.trim()
                })
                content.attribution = attribution;
                //console.log('updated attr')
            } else {
                //console.log('didnt even touch attribution');
            }
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

const isLocalWeb = () => (
    typeof window !== 'undefined' && window.location && window.location.host.indexOf('localhost') > -1
);

export async function getInstagram() {
    const url = isLocalWeb() ? 'http://localhost:3000/api/instagram' : 'https://spicygreenbook.org/api/instagram';
    try {
        const result = await fetch(url);
        const data = await result.json();
        if (data.error) throw data;
        return data;
    } catch (e) {
        // console.error(e);
        return [];
    }
}

async function getCacheMeta(setData) {
    let cache_meta;
    if (setData) {
        try {
            console.log('setting cache meta to', setData)
            return await AsyncStorage.setItem('cacheMeta', JSON.stringify(setData))
        } catch(e) {
            console.log('failed to set async storage of cacheMeta')
        }
    } else {
        try {
            cache_meta = await AsyncStorage.getItem('cacheMeta');
            if (!cache_meta) {
                console.log('setting cache meta to default')
                cache_meta = '{}'
            }
            return JSON.parse(cache_meta);
        } catch(e) {
            console.log('failed to fetch or parse cacheMeta')
            return {};
        }
    }
}

export async function getData2(config) {
    // cache wrapper for getDataActual
    let cacheKey = Object.keys(config).filter(key => {
        return typeof config[key] === 'string' || typeof config[key] === 'number'
    }).map(key => {
        return key + ':' + config[key]
    }).join(',');

    console.log('attempting to fetch from cache via key', cacheKey)

    let rightNowSeconds = Math.round(new Date().getTime() / 1000);

    let cacheDuration = (60 * 60 * 1); // 1 hours for now? seems ok to me

    let data_cached;
    let data_object;
    let cache_meta = await getCacheMeta();
    if (cache_meta[cacheKey] && cache_meta[cacheKey].cache_timestamp >= (rightNowSeconds-cacheDuration)) {
        console.log('data is not stale attempt to fetch from cache', cacheKey);
        try {
            data_cached = await AsyncStorage.getItem(cacheKey);
        } catch(e) {
            console.log('error fetching', cacheKey, 'from cache')
        }
        if (data_cached) {
            try {
                data_object = JSON.parse(data_cached);
                console.log('got data for', cacheKey, 'from cache because it is not yet stale')
                return data_object
            } catch(e) {
                console.log('error parsing data for', cacheKey);
            }
        }
    }

    console.log('fetching data over network', cacheKey);
    data_object = await getDataActual(config);
    cache_meta[cacheKey] = {
        cache_timestamp: rightNowSeconds
    }
    getCacheMeta(cache_meta);
    try {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data_object));
    } catch(e) {
        console.log('failed to store cache', cacheKey)
    }

    return data_object;
}

export async function getData(config) {
    if (!config){ config = {}; }
    if (!config.limit) {config.limit = 100}
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
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.listing.home_page_order%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'staff') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.staff.order%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'press') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.press.date%20desc%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    } else if (config.type === 'roles') {
        url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D&orderings=%5Bmy.roles.order%5D${config.limit ? ('&pageSize=' + config.limit) : ''}`;
    }
    if (url) {
        let data;
        try {
            data = await fetch(url);
        } catch(e) {
            console.log('failed to fetch', url)
        }
        let parsed_data = [];
            let getLoop = async (nextInfo) => {
                nextInfo.results.map((doc, i) => {
                    parsed_data.push(doc);
                })
                if (nextInfo.next_page) {
                    console.log('fetching next page', nextInfo.next_page)
                    let data = await fetch(nextInfo.next_page);
                    getLoop(await data.json());
                }
            }
            await getLoop(await data.json());

            //console.log('parsed_data', parsed_data)
            //console.log('parsed', parsed_data)

            rows = parsed_data.map((doc, i) => {
                let content = {
                    id: doc.id,
                    uid: doc.uid,
                    created: new Date(doc.first_publication_date).getTime(),
                    updated: new Date(doc.last_publication_date).getTime(),
                };
                Object.keys(doc.data[config.type]).forEach(key => {
                    if (doc.data[config.type][key].type === 'Group') {
                        content[key] = getPrismicGroupAdvanced(doc.data[config.type][key]);
                    } else {
                        content[key] = getPrismicValue(doc.data[config.type][key]);
                    }
                    content['_' + key] = doc.data[config.type][key];
                })

                if (content.attribution || content.photos_credit_name) {
                    if (!content.attribution) { content.attribution = []; }
                    let attribution = (content.photos_credit_name ? [{
                        attribution_name: content.photos_credit_name.join('') || '',
                        attribution_type: 'Photography',
                        attribution_instagram: content.photos_credit_instagram || '',
                        attribution_link: content.photos_credit_link || ''
                    }] : []);
                    //console.log('more attr', content.attribution[0])
                    if (content.attribution.length && content.attribution.length) {
                        attribution = attribution.concat(content.attribution);
                    } else if (!attribution.length && content.attribution.length){
                        attribution = content.attribution
                    }
                    attribution = attribution.filter(item => {
                        return item && item.attribution_name && item.attribution_name.trim()
                    })
                    content.attribution = attribution;
                    //console.log('updated attr')
                } else {
                    //console.log('didnt even touch attribution');
                }

                return content;
            }).filter(row => {
                if (config.type === 'listing') {
                    if (row.primary_image && row.primary_image.url && row.images && row.images.length) {
                        return true;
                    } else {
                        console.log('filtered out row', row.id, row.uid)
                        return false;
                    }
                } else {
                    return true;
                }
            })
    }
    return rows
}
