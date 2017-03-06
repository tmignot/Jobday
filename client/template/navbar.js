Template.navbar.events({
	'click .navbar-brand .dummy-link': function(e) { Router.go('home');	},
    //'click #jobday-logo': function(e) { Router.go('home');	},
	'click .proposerUnJob a': function() { // check profile completion before posting a job
		var d = UsersDatas.findOne({userId: Meteor.userId()});
		if (d) {
			if (d.profileComplete)
				Router.go('poster');
			else
				Modal.show('profileNotComplete');
		} else
			Modal.show('shouldBeLogged');
            //document.getElementById("icon-barmenu").click() ;    
	},
	'click .chercherUnJob a': function() { //document.getElementById("icon-barmenu").click() ;
                                          Router.go('searchMission'); },
	'click .commentCaMarche': function() {// document.getElementById("icon-barmenu").click() ;
                                          Router.go('commentCaMarche');},
	'click .fb-button img': function() {},
	'click .signup-link': function() {
       // document.getElementById("icon-barmenu").click() ;
		$('#signupModal').modal('show');
	},
	'click .login-link': function() {
        //document.getElementById("icon-barmenu").click() ;
		$('#myModal').modal('show');
	},
	'click .logout': function() {
        //document.getElementById("icon-barmenu").click() ;
		Meteor.logout();
	},'click .notifButton' :function(){
		Router.go('/profiluser/'+Meteor.userId());
	
	},
	'click .profile-link': function() { Router.go('profile', {id: Meteor.userId()}); }
});
Template.navbar.helpers({
	numberNotificationALL: function() { // returns the user's hometown
	//console.log(Meteor.userId());
	var idsArray=[];
	idsArray.push(Meteor.userId());
	//console.log(idsArray);
		var aA = UserNotification.find({'owner': Meteor.userId()});
		
		return aA.count();
}
});
Template.cookieAlert.events({
	'click  #ok': function(e) { // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(10*60*1000)); // Ten minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited=yes; expires=" + expiry.toGMTString();
  //alert("En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies pour vous proposer des services et offres adaptés à vos centres d’intérêt.");
    document.getElementById("cookieAlert").remove();
        var elem = document.getElementById("cookieAlert");
 //elem.parentElement.removeChild(elem);
    },
	'click #fermer': function() { // check profile completion before posting a job
        document.getElementById("cookieAlert").remove();
	}
});


Template.cookieAlert.onRendered(function() {
	// create Maps autocomplete API
    if (document.cookie.indexOf("visited") >= 0) {
  // They've been here before.
 // alert("hello again");
        //document.getElementById("cookieAlert").remove();
         document.getElementById("cookieAlert").remove();
        var elem = document.getElementById("cookieAlert");
 //elem.parentElement.removeChild(elem);
}
else {
  // set a new cookie
  //expiry = new Date();
  //expiry.setTime(expiry.getTime()+(10*60*1000)); // Ten minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  //document.cookie = "visited=yes; expires=" + expiry.toGMTString();
  //alert("En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies pour vous proposer des services et offres adaptés à vos centres d’intérêt.");
}
});
