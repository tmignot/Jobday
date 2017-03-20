Template.home.onCreated(function() {
	this.topCategories = new ReactiveVar([0, 1, 2]);
	var self = this;
	Meteor.call('topCategories', function(e,r) {
		if (r) {
			var tc = _.map(r, function(e,i) {;
				return {
					_id: e._id,
					name: Categories[e._id].name,
					icon: Categories[e._id].icon
				}
			});
			while (tc.length < 3) {
				if (_.findWhere(tc, {_id: 0})) {
					if (_.findWhere(tc, {_id: 1})) {
						tc.push({
							_id: 2, 
							name: Categories[2].name,
							icon: Categories[2].icon
						});
					}	else {
						tc.push({
							_id: 1, 
							name: Categories[1].name,
							icon: Categories[1].icon
						});
					}
				} else {
					tc.push({
						_id: 0, 
						name: Categories[0].name,
						icon: Categories[0].icon
					});
				}
			}
			self.topCategories.set(tc);
		}
	});
});

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

Template.home.helpers({
	topCategories: function() {
		return Template.instance().topCategories.get();
	}
});
