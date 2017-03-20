Template.badge.events({
	'click button': function(e,t) {
		if (t.data.name != 'Telephone' &&
				t.data.name != 'Mail')
		Modal.show('modalVerif' + t.data.name, t.parent(2).data);
	}
});

Template.modalVerifIdentite.onCreated(function() {
	this.uploading = new ReactiveVar(false);
	this.uploadCount = new ReactiveVar('');
});
Template.modalVerifIdentite.helpers({
	uploading: function() { return Template.instance().uploading.get(); },
	uploadCount: function() { return Template.instance().uploadCount.get(); },
});
Template.modalVerifIdentite.events({
	'click .confirm': function(e,t) {
		Modal.allowMultiple = true;
		var user = t.data.userId;
		UploadImage({ //See client/helpers.js for a better looking of this function
			doc: $('#idCardRectoInput')[0],
			name: user + '_idCardRecto_' + Date.now(),
			maxWidth: 300,
			maxHeight: 300,
			onBeforeCompress: function() { 
				t.uploadCount.set('0/2');
				t.uploading.set(true);
			},
			onAfterUpload: function(error, file) {
				if (!error) {
					var idRecto = Images.link(file);
					t.uploadCount.set('1/2');
					UploadImage({ //See client/helpers.js for a better looking of this function
						doc: $('#idCardVersoInput')[0],
						name: user._id + '_idCardVerso_' + Date.now(),
						maxWidth: 300,
						maxHeight: 300,
						onAfterUpload: function(error, file) {
							if (!error) {
								t.uploadCount.set('2/2');
								var idVerso = Images.link(file);
								Meteor.call('sendEvent', {
									userEmitter: user,
									type: 'ask_identity_validation',
									data: {
										recto: idRecto,
										verso: idVerso
									}
								}, function (e,r) {
									if (e) { Modal.show('serverErrorModal', e);	} 
									else {
										Modal.hide('modalVerifIdentite');
										Modal.show('modalSuccess', {
											message: 'Vos documents ont bien etes telecharge, nous allons traiter votre demande'
										});
									}
								});
							} else
								Modal.show('errorModal', {invalidKeys: [{message: error.message}]});
							t.uploading.set(false);
						}
					});								
				} else {
					Modal.show('errorModal', {invalidKeys: [{message: error.message}]});
					t.uploading.set(false);
				}
			}
		});
	}
});

Template.modalVerifPro.onCreated(function() {
	this.uploading = new ReactiveVar(false);
});
Template.modalVerifPro.helpers({
	uploading: function() { return Template.instance().uploading.get(); },
});
Template.modalVerifPro.events({
	'click .confirm': function(e,t) {
		Modal.allowMultiple = true;
		var user = t.data.userId;
		UploadImage({ //See client/helpers.js for a better looking of this function
			doc: $('#licenseProInput')[0],
			name: user + '_pro_' + Date.now(),
			maxWidth: 300,
			maxHeight: 300,
			onBeforeCompress: function() {t.uploading.set(true);},
			onAfterUpload: function(error, file) {
				if (!error) {
					var license = Images.link(file);
					Meteor.call('sendEvent', {
						userEmitter: user,
						type: 'ask_pro_validation',
						data: {
							license: license
						}
					}, function (e,r) {
						if (e) { Modal.show('serverErrorModal', e);	} 
						else {
							Modal.hide('modalVerifPro');
							Modal.show('modalSuccess', {
								message: 'Vos documents ont bien etes telecharge, nous allons traiter votre demande'
							});
						}
					});
				} else
					Modal.show('errorModal', {invalidKeys: [{message: error.message}]});
				t.uploading.set(false);
			}
		});
	}
});

Template.badge.helpers({
	userHasBadge: function(id) {
		var p = Template.parentData();
		if (_.findWhere(p.badges, {badgeId: id}))
			return true;
		return false;
	}
});


