import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getData } from '../utils';
import ListItem from "../components/ListItem";
import Map from "../components/Map";

const searchKeysConfig = [
    {key: 'name', multiplier: 10},
    {key: 'address', multiplier: 1},
    {key: 'cuisines', multiplier: 4},
    {key: 'description', multiplier: 2},
    {key: 'bio', multiplier: 2},
    {key: 'instagram', multiplier: 10},
    {key: 'website_url', multiplier: 2},
]

const fuzzySearch = (string, srch) => {
    //console.log('srch', srch)
    let regy = srch
                .trim()
                .split(/\s+/)
                .map(function (c) {
                    return c.split(" ").join("\\W*");
                })
                .join("|");
    //console.log(regy);
    return (string || "").match(
        RegExp(
            regy,
            "gi"
        )
    );
};
const wordSearch = (needle, haystack, multiplier) => {
    if (typeof haystack === 'string') {
        haystack = haystack.split(' ')
    }
    let ar = ((haystack || []).join(' ') || '').toLowerCase().replace(/[^A-Za-z0-9\ ]/gi, '').split(/[^A-Za-z0-9]/).filter(w => (w || w == 0) ? true: false);
    let score = 0;
    let matches = 0;
    let exact_matches = 0;
    ar.forEach(word => {
        if (word === needle) {
            matches++;
            exact_matches++;
            score += multiplier
        }
        if (word.indexOf(needle) > -1) {
            matches++;
            score += (multiplier * 0.1)
        }
    })
    let ret = {
        matches: matches,
        exact_matches: exact_matches,
        score: score
    }
    //console.log('search ar', needle, 'in', haystack, 'makes', ar, 'returns', ret);
    return ret;
};

const searchSeries = (needle) => {
    //console.log('processing new input', needle)
    let searchWords = ((needle || '') + '').toLowerCase().replace(/[^A-Za-z0-9\ ]/gi, '').split(/[^A-Za-z0-9]/).filter(w => (w || w == 0) ? true: false);
    let searchPhrases = [];
    let tmp_ar = [];
    let counters = {};
    for(let i = 2; i<10;i++) {
        if (searchWords.length >= i) {
            counters = {};
            tmp_ar = [];
            searchWords.forEach((searchNeedle, s) => {
                //console.log('search needle', searchNeedle, 'i', i, 's', s)
                let b = s * 1;
                for (b; b > (s-i); b--) {
                    if (!counters[b]){ counters[b] = 0; }
                    if (b >= 0) {
                        if (!tmp_ar[b]) {
                            if (s < searchWords.length-1) {
                                tmp_ar[b] = searchNeedle;
                                counters[b] ++;
                            }
                        } else {
                            tmp_ar[b] += ' ' + searchNeedle
                            counters[b] ++;
                        }
                    }
                }
            })
            //console.log('tmp len', i, 'makes', tmp_ar, tmp_ar.length, 'counters', counters)
            tmp_ar.forEach((phrase_ar, b) => {
                //console.log('phrase', phrase_ar, 'b', b, 'strlen needed', i, 'counters[b]', counters[b])
                if (counters[b] === i) {
                    searchPhrases.push(phrase_ar);
                }
            })
        }
    }
    //console.log('search', needle, 'becomes series', searchWords, 'and phrases', searchPhrases)
    return {words: searchWords, phrases: searchPhrases};
}

const searchRank = (processedSearchTerms, row) => {
    let searchRank = 0;

    //console.log('terms', processedSearchTerms, 'row', row)

    processedSearchTerms.words.forEach(searchNeedle => {
        searchKeysConfig.forEach(searchConfig => {
            if (row[searchConfig.key]) {
                searchRank += wordSearch(searchNeedle, row[searchConfig.key], searchConfig.multiplier).score;
            }
        })
    })
    processedSearchTerms.phrases.forEach(searchPhrase => {
        searchKeysConfig.forEach(searchConfig => {
            searchRank += (fuzzySearch(((row.name || []).join(' ') || ''), searchPhrase) || []).length * searchConfig.multiplier;
        })
        
    })
    return searchRank;
}

// credit to https://www.geodatasource.com/developers/javascript
function getDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

