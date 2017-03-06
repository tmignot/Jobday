Template.adminUsersPage.onCreated(function() {
	var query = Router.current().params.query;
	var sortBy = 'createdAt', sortOrder = 1, sort = {}, 
			filter = '';
	if (query && query.sortBy) {
		if (_.contains(['createdAt', 'name', 'userType', 'address.city'], query.sortBy))
			sortBy = query.sortBy;
	}
	if (query && query.sortOrder) {
		if (query.sortOrder == 'desc')
			sortOrder = -1;
	}
	if (query && query.filter)
		filter = query.filter;
	sort[sortBy] = sortOrder;
	this.searchOpt = new ReactiveVar({
		sort: sort,
		filter: filter
	});
	setSearchOpt(filter, sort);
});

Template.adminUsersPage.onRendered(function() {
	var so = this.searchOpt.get();
	var sortBy = _.first(_.keys(so.sort));
	var sortOrder = _.first(_.values(so.sort));
	var filter = so.filter;
	$('select[name="sorting-options"]').val(sortBy);
	$('select[name="sorting-order"]').val(sortOrder);
	$('#searchQuery').val(filter);
});

Template.adminUsersPage.events({
	'click .search.button': function(e,t) {
		var sort = {},
				sortBy = $('select[name="sorting-options"]').val(),
				sortOrder = parseInt($('select[name="sorting-order"]').val());
		sort[sortBy] = sortOrder;
		var filter = $('#searchQuery').val();
		UrlQuery({
			p: 'users',
			sortBy: sortBy,
			sortOrder: sortOrder == 1 ? 'asc' : 'desc',
			filter: filter
		});
		setSearchOpt(filter, sort);
	}
});

var setSearchOpt = function(filter, sort) {
	var rx = new RegExp(filter, 'i');
	UsersDatasPages.set('filters', {$or: [
		{name: rx},
		{firstname: rx},
		{'address.city': rx},
		{'address.zipcode': rx},
		{phone: rx}
	]});
	UsersDatasPages.set('sort', sort);
};

Template.adminAdminPage.events({
	'click .form .button': function(e,t) {
		var firstname = t.find('#newAdminFirstnameInput').value;
		var name = t.find('#newAdminNameInput').value;
		var email = t.find('#newAdminEmailInput').value;
		console.log(firstname, name, email);
		if (email.match(SimpleSchema.RegEx.Email)) {
			Modal.show('confirmationModal', {
				message: 'Vous etes sur le point de donner des droits '+
								 'd\'administration au proprietaire de l\'adresse '+
								 '<strong>'+email+'</strong>',
				onConfirm: function() {
					Modal.allowMultiple = true;
					Modal.hide('confirmationModal');
					Meteor.call('addAdmin', email, firstname, name, function(e,r) {
						if (e) 
							Modal.show('serverErrorModal', e);
						else
							Modal.show('modalSuccess', {message: 'Un nouvel administrateur a bien ete ajoute'});
					});
				}
			});
		} else
			Modal.show('errorModal', {invalidKeys: [{message: "L'adresse Email n'est pas au bon format"}]});
	},
	'click .revoquer': function(e,t) {
		var uid = $(e.currentTarget).data('user-id');
		var udata = UsersDatas.findOne({userId: uid}),
				uname;
		if (udata)
			uname = udata.userType == 'society' ? udata.name : udata.firstname + ' ' + udata.name;
		Modal.show('confirmationModal', {
			message: 'Vous etes sur le point de revoquer les privilege de '+
							 '<strong>'+uname+'</strong>',
			onConfirm: function() {
				Modal.allowMultiple = true;
				Modal.hide('confirmationModal');
				Meteor.call('removeAdmin', uid, function(e,r) {
					if (e)
						Modal.show('serverErrorModal', e);
					else
						Modal.show('modalSuccess', {message: 'Les droits de '+uname+' ont bien etes revoques'});
				});
			}
		});
	}
});

Template.adminAdminPage.helpers({
	adminList: function() { 
		return Roles.getUsersInRole('admin');
	}
});
