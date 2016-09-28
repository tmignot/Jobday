Router.route('/', function () {
    this.render('home');
	
});
//Router.configure({
  //  layoutTemplate: 'layoutHome',
  //  notFoundTemplate: 'notFound',
  //  loadingTemplate: 'loading',
    //yieldTemplates: {
    //    'mainContenu': {
    //        to: 'mainContenu'
    //    },
    //    'mainMenu': {
    //        to: 'mainMenu'
    //    },
     //   'mainContenu2': {
     //       to: 'mainContenu2'
    //    },
    //}
//});
//Router.route('/', function () {
    // this.render('home');
  //  this.render('home'//, {
       // to: 'mainContenu'
   // }
//	);
//});
Router.route('/searchMission', function () {
this.render('searchMission');

});
Router.route('/allCategorieScreen', function () {
this.render('allCategorieScreen');

});


Router.route('/commentCaMarche', function () {

    this.render('commentCaMarche'//, {
//      //  to: 'mainContenu'
   // }
   );
});
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