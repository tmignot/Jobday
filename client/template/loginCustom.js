
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
Template.loginCustom.events({
		'click a': function() {
			Modal.allowMultiple = true;
			$('#myModal').modal('hide');
			Modal.show('forgottenPasswordModal');
		},
    'click #googlebtn': function (event) {
			event.preventDefault();
			Meteor.loginWithGoogle({}, function (err) {
				if (err)
					throw new Meteor.Error("Google login failed");
				else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
							myFunction("Etat de Connexion","Bonjour vous êtes Connecté,\n Bonne Recherche","Bienvenue");
			
				}
			});
    },
    'click #jobdaybtn': function (event) {
			event.preventDefault();
			var emailVar = $('#loginEmail').val();
			var passwordVar = $('#loginPassword').val();
			Meteor.loginWithPassword(emailVar, passwordVar, function (err) {
				if (err) {
					$('.modal-body .has-error').removeClass('hidden');
				} else {
					$('.modal-body .has-error').addClass('hidden');
					$('#myModal').modal('hide');
					if (Roles.userIsInRole(Meteor.userId(), 'admin')) 
						Router.go('/admin');
					else {
						Router.go('/profiluser/'+Meteor.userId());
						Session.set('firstConnexion', true);
						myFunction("Etat de Connexion","Bonjour vous êtes Connecté,\n Bonne Recherche","Bienvenue");
					}					
				}
			});
			
    },
    'click #linkedInbtn': function (event) {
			event.preventDefault();
			Meteor.loginWithLinkedin({}, function (err) {
				if (err) {
						//throw new Meteor.Error("Linked login failed");
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
				
			
				}
			});
    },
    'click #facebookbtn': function (event) {
			event.preventDefault();
			Meteor.loginWithFacebook({}, function (err) {
				if (err) {
					//	throw new Meteor.Error("Facebook login failed");
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
					
				}
			});
    }
});
