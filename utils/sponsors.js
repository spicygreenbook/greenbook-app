
export const sponsorLevels = [
	{
		title: 'Seed',
		amount: '500',
		description: `It all starts with a seed! As a Seed Sponsor, your contribution of $500-$999 supports SGB on
our mission to help Black-owned businesses grow.
As a thanks, you’ll get your small logo on our website and a SGB Ceramic Mug!`,
		image: 'seed',
	},
	{
		title: 'Earth',
		amount: '1K',
		description: `Our Earth Sponsors ground us. Your $1,000 - $1,999 contribution ensures businesses get the
marketing support needed to plant roots in their communities.
You’ll get your small logo on our website and other marketing collateral, plus a SGB Face Mask so
you can show your support for Black-owned businesses wherever you go.`,
		image: 'earth',
	},
	{
		title: 'Water',
		amount: '2K',
		description: `Water helps all things grow. Those who contribute $2,000 - $2,999 help us provide vital
resources to Black-owned businesses through marketing support and professional services.
Water Sponsors get their small logo on our website and other marketing collateral, a shout out
on social media, and an exclusive SGB color-changing mug`,
		image: 'water',
	},
	{
		title: 'Light',
		amount: '3K',
		description: `Help brighten the path forward for Black-owned businesses with your contribution in the
$3,000 - $3,999 range.
Our way of saying thanks to Light Sponsors is with a small logo on our website and other
marketing collateral, a shout out on social media, one donor pass, plus a SGB tote that’s perfect
for grocery runs or picnics in the park.`,
		image: 'light',
	},
	{
		title: 'Sprout',
		amount: '4K',
		description: `Now we’re really growing! Sprout Sponsors who contribute $4,000 - $4,999 play a vital role in
helping Black-owned businesses thrive.
We’ll show our gratitude by placing your small logo on our website, exhibition stand, and other
marketing collateral. You’ll also receive a shout out on social media, two donor passes, and a
SGB Apron so you can cook up a storm.`,
		image: 'sprout',
	},
	{
		title: 'Ramekin',
		amount: '5K',
		description: `Ramekins are the stars of the kitchen. $5,000 - $9,999 contributions give Black-owned
businesses an extra boost.
To show our appreciation, you get your small logo on our website/other marketing collateral, a
feature on our materials/exhibition stand, a shout out on social media, two donor passes, plus a
digital recognition item of your choice which could be an emblem, co-sponsored post,
promotional post, etc.`,
		image: 'ramekin',
	},
	{
		title: 'Rolling Pin',
		amount: '10K',
		description: `Rolling Pin Sponsors play an essential role in helping to level out inequalities in the food industry.
Your generous contribution of $10,000-$14,999 provides vital funding, marketing support, and
other services to Black-owned businesses.
You’ll get your medium logo on our website and marketing collateral, a feature on our materials/
exhibition stand, a shout out on social media, four donor passes, and a digital recognition item.`,
		image: 'rolling-pin',
	},
	{
		title: 'Spatula',
		amount: '15K',
		description: `With the help of your $15,000-$19,999 contribution, SGB will be well on our way to flipping
systemic racism across the US. We can’t thank you enough for your generous contribution.
As a token of our appreciation, you’ll get your medium logo on our website and other marketing
collateral, a feature on our materials/exhibition stand, a shout out on social media and in our
newsletter, six sponsor passes, plus a physical and digital recognition item.`,
		image: 'spatula',
	},
	{
		title: 'Martini Glass',
		amount: '20K',
		description: `Contributors in the $20,000 - $24,999 range are the ultimate in shaking things up. Create a
lasting impact on the Black-business owners we work with from Caribbean kitchen masters to
cupcake queens to bar owners.
We thank our Martini Glass Sponsors with one of our top partnership packages: large logo on
our website/other marketing collateral, feature on our materials/exhibition stand, shout out on
social media and in our newsletter, 8 sponsor passes, and a physical and digital recognition item. `,
		image: 'martini-glass',
	},
	{
		title: 'Ladle',
		amount: '25K+',
		description: `As a Ladle Sponsor, your generous contribution of $25,000+ will really get things cooking. Not
only will you help Black-owned businesses gain equal access to business resources, you will also
help serve up a richer food scene, integrated communities, and a better society for us all.
Our ultimate partnership package includes your large logo on our website and other marketing
collateral, a feature on our materials/exhibition stand, a shout out on social media and in our
newsletter, 10 sponsor passes, and a physical and digital recognition item of your choosing.`,
		image: 'ladle',
	},
];

