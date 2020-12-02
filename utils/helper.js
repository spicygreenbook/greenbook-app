// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
  
const searchKeysConfig = [
      {key: 'name', multiplier: 10},
      {key: 'address', multiplier: 1},
      {key: 'cuisines', multiplier: 4},
      {key: 'search_terms', multiplier: 4, processMap: (line) => {
          return line.term
      }},
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
  
export function searchSeries(needle) {
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

function wordSearch(needle, haystack, multiplier, processMap, debug) {
    if (typeof haystack === 'string') {
        haystack = haystack.split(' ')
    }
    if (!processMap){ processMap = line => line; }
    let ar = ((haystack || []).map(processMap).join(' ') || '').toLowerCase().replace(/[^A-Za-z0-9\ ]/gi, '').split(/[^A-Za-z0-9]/).filter(w => (w || w == 0) ? true: false);
    if (debug) {
        console.log('ar', ar)
    }
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

export function fixSearch(words) {
    return (words || '').replace(/\+/, ' ').replace(/[^A-Za-z0-9 ]/gi, '');
}

function sortDistance(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}

function sortSearchRank(a, b) {
    if (a._searchRank > b._searchRank) {
        return -1;
    }
    if (a._searchRank < b._searchRank) {
        return 1;
    }
    return 0;
}

function searchRank(processedSearchTerms, row) {
    let searchRank = 0;

    processedSearchTerms.words.forEach(searchNeedle => {
        searchKeysConfig.forEach(searchConfig => {
            if (row[searchConfig.key]) {
                searchRank += wordSearch(searchNeedle, row[searchConfig.key], searchConfig.multiplier, searchConfig.processMap).score;
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

export function findListings (listings, geoLocation, keywords) {
    const filter = (row) => {
        var go = true;
        if (keywords.words.length) {
            row._searchRank = searchRank(keywords, row)
            if (!row._searchRank) {
                go = false;
            }
        }

        if (geoLocation) {
            if (!row.geocoordinates) { 
                row.geocoordinates = {}; 
            }

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

    return listings.filter(filter).sort(sortDistance).sort(sortSearchRank);
};