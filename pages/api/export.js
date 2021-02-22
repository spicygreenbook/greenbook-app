import { getData } from '../../utils';

function displayField(val) {
    let type = typeof val;
    if (type === 'string' || type === 'number') {
        return val
    } else if (Array.isArray(val)){
        return val.map(displayField).join('');
    } else if (type === 'object') {
        return JSON.stringify(val);
    } else {
        return 'unknown data type ' + type
    }
}

const listings = async (req, res) => {

  let listings = await getData({
    type: 'listing'
  });

  console.log(listings);
  let cols = Object.keys(listings[0]).filter(key => {
    return key[0] !== '_'
  })

  let table = `
    <table border="1">
    <thead>
    <tr>
        ${cols.map(col => `<td>${col}</td>`).join('')}
    </tr>
    </thead>
    <tbody>
        ${listings.map(listing => 
            `<tr>
                ${cols.map(col => `<td>${displayField(listing[col])}</td>
`).join('')}
            </tr>`
        ).join('')}
    </tbody>
    </table>
  `;

  try {
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html')
    res.send(table);
  } catch (e) {
    const error = e.data && e.data.message || e.message;
    console.log(error);
    res.statusCode = 500;
    res.json({ error });
  }
};

module.exports = listings;

