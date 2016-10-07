Accounts.config({
	forbidClientAccountCreation: true
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1081613621860903',
    secret: 'f9be86c3944ecdda0801942f9154ebb7'
});


ServiceConfiguration.configurations.update(
    { "service": "linkedin" },
    {
      $set: {
        "clientId": "77wg97iklzkqyn",
        "secret": "bIoc9DDQMPr7NbWw"
      }
    },
    { upsert: true }
  );

ServiceConfiguration.configurations.remove({
  service: "google"
});


ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "479545754930-ejfinvlle7p0fe7pmpek4jl8j6q2algb.apps.googleusercontent.com",
  secret: "m5O4iHhUipp7BpIhNVfIuLMD"
});
