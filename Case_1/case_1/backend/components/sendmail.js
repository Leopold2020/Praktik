// sendMail.js
const ElasticEmail = require('@elasticemail/elasticemail-client');

const defaultClient = ElasticEmail.ApiClient.instance;
const apikey = defaultClient.authentications['apikey'];
apikey.apiKey = "B429588BA4813F45490F41701ACFDEFF0A9BA2EF0D3FC9B0A94FF5005BC3EA192FB21B2B30EA1BE1CA6F22CA4A84DDE2";

const api = new ElasticEmail.EmailsApi();

const sendMail = (to, subject, content) => {
    // Construct email message data
    const reciev = to;
    const email = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
            new ElasticEmail.EmailRecipient(to)
        ],
        Content: {
            Body: [
                ElasticEmail.BodyPart.constructFromObject({
                    ContentType: "HTML",
                    Content: content
                })
            ],
            Subject: subject,
            From: "te42023@gmail.com"
        }
    });
    var callback = function(error, data, response) {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully.');
        }
      };
    // Send email
    api.emailsPost(email, callback);
};


module.exports = sendMail;
