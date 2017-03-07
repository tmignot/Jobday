Template.eventCard_abuse.helpers({
	elemName: function() {
		var elem = Template.instance().data;
		var data = elem ? elem.data : undefined;
		if (!data) { return; }
		switch(data.object) {
			case 'advert': return "une annonce";
			case 'offer': return "une offre";
			case 'user': return "un profil utilisateur";
			case 'message': return "une question/reponse";
			default: return;
		}
	},
	elemLink: function() {
		var elem = Template.instance().data;
		var data = elem ? elem.data : undefined;
		if (!data) { return; }
		switch(data.object) {
			case 'advert': return "/adverts/"+data.advertId;
			case 'offer': return "/adverts/"+data.advertId;
			case 'user': return "/profilUser/"+data.userId;
			case 'message': return "/adverts/"+data.advertId;
			default: return;
		}
	}
});

Template.Events.onRendered(function() {
	EventsPages.requestPage(1);
});
