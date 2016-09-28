
Template.dashboardJobber.helpers({
    currentUser: function () {
         
    //      console.log("jonas");
   //  console.log(Meteor.users.findOne({_id: Meteor.userId()}).services );
      //  ;    
        
      return Meteor.users.findOne({_id: Meteor.userId()}).services ;
    }
  });
  


/*
Template.dashboardJobber.helpers({
    UserProfil: function () {
         var UserActuel = new Object();
        FB.api(
        '/me',
        'GET', {
            "fields": "id,last_name,birthday,age_range,context,currency,devices,education,email,first_name,gender,hometown,interested_in"
            
        },
        function (response) {
            console.log(response); // Insert your code here
            //document.getElementById('status').innerHTML =                'Thanks for logging in, ' + response.name + '!';
            
            
            
       
            
    UserActuel.id = response.id;
    UserActuel.Nom = response.last_name;
    UserActuel.Prenom = response.first_name;
UserActuel.birthday = response.birthday  ;
UserActuel.devices = response.devices  ;
UserActuel.education = response.education  ;
UserActuel.email = response.email  ;
UserActuel.gender = response.gender  ;
UserActuel.hometown = response.hometown  ;
UserActuel.languages = response.languages  ;
UserActuel.locale = response.locale  ;
UserActuel.location = response.location ;
UserActuel.urlPhoto1 = "http://graph.facebook.com/" + response.id + "/picture" ;

  
            
            
            
            
        }
        
     
        
        
    );

      FB.api("/me/picture?width=180&height=180",  function(response) {
UserActuel.urlPhoto1 = response.data.url ;
        console.log(response.data.url);

});  
    //Session.set("UserProfil", UserActuel);   
      //  console.log(Session.get("UserProfil"));
        
      return UserActuel;
    }
  });


*/
Template.profiluser.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');
        
        //console.log(Meteor.userId());
        
        
        
    }
}
Template.profiluser.helpers({
    currentUser: function () {
         
    //      console.log("jonas");
     //console.log(Meteor.users.findOne({_id: Meteor.userId()}).services );
      //  ;    
        
      return Meteor.users.findOne({_id: Meteor.userId()}) ;
    }
  });