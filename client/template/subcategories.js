Template.subcategoriesModal.events({
	'click li.list-group-item:not(.active)': function(e,t) {
		$(e.currentTarget).addClass('active');
	},
	'click li.list-group-item.active': function(e,t) {
		$(e.currentTarget).removeClass('active');
	},
	'click .confirm': function(e,t) {
		var ud = UsersDatas.findOne(t.data.user);
		ud.skills[t.data.index] = null;
		var sc = [];
		$('li.list-group-item.active').each(function(i,e) {
			sc.push($(e).data('which'));
		});
		if (sc.length)
			ud.skills[t.data.index] = sc;
		console.log(ud.skills);
		UsersDatas.update({_id: ud._id}, {
			$set: {skills: ud.skills}
		});
	}
});

Template.subcategoriesModal.helpers({
	subcategories: function() {
		return _.map(Categories[Template.instance().data.index].subcategories, function(e,i) {
			return {index: i, name: e};
		});
	},
	userSubcatClass: function(sc) {
		var d = Template.instance().data;
		var ud = UsersDatas.findOne(d.user);
		if (ud.skills[d.index]) {
			if (_.contains(ud.skills[d.index], sc)) {
				return 'active'
			}
		}
	}
});

Template.showSubcategoriesModal.helpers({
	category: function() {
		var d = Template.instance().data;
		return Categories[d.cat].name;
	},
	subcategories: function() {
		var d = Template.instance().data;
		return _.map(d.sub, function(i) {
			return Categories[d.cat].subcategories[i];
		});
	}
});
