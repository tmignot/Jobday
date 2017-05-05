searchCategory = function(event, category) {
	event.preventDefault();
	var f = {category: category};
	var str = Base64.encode(JSON.stringify(f));
	Router.go('/searchMission?filters='+str);
}


Template.allCategorieScreen.events({
	'click #btnhotelRest': function (event) {searchCategory(event, 1);},
	'click #btnServicePersonne': function (event) {searchCategory(event, 5);},
	'click #btnCommerceVente': function (event) {searchCategory(event, 2);},
	'click #btnWebCreation': function (event) {searchCategory(event, 3);},
	'click #btnEvenementiel': function (event) {searchCategory(event, 4);},
	'click #btnTransportLogistique': function (event) {searchCategory(event, 6);},
	'click #btnServiceAdministratif': function (event) {searchCategory(event, 7);},
	'click #btnRedactionTraduction': function (event) {searchCategory(event, 8);},
	'click #btnCours': function (event) {searchCategory(event, 9);},
	'click #btnTourisme': function (event) {searchCategory(event, 10)},
	'click #btnSante': function (event) {searchCategory(event, 11);},
	'click #btnMaisonJardin': function (event) {searchCategory(0);}	
});
