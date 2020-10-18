function num(num) {
    return (((num || "") + "").replace(/[^0-9\.\-]/gi, "") || 0) * 1;
}

async function handler(req, res) {

    let client_secret

    let json = {};
    let error = '';
    try {
        json = JSON.parse(req.body);
        console.log('json is', json);
    } catch(e) {
        error = 'invalid request'
    }

    if (typeof json.name === 'string' && json.name && json.name.length > 2) {

    } else {
        error = 'Inavlid name';
    }
    if (typeof json.email === 'string' && json.email && json.email.length > 3 && json.email.indexOf('@') > 0 && json.email.indexOf('.') > 0) {

    } else {
        error = 'Invalid email';
    }
    if (typeof json.address === 'string' && json.address && json.address.length > 5) {

    } else {
        error = 'Invalid address';
    }
    if (json.zip && json.zip.length >= 5) {

    } else {
        error = 'inavlid zip';
    }
    if (json.token) {

    } else {
        error = 'invalid credit card';
    }
    if (num(json.amount)){
        json.amount = num(json.amount);
    } else {
        error = 'Invalid amount';
    }


    if (error) {
        return res.json({error: error});
    } else {
        try {
            const stripe = require("stripe")(process.env.STRIPE_SECRET);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: (json.amount * 100),
                receipt_email: json.email,
                description: 'Spicy Green Book Donation',
                statement_descriptor: 'Spicy Green Book',
                currency: "usd",
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            return res.end(JSON.stringify({
                accepted: true,
                name: json.name, 
                amount: json.amount, 
                intentSecret: paymentIntent.client_secret
            }));
        } catch (err) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            return res.end(JSON.stringify({error: err.message}));
        }
    }
};

module.exports = handler;
