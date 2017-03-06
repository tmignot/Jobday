Template.home.events({
	'click .subscribe-button': function(e,t) {
		Newsletters.insert({ // add name, mail to Newsletter collection
			name: $('.news-name').val(),
			email: $('.news-mail').val()
		});
		var data = Meteor.call('sendEmailNoreply','Bonjour ' + $('.news-name').val() + '<br>' + 'Vous serez information des nouvelles offres' ,'Abonnements Newsletters',$('.news-mail').val(),
			function(error, result){
   if(error){      alert('Error'+error);   }
   else{    return result;   }
});
		$('.newsletter input').val('');
		
	},
	'click .category-jobs.button': function() { Router.go('allCategories'); },
	'click .all-jobs.button': function() { Router.go('searchMission'); },
	'click .urgent-jobs.button': function() { 
		Session.set('dateBeginning', 'hour');
        	
        Session.set('dateBeginning', 'day');
		Router.go('searchMission');
	},
	'click .category': function(e,t) {
		var c = $(e.currentTarget).data('category');
		if (c) {
			Session.set('currentCategory', c);
			Router.go('/searchMission');
		}
	}
});
