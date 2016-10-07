Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.onBeforeAction(function() {
	if (!Meteor.userId()) {
		this.redirect('/');
	} else {
		this.next();
	}
}, { only: ['poster']});

Router.route('/', {name: 'home'});
Router.route('/commentCaMarche', {name: 'commentCaMarche'});
Router.route('/searchMission', {name: 'searchMission'});

Router.route('/allCategorieScreen', function () {
this.render('allCategorieScreen');

});

/*
Router.route('/commentCaMarche', function () {

    this.render('commentCaMarche'//, {
//      //  to: 'mainContenu'
   // }
   );
});
*/
Router.route('/poster', function () {

    this.render('poster'//, {
      //  to: 'mainContenu'
   // }
   );
    //  var renderedRegions = this.endRendering();
});
Router.route('/poster/:_id', function () {

// //console.log("rrrr");
//   // console.log(this.params._id);
        
       
    
    this.render('poster', {
		//to: 'mainContenu',
		//name: 'missionProfil',
		data: function() { 
        return { annonce : Annonce.findOne({ _id :  this.params._id }) } ; 
    
    }

      
                                 });
    
});
Router.route('/missionProfil/:_id', function () {

// //console.log("rrrr");
//   // console.log(this.params._id);
        
       
    
    this.render('missionProfil', {
		//to: 'mainContenu',
		//name: 'missionProfil',
		data: function() { 
        return { annonce :  Annonce.findOne({ _id :  this.params._id }) } ; 
    
    }

      
                                 });
    
    
      
    
});

Router.route('/profiluser', function () {



    this.render('profiluser'//, {
     //   to: 'mainContenu'
   // }
   );

    this.render('dashboardJobber'//, {
       // to: 'mainContenu2'
    //}
	);

});
