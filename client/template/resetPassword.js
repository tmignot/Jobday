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

Template._enrollAccountDialog.onRendered(function() {
	$('#modal_reset-pass').on('hidden.bs.modal', function (e) {
		Accounts._loginButtonsSession.set('enrollAccountToken', null);
	})
	$('#modal_reset-pass').modal('show');
});

Template._enrollAccountDialog.events({
	'click #login-buttons-enroll-account-button': function () {
		$('#modal_reset-pass').modal('hide');
	},
	'keypress #enroll-account-password': function (event) {
		if (event.keyCode == 13) 
			$('#modal_reset-pass').modal('hide');
	},
	'click #login-buttons-cancel-enroll-account': function () {
		$('#modal_reset-pass').modal('hide');
	}
});

Template._resetPasswordDialog.onRendered(function() {
	$('#modal_reset-pass').on('hidden.bs.modal', function (e) {
		Accounts._loginButtonsSession.set('resetPasswordToken', null);
	  Accounts._loginButtonsSession.set('justResetPassword', false);
			
	})
	$('#modal_reset-pass').modal('show');
});

Template._resetPasswordDialog.events({
	'click #login-buttons-reset-password-button': function () {
		$('#modal_reset-pass').modal('hide');
	},
	'keypress #reset-password-new-password': function (event) {
		if (event.keyCode == 13) 
			$('#modal_reset-pass').modal('hide');
	},
	'click #login-buttons-cancel-reset-password': function () {
		$('#modal_reset-pass').modal('hide');
	}
});
