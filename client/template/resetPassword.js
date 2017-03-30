Template.forgottenPasswordModal.events({
	'click .confirm': function(e,t) {
		var email = t.find('#reset-password-email').value;
		Meteor.call('userResetPassword', email, function(e,r) {
			if (e)
				Modal.show('serverErrorModal', e);
			else {
				Modal.hide('forgottenPasswordModal');
				Modal.show('modalSuccess', {
					message: "Un email a ete envoye a l'adresse "+email+
									 " cliquez sur le lien qu'il contient pour reinitialiser votre mot de passe"
				});
			}
		})
	}
});

Template.resetPasswordForm.replaces('_enrollAccountDialog');
Template.resetPasswordForm.replaces('_resetPasswordDialog');
Template.resetPasswordForm.replaces('_justResetPasswordDialog');

Template._enrollAccountDialog.onCreated(function() {
	Tracker.autorun(function(c) {
		if (!Accounts._loginButtonsSession.get('enrollAccountToken') === null){
			$('.modal-backdrop').remove();
			c.stop();
		}
	})
});
Template._resetPasswordDialog.onCreated(function() {
	Tracker.autorun(function(c) {
		console.log('tracker');
		if (Accounts._loginButtonsSession.get('resetPasswordToken') === null){
			$('.modal-backdrop').remove();
			c.stop();
		}
	})
});

Template._enrollAccountDialog.onRendered(function() {
	$('#modal_reset-pass').on('hidden.bs.modal', function (e) {
		Accounts._loginButtonsSession.set('enrollAccountToken', null);
	});
	$('#modal_reset-pass').modal('show');
});

Template._resetPasswordDialog.onRendered(function() {
	$('#modal_reset-pass').on('hidden.bs.modal', function (e) {
		Accounts._loginButtonsSession.set('resetPasswordToken', null);
	  Accounts._loginButtonsSession.set('justResetPassword', false);
	});
	$('#modal_reset-pass').modal('show');
});