const sortDistance = (a, b) => {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}
const sortSearchRank = (a, b) => {
    if (a._searchRank > b._searchRank) {
        return -1;
    }
    if (a._searchRank < b._searchRank) {
        return 1;
    }
    return 0;
}

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header3, section, content', {isWeb}));
    console.log('page props', props)


    let debug = false;
    //console.log('list', listings)
    let qs = {};
    let get_width = 1000;
    if (typeof window !== "undefined") {
        debug = window.location.host.indexOf('localhost') > -1
        get_width = window.innerWidth;
        let params = (window.location.search || "")
            .substr(1)
            .split("&")
            .forEach((pair) => {
                var spl = pair.split("=");
                if (spl[0] && spl[1]) {
                    qs[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
                }
            });
    }
    const filter = (row) => {
        //console.log('exec filter on row', processedSearchTerms.words[0]);
        var go = true;
        if (processedSearchTerms.words.length) {
            row._searchRank = searchRank(processedSearchTerms, row)
            if (!row._searchRank) {
                go = false;
            }
        }
        if (geoLocation) {
            if (!row.geocoordinates) { row.geocoordinates = {}; }
            let _distance = getDistance(row.geocoordinates.lat, row.geocoordinates.lng, geoLocation[0], geoLocation[1], 'M');
            if (_distance) {
                row.distance = _distance;
            } else {
                row.distance = 100; // not nearby??
            }
            //console.log('row', row.geocoordinates, 'vs', geoLocation, 'distance', row.distance)
            if (row.distance > 30) {
                go = false;
            }
        }
        return go;
    };

    const [ pageLoading, setPageLoading ] = useState(!props.listings);
    const [ listings, setLitsings ] = useState(props.listings || {});
    const [ results, setResults ] = useState(props.listings || {});

    const [location, setLocation] = useState(qs.near || '');
    const [query, setQuery] = useState(qs.q || '');
    const [geoLocation, setGeoLocation] = useState();
    const [gettingGeo, setGettingGeo] = useState(true);
    const [pushInterval, setPushInterval] = useState(1);

    if (!props.listings) {
        useEffect(() => {
            getData({type: 'listing'}).then(_data => {
                setLitsings(_data)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    useEffect(() => {
        //results
    }, [listings])

    const fixSearch = (words) => {
        return (words || '').replace(/\+/, ' ').replace(/[^A-Za-z0-9 ]/gi, '');
    }
    const [search, setSearch] = useState(fixSearch(query));
    const [processedSearchTerms, setProcessedSearchTerms] = useState(searchSeries(fixSearch(query)));

    const [width, setWidth] = useState(get_width);
    //console.log('filter set list', processedSearchTerms);
    const [filteredList, setFilteredList] = useState([]);

    let timer;
    useEffect(
        () => {
            setSearch(fixSearch(query.q));
            setProcessedSearchTerms(searchSeries(fixSearch(query)));
            if (location) {
                fetch('/api/geocode?query=' + location).then(res => res.json()).then(json => {
                    if (json.coords) {
                        setGeoLocation(json.coords);
                    }
                    setGettingGeo(false);
                }).catch(console.error)
            } else {
                setGettingGeo(false);
            }
        },
        [ pushInterval ]
    );
    useEffect(
        () => {
            //console.log('filter set list', processedSearchTerms);
            setFilteredList(listings.filter(filter).sort(sortDistance).sort(sortSearchRank));
            setPageLoading(false);
        },
        [ listings, geoLocation, processedSearchTerms ]
    );

    if (typeof window !== 'undefined') {
        useEffect(
            () => {
                function handleResize() {
                  setWidth(window.innerWidth)
                }
                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            },
            [ ]
        );
    }

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator size="large" />
            </View>
        : (
            <React.Fragment>
                <View style={{paddingTop: 120}} />
                <View style={{flexDirection: 'row', borderTopWidth: 2, borderColor: Theme.green}}>
                    <View style={dimensions.window.width >= 800 ? {flex: 1, borderRightWidth: 2, borderColor: Theme.green} : {}}>
                        <View style={{padding: 20}}>
                            <Text style={styles.text_header3}>
                                {filteredList.length === 1 ? '1 Match' : filteredList.length + ' Matches'}
                            </Text>
                        </View>
                        <View>
                            {filteredList.map(listing => <ListItem listing={listing} />)}
                        </View>
                    </View>
                    {dimensions.window.width >= 800 &&
                        <View style={{flex: 1, position: 'relative'}}>
                            {!gettingGeo && 
                                <View style={{position: 'fixed', top: 122, right: 0, width: 'calc(50% - 1px)', height: 'calc(100vh - 120px)'}}>
                                    <Map list={filteredList} mode="d" near={geoLocation} />
                                </View>
                            }
                        </View>
                    }
                </View>
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;