import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const LIST_ID = "e09a86d809";

async function handler(req, res) {
  try {
    const { name, email } = JSON.parse(req.body);
    const response = await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
      }
    });
    res.json(response);
  } catch (e) {
    let error = 'Internal Server Error';
    const { detail } = JSON.parse(e.response.text);
    if (detail.includes('already a list member')) {
      error = 'You are already subscribed.'
    } else {
      error = detail;
    }
    res.status(500).json({ error });
  }
};

module.exports = handler;