let _states = {"AL":"ALABAMA","AK":"ALASKA","AS":"AMERICAN SAMOA","AZ":"ARIZONA","AR":"ARKANSAS","CA":"CALIFORNIA","CO":"COLORADO","CT":"CONNECTICUT","DE":"DELAWARE","DC":"DISTRICT OF COLUMBIA","FM":"FEDERATED STATES OF MICRONESIA","FL":"FLORIDA","GA":"GEORGIA","GU":"GUAM GU","HI":"HAWAII","ID":"IDAHO","IL":"ILLINOIS","IN":"INDIANA","IA":"IOWA","KS":"KANSAS","KY":"KENTUCKY","LA":"LOUISIANA","ME":"MAINE","MH":"MARSHALL ISLANDS","MD":"MARYLAND","MA":"MASSACHUSETTS","MI":"MICHIGAN","MN":"MINNESOTA","MS":"MISSISSIPPI","MO":"MISSOURI","MT":"MONTANA","NE":"NEBRASKA","NV":"NEVADA","NH":"NEW HAMPSHIRE","NJ":"NEW JERSEY","NM":"NEW MEXICO","NY":"NEW YORK","NC":"NORTH CAROLINA","ND":"NORTH DAKOTA","MP":"NORTHERN MARIANA ISLANDS","OH":"OHIO","OK":"OKLAHOMA","OR":"OREGON","PW":"PALAU","PA":"PENNSYLVANIA","PR":"PUERTO RICO","RI":"RHODE ISLAND","SC":"SOUTH CAROLINA","SD":"SOUTH DAKOTA","TN":"TENNESSEE","TX":"TEXAS","UT":"UTAH","VT":"VERMONT","VI":"VIRGIN ISLANDS","VA":"VIRGINIA","WA":"WASHINGTON","WV":"WEST VIRGINIA","WI":"WISCONSIN","WY":"WYOMING","AE":"ARMED FORCES AFRICA \/ CANADA \/ EUROPE \/ MIDDLE EAST","AA":"ARMED FORCES AMERICA (EXCEPT CANADA)","AP":"ARMED FORCES PACIFIC", "ON": "ONTARIO"};
export const statesObj = {};
export const statesObjRev = {};
Object.keys(_states).forEach(abbr => {
    statesObj[abbr.toLowerCase()] = _states[abbr].toLowerCase();
    statesObjRev[_states[abbr].toLowerCase().replace(/[^a-z]/g, '')] = abbr.toLowerCase();
    statesObjRev[_states[abbr].toLowerCase()] = abbr.toLowerCase();
})
//https://stackoverflow.com/questions/5097875/help-parsing-string-city-state-zip-with-javascript

export function getListingsByState(listings) {
    let ret = {};

    if (listings) {
        let problem_list = [];
        listings.forEach(listing => {
            if (listing.address) {
                let addr = listing.address.join("\n").trim();
                let parsed = parseAddress(addr);
                if (addr && (!parsed.city || !parsed.state || (!statesObj[parsed.state.toLowerCase()] && !statesObjRev[parsed.state.toLowerCase().replace(/[^a-z]/g, '')]))) {
                    //console.log('addr', addr, 'parsed', parsed)
                    problem_list.push({
                        id: listing.id,
                        name: listing.name.join(''),
                        _address: listing.address,
                        address: addr,
                        parsed: parsed
                    })
                } else if(parsed.state && parsed.city){


                    let _parsed_state = parsed.state.toLowerCase().replace(/[^a-z]/g, '');
                    let _state = statesObj[_parsed_state];
                    if (!_state && statesObjRev[_parsed_state]) {
                        _state = statesObj[statesObjRev[_parsed_state]]
                    }
                    let _city = parsed.city.toLowerCase();
                    if (_state) {
                        _state = _state.replace(/[^a-z]/g, '');
                    }

                    if (_city && _state) {
                        if (!ret[_state]) {
                            ret[_state] = {
                                _count: 0,
                                _state: _state,
                                _listings: []
                            };
                        }
                        if (!ret[_state][_city]) {
                            ret[_state][_city] = {
                                _count: 0,
                                _name: parsed.city,
                                _listings: []
                            }
                        }
                        ret[_state]._count++;
                        ret[_state]._listings.push(listing)
                        ret[_state][_city]._count++;
                        ret[_state][_city]._listings.push(listing)
                    } else {
                        //console.log("missing city and state mapped on", listing.id, listing.uid, parsed)
                    }
                } else {
                    //console.log("missing city and state on", listing.id, listing.uid, parsed)
                }
            }
        })
        console.log('items we could not parse', problem_list.map(item => item.name));
    }
    return ret;
}

export function parseAddress(address) {
    // Make sure the address is a string.
    if (typeof address !== "string") throw "Address is not a string.";
    // Trim the address.
    address = address.trim().replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ').split("\n");
    var has_numbers = !!address[0].replace(/[^0-9]/g, '');
    var returned = {};

    if (has_numbers) {
        if (!address[1]) { address[1] = address[0]; }
        // Make an object to contain the data.
        // Find the comma.
        var comma = address[1].indexOf(',');
        // Pull out the city.
        returned.city = address[1].slice(0, comma);
        // Get everything after the city.
        var after = address[1].substring(comma + 2); // The string after the comma, +2 so that we skip the comma and the space.
        // Find the space.
        var space = after.lastIndexOf(' ');
        // Pull out the state.
        returned.state = after.slice(0, space);
        if (returned.state.indexOf(',')) {
            var spl = returned.state.split(', ');
            returned.state = spl[1];
            returned.city = spl[0];
        }
        // Pull out the zip code.
        returned.zip = after.substring(space + 1);

        if (returned.state && returned.state.indexOf('ON ') === 0) {
            returned.state = 'ON'; // fixed for candada, will need to figure this out
        }
        if (returned.city && !returned.state) {
            // likely missing comma
            var cityPart = '';
            returned.city.split(' ').forEach(part => {
                if (statesObj[part.toLowerCase()] || statesObjRev[part.toLowerCase().replace(/[^a-z]/g, '')]) {
                    returned.state = part;
                } else {
                    cityPart += part + ' '
                }
            });
            if (returned.state) {
                returned.city = cityPart.trim();
            }
        }
        if (!returned.city && returned.state && returned.zip) {
            returned.city = address[1].split(', ')[0].trim();
        }
    } else {
        //assume city, state
        var parts = address[0].split(',');
        if (parts[0] && parts[1]) {
            returned.city = parts[0].trim();
            returned.state = statesObj[parts[1].trim().toLowerCase()];
        }
    }

    // Return the data.
    return returned;
}
