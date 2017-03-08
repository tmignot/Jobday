// submit a message to an advert or show errors
Template.editMessageModal.events({
	'click .confirm': function(e,t) {
		var msg = t.data.current;
		msg.text = t.find('textarea').value;
		Modal.allowMultiple = true;
		Meteor.call('updateMessage', {
			advert: t.data._id,
			message: msg
		}, function(e,r) {
			if (e)
				Modal.show('serverErrorModal', e)
			else {
				Modal.hide('editModalMessage');
				Modal.show('modalSuccess', {message: "Le message a bien ete edite"});
			}
		});
	}
});

Template.message.events({
	'click .edit': function(e,t) {
		var data = t.parent(2).data;
		data.current = t.data;
		Modal.show('editMessageModal', data);
	},
	'click .remove': function(e,t) {
		Modal.show('confirmationModal', {
			message: 'Vous etes sur le point de supprimer ce message.<br>'+
							'ATTENTION: cette action est irreversible!',
			onConfirm: function() {
				Modal.allowMultiple = true;
				Modal.hide('confirmationModal');
				Meteor.call('removeMessage', {
					advert: t.parent(2).data._id,
					message: t.data
				}, function(e,r) {
					if (e)
						Modal.show('serverErrorModal', e)
					else
						Modal.show('modalSuccess', {message: "Le message a bien ete supprimee"});
				});
			}
		});
	}
});

Template.messages.events({
	'click .submit': function(e,t) {
		var ctx = MessageSchema.newContext();
		
		 Session.set('annonceIDPosteMessageCurrent', Template.parentData()._id);
		 //console.log(Session.get('annonceIDPosteMessageCurrent'));
		if (ctx.validateOne({text: t.find('textarea').value}, 'text')) {
			Meteor.call('postMessage', {
				to: {advert: Template.parentData()._id},
				text: t.find('textarea').value
			}, function(err, res) {
				if (err || res)
					Modal.show('errorModal', {invalidKeys: [{message:  'Il est interdit de communiquer des informations personnelles avec les autres utilisateurs'}]});
					else{
						
									//console.log('jonas');
									var data = Meteor.call('sendEmailNoreplyByAnnonce','Bonjour, Une question a été posté  '+ t.find('textarea').value,'OFFRE',Session.get('annonceIDPosteMessageCurrent'),
										function(error, result){					
										   if(error){
											  alert('Error'+error);
										   }else{
											  return result;
										   }
										});
						
			}
						//var data = Meteor.call('sendEmailNoreplyByAnnonce','Bonjour, Une question a été posté ','Question Annonce',Session.get('annonceIDPosteMessageCurrent'), function(error, result){
					   			});
		}	else
			Modal.show('errorModal', ctx.getErrorObject());
	}
});

Template.messages.helpers({
	hasPassed: function() {
		var d = Template.parentData();
		if (d)
			return d.startDate <= new Date();
	},
	societyMessage: function (){
		var d = Template.parentData();
		if (d){
		var d1 = UsersDatas.findOne({userId: Meteor.userId()});
		//alert(d.type);
		if(d.type==0 && (d1.society != true)){
			//alert("1");
			return false;
			}
			else{ 
			//alert("2");
			return true;
			}
		
		
		
		}else{//alert("3"); 
		return false;}
	}
});
