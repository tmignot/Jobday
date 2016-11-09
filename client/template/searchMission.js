/*
Template.maps.onRendered(function() {
	var mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);   
});
*/
Template.searchMission.helpers({
  settings: function () {
		return {
			position: "top",
      limit: 30, // more than 20, to emphasize matches outside strings *starting* with the filter
      rules: [{ 
				token: '@',
				// string means a server-side collection; otherwise, assume a client-side collection
				collection: Fruits,
				field: 'nomSalarie',
				options: 'i', // Use case-sensitive match to take advantage of server index.
				template: Template.serverCollectionPill,
				noMatchTemplate: Template.serverNoMatch,
				matchAll: true
      },
      {
				//token: '!',
				collection: Fruits, // Mongo.Collection object means client-side collection
				field: 'type',
				matchAll: true, // 'ba' will match 'bar' and 'baz' first, then 'abacus'
				template: Template.serverCollectionLocalisation
      }]
		}
  }
});
