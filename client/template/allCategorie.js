
Template.allCategorieScreen.events({
	 'click #btnhotelRest': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '1');
			Router.go('/searchMission?filters={"category":1}');
	 },
	 'click #btnServicePersonne': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '5');
			Router.go('/searchMission?filters={"category":5}');
	 },
	  'click #btnCommerceVente': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '2');
			Router.go('/searchMission?filters={"category":2}');
	 },
	 'click #btnWebCreation': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '3');
			Router.go('/searchMission?filters={"category":3}');
	 },
	 'click #btnEvenementiel': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '4');
			Router.go('/searchMission?filters={"category":4}');
	 },
	  'click #btnTransportLogistique': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '6');
			Router.go('/searchMission?filters={"category":6}');
	 },
	   'click #btnServiceAdministratif': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '7');
			Router.go('/searchMission?filters={"category":7}');
	 },
	  'click #btnRedactionTraduction': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '8');
			Router.go('/searchMission?filters={"category":8}');
	 },
	  'click #btnCours': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '9');
			Router.go('/searchMission?filters={"category":9}');
	 },
	  'click #btnTourisme': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '10');
			Router.go('/searchMission?filters={"category":10}');
	 },
	  'click #btnSante': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '11');
			Router.go('/searchMission?filters={"category":11}');
	 },
	  'click #btnMaisonJardin': function (event) {
        event.preventDefault();
		Session.set('currentCategory', '0');
			Router.go('/searchMission?filters={"category":0}');
	 }
	
});
