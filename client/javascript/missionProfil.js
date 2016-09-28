Template.missionProfil.onRendered ( function() {
this.$('#selectTypeAnnonce').selectedIndex = this.typeAnnonce;
console.log("this.typeAnnonce;"+this.annonce);
}
);
Template.missionProfil.rendered =( function() {
this.$('#selectTypeAnnonce').selectedIndex = this.typeAnnonce;
console.log("this.typeAnnonce;"+this.annonce);
}
);
Template.missionProfil.helpers({
		
		btnModifierOK :function (id_Create ) {
			//alert(Meteor.userId());
			
			if(id_Create == Meteor.userId()  ){
				
			if(id_Create != null){
			return true;
			}				
				
			return true;
			
			}else{
				return false;
			}
			
		}
		
		
});
Template.missionProfil.events({
    'click #btnModifierJob': function (event) {
       // event.preventDefault();
       //Router.go('/poster');
	   
	   
    },
	'click #btnFaireOffre': function (event) {
        event.preventDefault();
       //Router.go('/poster');
	  // 
	   if (Meteor.userId() != null){
		   $('#posterOffre').modal()         ; // initialized with no keyboard
$('#posterOffre').modal('show') ;
        }else{
			 alert('Vous devez vous connecter');
			
		}
    }
	
	
	
	 

});