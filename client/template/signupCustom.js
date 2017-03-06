Template.signupCustom.onCreated(function() {
	Session.set('mailSent', 'false');
	Session.set('society', 'false');
});

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
// sign user up with some OAuth service providers
Template.signupCustom.events({
	'click #linkedInbtn': function (e,t) {
		Meteor.loginWithLinkedin({}, function (err) {
				if (err) {
						//throw new Meteor.Error("Linked login failed");
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
				
			
		var corpsHtml ="Débloquer vos badges. <br>Un profil certifié, c'est quatre fois plus de chances d'être sélectionné !<br>  En moins de 5 minutes, obtenez l'ensemble de vos badges ! Certifier son profil, c'est simple et rapide <br>" ;
				 var subjectmail ="[Jobday] Débloquer vos badges";
				Meteor.call("sendEmailNoreplyAccountReseau2",corpsHtml, subjectmail, Meteor.userId());
				
				corpsHtml ="Bonjour et Bienvenue ! <br><br>Sujet : [JOBDAY] Inscription sur Jobday. Bonjour et Bienvenue ! Nous avons le plaisir de vous accueillir au sein de la Communauté Jobday. Votre inscription a bien été validée <br>  <a href=#>Conditions Générales </a> ) " ;
	corpsHtml = corpsHtml +"Pour accéder à votre profil, <a href='http://jobday.fr/profiluser/'"+Meteor.userId()+"> cliquez ici</a> <br><br>";
	corpsHtml = corpsHtml + "N’hésitez pas à nous contacter directement sur contact@jobday.fr <br><br>";	
	corpsHtml = corpsHtml + "A bientôt! <br><br>L’équipe de Jobday.fr";
				subjectmail ="[Jobday] Inscription sur Jobday";
				Meteor.call("sendEmailNoreplyAccountReseau2",corpsHtml, subjectmail, Meteor.userId());
				Meteor.call("connexionReseaux",	Meteor.userId());
				}
			});
	},
	'click #jobdaybtn': function(e,t) {
		
		if (Meteor.userId())
			Meteor.logout();
		var data = getValues('jobday');
		var errors = checkValues(data);
		var emailCreateLogin = data.email;
		var passwordCreateLogin = data.password;
		
		if (errors.length) {
			Modal.allowMultiple = true;
			Modal.show('errorModal', {invalidKeys: errors});
		} else {
			Meteor.call('addUser', data, function(err, res) {
				if (err) {
				//	$('.modal-body .has-error').removeClass('hidden');
					Modal.allowMultiple = true;
					Modal.show('errorModal', {invalidKeys: [{message: "<strong>Email</strong> existe deja"}]});
								
					} else {
					//console.log(UsersDatas.findOne({userId: Meteor.userId()}));
					//console.log(Meteor.userId());
					//console.log(res);
					//Router.go('/profiluser/'+Meteor.userId());
					
					// Session.set('firstConnexion', true);
					// $('.modal-body .has-error').addClass('hidden');
					// $('#myModal').modal('hide');
					// Router.go('/profiluser/'+res);
					// myFunction("Etat de Connexion","Bonjour vous êtes Connecté,\n Bonne Recherche","Bienvenue");
					
					Meteor.loginWithPassword(emailCreateLogin, passwordCreateLogin, function (err) {
				if (err) {
					$('.modal-body .has-error').removeClass('hidden');
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					Session.set('firstConnexion', true);
					$('#signupModal').modal('hide');
					myFunction("Etat de Connexion","Bonjour vous êtes Connecté,\n Bonne Recherche","Bienvenue");
					
				}
			});
					
					
					
					
				}
		});}
	//	console.log(newuser);
	},
	'click #googlebtn': function(e,t) {
		if (Meteor.userId())
			Meteor.logout();
		Meteor.loginWithGoogle({
			requestionPermissions: ['email', 'profile'],
			requestOfflineToken: true,
			loginStyle: 'popup'
		}, function(err) {
			if (err)
				console.log(err);
			else {
				Router.go('profile', {id: Meteor.userId()});
				$('#signupModal').modal('hide');
									var corpsHtml ="Débloquer vos badges. <br>Un profil certifié, c'est quatre fois plus de chances d'être sélectionné !<br>  En moins de 5 minutes, obtenez l'ensemble de vos badges ! Certifier son profil, c'est simple et rapide <br>" ;
				 var subjectmail ="[Jobday] Débloquer vos badges";
				Meteor.call("sendEmailNoreplyAccountReseau1",corpsHtml, subjectmail, Meteor.userId());
				
				corpsHtml ="Bonjour et Bienvenue ! <br><br>Sujet : [JOBDAY] Inscription sur Jobday. Bonjour et Bienvenue ! Nous avons le plaisir de vous accueillir au sein de la Communauté Jobday. Votre inscription a bien été validée <br>  <a href=#>Conditions Générales </a> ) " ;
	corpsHtml = corpsHtml +"Pour accéder à votre profil, <a href='http://jobday.fr/profiluser/'"+Meteor.userId()+"> cliquez ici</a> <br><br>";
	corpsHtml = corpsHtml + "N’hésitez pas à nous contacter directement sur contact@jobday.fr <br><br>";	
	corpsHtml = corpsHtml + "A bientôt! <br><br>L’équipe de Jobday.fr";
				subjectmail ="[Jobday] Inscription sur Jobday";
				Meteor.call("sendEmailNoreplyAccountReseau1",corpsHtml, subjectmail, Meteor.userId());
			Meteor.call("connexionReseaux",	Meteor.userId()); 

			}
		});
	},
	'click #facebookbtn': function(e,t) {
		if (Meteor.userId())
			Meteor.logout();
		Meteor.loginWithFacebook({
			requestionPermissions: ['email', 'public_profile'],
			loginStyle: 'popup'
		}, function(err) {
			if (err)
				console.log(err);
			else {
				Router.go('profile', {id: Meteor.userId()});
				$('#signupModal').modal('hide');
				
			var corpsHtml ="Débloquer vos badges. <br>Un profil certifié, c'est quatre fois plus de chances d'être sélectionné !<br>  En moins de 5 minutes, obtenez l'ensemble de vos badges ! Certifier son profil, c'est simple et rapide <br>" ;
				 var subjectmail ="[Jobday] Débloquer vos badges";
				Meteor.call("sendEmailNoreplyAccountReseau",corpsHtml, subjectmail, Meteor.userId());
				
				corpsHtml ="Bonjour et Bienvenue ! <br><br>Sujet : [JOBDAY] Inscription sur Jobday. Bonjour et Bienvenue ! Nous avons le plaisir de vous accueillir au sein de la Communauté Jobday. Votre inscription a bien été validée <br>  <a href=#>Conditions Générales </a> ) " ;
	corpsHtml = corpsHtml +"Pour accéder à votre profil, <a href='http://jobday.fr/profiluser/'"+Meteor.userId()+"> cliquez ici</a> <br><br>";
	corpsHtml = corpsHtml + "N’hésitez pas à nous contacter directement sur contact@jobday.fr <br><br>";	
	corpsHtml = corpsHtml + "A bientôt! <br><br>L’équipe de Jobday.fr";
				subjectmail ="[Jobday] Inscription sur Jobday";
				Meteor.call("sendEmailNoreplyAccountReseau",corpsHtml, subjectmail, Meteor.userId());
					Meteor.call("connexionReseaux",	Meteor.userId());	
	
				
				
			}
		});
	},
	'change #societyInput': function(e,t) {
		Session.set('society', e.currentTarget.value);
	}
});

function getValues(method) {
	return {
		userType: $('#societyInput').val(),
		name: $('#signupName').val(),
		firstname: $('#signupFirstname').val(),
		email: $('#signupEmail').val(),
		password: $('#signupPassword').val(),
		confirmation: $('#signupPasswordConfirm').val()
	}
};

function checkValues(data) {
	var errors = [];
	if (data.userType != 'society' && !data.firstname)
		errors.push({message: "<strong>Prenom</strong> est requis pour un particulier"});
	if (!data.name)
		errors.push({message: "<strong>Nom</strong> est requis"});
	if (!data.email)
		errors.push({message: "<strong>Email</strong> est requis"});
	if (!data.password)
		errors.push({message: "<strong>Mot de passe</strong> est requis"});
	if (!data.confirmation)
		errors.push({message: "<strong>Confirmation</strong> est requis"});
	if (data.confirmation != data.password)
		errors.push({message: "<strong>Confirmation</strong> et <strong>Mot de passe</strong> doivent etre identiques"});
	return errors;
};
