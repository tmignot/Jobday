
function myFunction(title1,body1,titleOption) {
    setTimeout(function(){ notifyMe(title1,body1,titleOption); }, 5000);
};

function notifyMe(title1,body1,titleOption) {
var title =title1; 
var options = {
      body: body1,
      icon: "/jobday.png",
	  title: titleOption,
	   tag: "notif1",
	   dir:'auto',
	   
  }
	if (!("Notification" in window)) {  alert("Notifications non supportées par le navigateur"); }
	else if (Notification.permission === "granted") {
	var notification = new Notification(title,options); 
	//var notification = new Notification("Salut toi !");
	}
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
		if(!('permission' in Notification)) { Notification.permission = permission; }
		if (permission === "granted") { 
		var notification = new Notification(title,options);   
		//var notification = new Notification("Salut toi !");
		}
	});
	}
};
this.UserActuel = new Object();

Template.loginCustom.onRendered(function(){
		$('.modal-body .has-error').addClass('hidden');
});

// log a user in with a OAuth service provider
// then route to user profile
Template.NotFound.events({
    'click #envoi': function (event) {
			event.preventDefault();
			var data = Meteor.call('sendEmailNoreply','Email :' + $('#email').val() + '<br>' + $('#message').val().replace(/\r?\n/g, '<br />') ,'Problème',"increased.development@gmail.com",
			function(error, result){
   if(error){      alert('Error'+error);   }
   else{    return result;   }
});
Router.go('/');
				}
			
    ,
    'click #jobdaybtn': function (event) {
			event.preventDefault();
			var emailVar = $('#loginEmail').val();
			var passwordVar = $('#loginPassword').val();
			Meteor.loginWithPassword(emailVar, passwordVar, function (err) {
				if (err) {
					$('.modal-body .has-error').removeClass('hidden');
				} else {
					//console.log(UsersDatas.findOne({userId: Meteor.userId()}));
					//console.log(Meteor.userId());
					
					Router.go('/profiluser/'+Meteor.userId());
					Session.set('firstConnexion', true);
					$('.modal-body .has-error').addClass('hidden');
					$('#myModal').modal('hide');
					myFunction("Etat de Connexion","Bonjour vous êtes Connecté,\n Bonne Recherche","Bienvenue");
					//m = UsersDatas.findOne({userId: Meteor.userId()}).notificationMail;
					
					
					/* if (m && _.contains(m, id)){
					var data = Meteor.call('sendEmailNoreply','Bonjour, Merci de vous êtes connecté ','Connexion',Meteor.user().emails[0].address,
						function(error, result){					
						   if(error){
							  alert('Error'+error);
						   }else{
							  return result;
						   }
						});
					} */
				}
			});
			
    },
    'click #linkedInbtn': function (event) {
			event.preventDefault();
			Meteor.loginWithLinkedin({}, function (err) {
				if (err) {
						throw new Meteor.Error("Linked login failed");
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
									var data = Meteor.call('sendEmailNoreply','Bonjour, Merci de vous êtes connecté ','Connexion',Meteor.user().emails[0].address, function(error, result){
   if(error){
      alert('Error'+error);
   }else{
      return result;
   }
});
				}
			});
    },
    'click #facebookbtn': function (event) {
			event.preventDefault();
			Meteor.loginWithFacebook({}, function (err) {
				if (err) {
						throw new Meteor.Error("Facebook login failed");
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
									var data = Meteor.call('sendEmailNoreply','Bonjour, Merci de vous êtes connecté ','Connexion',Meteor.user().emails[0].address, function(error, result){
   if(error){
      alert('Error'+error);
   }else{
      return result;
   }
});
				}
			});
    }
});
