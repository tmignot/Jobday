
Template.allCategorieScreen.events({
	 'click #btnhotelRest': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '1');
			Router.go('/searchMission');
	 },
	 'click #btnServicePersonne': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '5');
			Router.go('/searchMission');
	 },
	  'click #btnCommerceVente': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '2');
			Router.go('/searchMission');
	 },
	 'click #btnWebCreation': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '3');
			Router.go('/searchMission');
	 },
	 'click #btnEvenementiel': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '4');
			Router.go('/searchMission');
	 },
	  'click #btnTransportLogistique': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '6');
			Router.go('/searchMission');
	 },
	   'click #btnServiceAdministratif': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '7');
			Router.go('/searchMission');
	 },
	  'click #btnRedactionTraduction': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '8');
			Router.go('/searchMission');
	 },
	  'click #btnCours': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '9');
			Router.go('/searchMission');
	 },
	  'click #btnTourisme': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '10');
			Router.go('/searchMission');
	 },
	  'click #btnSante': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '11');
			Router.go('/searchMission');
	 },
	  'click #btnMaisonJardin': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '0');
			Router.go('/searchMission');
	 }
	
});
