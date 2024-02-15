// sendMail.js
const ElasticEmail = require('@elasticemail/elasticemail-client');

const defaultClient = ElasticEmail.ApiClient.instance;
const apikey = defaultClient.authentications['apikey'];
apikey.apiKey = "8643020A0F6167897D6FBDD81B60D6F17E3E160275F9384218F3A47009D4AB140DA4C43B03578E99233474810BD9748A";

const api = new ElasticEmail.EmailsApi();

const sendMail = (to, subject, content) => {
    // Construct email message data
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
            From: "t42023@gmail.com"
        }
    });

    // Send email
    api.emailsPost({ body: email }, (error, data, response) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', data);
        }
    });
};

module.exports = sendMail;
