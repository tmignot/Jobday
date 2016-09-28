
Template.poster.events({
    'click #posterAnnonce': function (event) {
        event.preventDefault();
        
  
        if (Meteor.userId() != null){
        
                                     var annonce = new Object();
        annonce.annonceID                        = $('#annonceID                ').val();
					annonce.categorieID                        = $('#categorieID                ').val();
					annonce.ssCategorieID                      = $('#ssCategorieID              ').val();
                    annonce.typeAnnonce                        = $('#typeAnnonce                ').val();
                    annonce.titreAnnonce                       = $('#titreAnnonce               ').val();
                    annonce.descriptionAnnonce                 = $('#descriptionAnnonce         ').val();
                    annonce.precisionAnnonce                   = $('#precisionAnnonce           ').val();
                    annonce.outilsAdisposition                 = $('#outilsAdisposition         ').val();
                    annonce.vetementsADispositions             = $('#vetementsADispositions     ').val();
                    annonce.vehiculeNecessaire                 = $('#vehiculeNecessaire         ').val();
					annonce.adresseNumeroRueAnnonce            = $('#adresseNumeroRueAnnonce    ').val();
					annonce.adressetypeRueAnnonce              = $('#adressetypeRueAnnonce      ').val();
                    annonce.adresseRueAnnonce                  = $('#adresseRueAnnonce          ').val();
					annonce.adresseCodePostalAnnonce           = $('#adresseCodePostalAnnonce   ').val();
					annonce.adressePaysAnnonce                 = $('#adressePaysAnnonce         ').val();
                    annonce.choixAnnonceDate1                  = $('#choixAnnonceDate1          ').val();
                    annonce.choixAnnonceDate2                  = $('#choixAnnonceDate2          ').val();
                    annonce.DateAnnonce1                       = $('#DateAnnonce1               ').val();
                    annonce.choixAnnonceDate3                  = $('#choixAnnonceDate3          ').val();
                    annonce.AnnonceDate2                       = $('#AnnonceDate2               ').val();
                    annonce.choixAnnonceDate4                  = $('#choixAnnonceDate4          ').val();
                    annonce.AnnonceDate3                       = $('#AnnonceDate3               ').val();
                    annonce.choixHoraireAnnonce1               = $('#choixHoraireAnnonce1       ').val();
                    annonce.choixHoraireAnnonce2               = $('#choixHoraireAnnonce2       ').val();
                    annonce.choixHoraireAnnonce3               = $('#choixHoraireAnnonce3       ').val();
					annonce.choixHoraireAnnonce4               = $('#choixHoraireAnnonce4       ').val();
                    annonce.choixHoraireAnnonce5               = $('#choixHoraireAnnonce5       ').val();
                    annonce.choixHoraireAnnonceDeb             = $('#choixHoraireAnnonceDeb     ').val();
                    annonce.choixHoraireAnnonce6               = $('#choixHoraireAnnonce6       ').val();
                    annonce.choixHoraireAnnonceFin             = $('#choixHoraireAnnonceFin     ').val();
                    annonce.tarifAnnonce                       = $('#tarifAnnonce               ').val();
                    annonce.TypeTarifAnnonce1                  = $('#TypeTarifAnnonce1          ').val();
                    annonce.TypeTarifAnnonce2                  = $('#TypeTarifAnnonce2          ').val();
                    annonce.nbPersonnePourAnnonce              = $('#nbPersonnePourAnnonce      ').val();
                    annonce.totalAnnonce                       = $('#totalAnnonce               ').val();
        
        
        Meteor.call("annoncePoster", annonce, function (error, result) {
	                console.log(error);
	                console.log(result);
	            });
        
        }else{
			
			$('#myModal').modal()         ; // initialized with no keyboard
$('#myModal').modal('show') ;
		}
        
    }
});