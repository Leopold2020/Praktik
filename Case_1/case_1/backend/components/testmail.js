let ElasticEmail = require('@elasticemail/elasticemail-client');
 
let defaultClient = ElasticEmail.ApiClient.instance;
 
let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = "B429588BA4813F45490F41701ACFDEFF0A9BA2EF0D3FC9B0A94FF5005BC3EA192FB21B2B30EA1BE1CA6F22CA4A84DDE2";
 
let api = new ElasticEmail.EmailsApi()
 
let email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [
    new ElasticEmail.EmailRecipient("victor.dekker@elev.ga.ntig.se")
  ],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "My test email content ;)"
      })
    ],
    Subject: "My test email subject",
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

api.emailsPost(email, callback);
