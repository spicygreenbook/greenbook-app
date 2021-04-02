// goes keyname > keyname.png for where the images are in public/icons
// setup is the keyname and then a list of acceptable words to find to map to that icon.

function idSafe(str) {
    if(typeof str !== 'string') { str = ''; }
    return (str || '').replace(/[^a-z0-9]/gi, '');
};

let Services = {
    'catering': ['catering'],
    'delivery': ['delivery'],
    'foodtruck': ['foodtruck'],
    'grocery': ['grocery','store'],
    'mealprep': ['mealprep'],
    'pickup': ['pickup'],
    'popup': ['popup'],
    'restaurant': ['restaurant','dinein'],
    'retail': ['retail'],
    'shipping': ['shipping']
}

function normalize(str) {
    if(typeof str !== 'string') { str = ''; }
    return (str || '').toLowerCase().replace(/[^a-z]/gi, '');
};

export function serviceTagMap(inputService) {
    let match = '';
    let serviceFormatted = normalize(inputService);
    // first we see if this normalized keyword exists in the item.
    Object.keys(Services).map(key => {
        if (Services[key].indexOf(serviceFormatted) > -1) {
            match = key;
        }
    })
    if (!match) {
        // second pass if there is no match we will find a partial
        Object.keys(Services).map(key => {
            Services[key].forEach(keyword => {
                if (serviceFormatted.indexOf(keyword) > -1) {
                    match = key;
                }
            })
        })
    }
    return match;
}