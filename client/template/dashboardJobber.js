Template.dashboardJobber.onRendered(function() {
	
	
	Session.set('dispoday', new Date());
	var uid;
	if (this.data)
		uid = this.data._id;
	
	
		 if (UsersDatas.findOne({_id: uid})){
			 //console.log(Meteor.user().services.facebook.email);
if (Meteor.user().emails != undefined){
	if (Meteor.user().emails[0] != undefined){
if (Meteor.user().emails[0].verified && UsersDatas.findOne( {_id: uid, "badges.badgeId": Badges.findOne({"name":"Mail"})._id})== undefined){
		UsersDatas.update(
     { _id: uid },
     { $push: { 
				badges: {
					giver: uid,
					badgeId: Badges.findOne({"name":"Mail"})._id
						} 
			} 
	 }
	 );
	}	;		
}}	
		var m1 = UsersDatas.findOne({_id: uid}).notificationMail;
		//console.log(m1);
		if (m1 && _.contains(m1, 0)){
				//	console.log('jonas');
					if(Session.get('firstConnexion')==true){
					Session.set('firstConnexion', false);	
					var data = Meteor.call('sendEmailNoreply','Bonjour, Merci de vous êtes connecté ','Connexion',Meteor.user().emails[0].address,
						function(error, result){					
						   if(error){
							  alert('Error'+error);
						   }else{
							  return result;
						   }
						});
					}
		}}
	/*
	** initialize fullCalendar with 3 events sources
	** corresponding to morning, afternoon, evening
	** with their own color.
	** Additionally it hooks an function on dayClick
	** to show the editDisponibilities modal
	*/
	$('#dispo-calendar').fullCalendar({
		contentHeight: 250,
		displayEventTime: false,
		dayClick: function(date) {
			var u = UsersDatas.findOne({_id: uid});
			if (u.userId == Meteor.userId()) {
				Session.set('dispoday', new Date(date));
				$('#editDisponibilities').modal('show');
			}
		},
		eventSources: [ 
			{
				// morning
				color: 'blue',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({_id: uid}),
							disp = [];
					if (u && u.disponibilities)
						disp = u.disponibilities
					var events = _.map(_.where(disp, {morning: true}), function(d) {
						return {
							title: 'Matin',
							//dummy start and end dates to garanty events order
							start: (new Date(d.day)).setHours(6),
							end: (new Date(d.day)).setHours(12)
						};
					});
					c(events);
				}
			},
			{
				//afternoon
				color: 'orange',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({_id: uid}),
							disp = [];
					if (u && u.disponibilities)
						disp = u.disponibilities
					var events = _.map(_.where(disp, {afternoon: true}), function(d) {
						return {
							title: 'Apres-midi',
							start: (new Date(d.day)).setHours(12),
							end: (new Date(d.day)).setHours(18)
						};
					});
					c(events);
				}
			},
			{
				//evening
				color: 'gray',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({_id: uid}),
							disp = [];
					if (u && u.disponibilities)
						disp = u.disponibilities
					var events = _.map(_.where(disp, {evening: true}), function(d) {
						return {
							title: 'Soir',
							start: (new Date(d.day)).setHours(18),
							end: (new Date(d.day)).setHours(23)
						};
					});
					c(events);
				}
			}
		]
	});
});
formatDate=function(date) {
	moment.locale('fr');
	return moment(date).format('DD MMMM YYYY');
};
Template.dashboardJobber.helpers({
	missionAnnonceurPayer: function() { // returns the user's hometown
	//console.log(Meteor.userId());
	var idsArray=[];
	idsArray.push(Meteor.userId());
	//console.log(idsArray);
		var aA = Adverts.find({'owner': Meteor.userId(),'status':3}).fetch();
		
		return aA;
	},
	userNotifications : function() { // returns the user's hometown
		var a = UserNotification.find({'owner':Meteor.userId()  }).fetch();
		
		
		return a;
	},
	missionParticiper : function() { // returns the user's hometown
		var a = Adverts.find({'offers.userId':Meteor.userId()  }).fetch();
		
		
		return a;
	},
	missionPoster : function() { // returns the user's hometown
		var a = Adverts.find({'owner':Meteor.userId()  }).fetch();
		
		
		return a;
	},
	missionJobberPayer: function() { // returns the user's hometown
		var a = Adverts.find({'status':3,'offers.userId':Meteor.userId() ,'offers.validated': true }).fetch();
		
		
		return a;
	},
	userAddress: function() { // returns the user's hometown
		var a = Template.instance().data.address;
		if (a && a.city)
			return a.city;
		return 'Non renseigne';
	},
	userAddressFull: function() { // returns the user's hometown
		var a = Template.instance().data.address;
		if (a && a.city && a.street && a.zipcode)
			return a.street + ', ' + a.zipcode+ ' ' + a.city;
		return 'Non renseigne';
	},
	userConnect: function() { // returns the user's hometown
		
		return false;
	},
	userTelephone: function() { // returns the user's hometown
		var a = Template.instance().data;
		//,'offers.userId': Template.instance().data.userId ,'status':3,
		//owner:"P99XS49cYvAdE6JCr"
		var idsArray=[];
		idsArray.push(Template.instance().data.userId);
		var c = Adverts.find({'offers.userId':Meteor.userId()}).count();
		//console.log(Template.instance().data.userId );
		//console.log(c);
		
		if (a && a.phone && Meteor.userId()== Template.instance().data.userId )
			return a.phone;
		return 'Non renseigne';
	},
	grades: function() { // returns the user's grades sorted by date
		var g = Template.instance().data.grades;
		if (g)
			return _.sortBy(g, 'date');
	},
	userHasMean: function(id) { // returns true if user has mean [id]
		var m = Template.instance().data.means;
		if (m && _.contains(m, id))
			return true;
		return false;
	},
	userHasbadges: function(id) { // returns true if user has mean [id]
		var m = _.map(Template.instance().data.badges, function(b) {
			return b.badgeId;
		});
		
		if (m && _.contains(m, id))
			return true;
		else
			return false;
	},userHasbadgesClasse: function(id) { // returns true if user has mean [id]
		var m = Template.instance().data.badges;
		
		if (m && _.contains(m, id)){
			return 'skill-got';
		}else{
			return 'skill-not-got';
		}
			
	},
	userHasSkill: function(id) { // returns a class name if user has skill
															 // I don't really know why it's not the same as above
		if (!Template.instance().data)
			return
		var p = Template.instance().data.skills;
		if (p && p[id])
			return 'skill-got';
	},
	userHasPermis: function(id) { // same as means for permis
		var p = Template.instance().data.permis;
		if (p && _.contains(p, id))
			return true;
		return false;
	},
	nbNote: function(i) { // returns the number of note which the user has recieved
		i = 4 - i;
		var n = Template.instance().data.notes;
		var min = i,
				max = (i+1);
		return _.select(n, function(e) {
			if ((max != 5 && e.note >= min && e.note < max) ||
					(max == 5 && e.note >= min))
				return e.note;
		}).length
	},
	notePercent: function(i) { // returns the percent of a note over the total number of note
		i = 4 - i;
		var n = Template.instance().data.notes;
		var ni = _.where(n, {note: i}).length
		return ni/n.length * 100;
	},
	labelForProgress: function(i) { // returns a label for a given progress bar
		switch(i) {
			case 0: return 'Parfait';
			case 1: return 'Tres bien';
			case 2: return 'Bien';
			case 3: return 'Decevant';
			case 4: return 'A eviter';
			default: return;
		}
	},
	advertTitle: function(advertId) { // advert title...
		return Adverts.findOne(advertId).title;
	},
	canSee: function() {
		var d = Template.instance().data,
				uid;
		if (d)
			uid = d.userId;
		var adverts = Adverts.find({
			owner: Meteor.userId(), 
			status: 2
		}, {fields: {offers: 1}}).fetch();
		var advert = _.find(adverts, function(a) {
			if (_.findWhere(a.offers, {validated: true, userId: uid}))
				return true;
		});
		if (advert)
			return true;
	}
});

Template.dashboardJobber.events({
	'click .edit-profil-button': function(e,t) { // routes to edit profile page, first tab
		Router.go('editJobber', {id: t.data.userId}, {query: {tab: 'info'}});
	},
	'click .factureLinks': function(e,t) { // routes to edit profile page, first tab
		
		alert("fffff");
	},
	'click .userNotificationsLink': function(e,t) {
	Meteor.call('sendAenvoyer', t.data.userId,"0"," ", function(err, res) {
				if (err) {
				
				} else {
			
			}
		});
},
	'click .user-disponibilities-container .orange.button': function(e,t) {
		Modal.show('dispoRangeModal');
	},
	'click .grade': function(e,t) {
		if ($(e.currentTarget).data('validated') == false) {
			var src = $(e.currentTarget).data('img');
			Modal.show('imageModal', {src: src});
		}
	}
});
function buildTableBody2(data) {
    var body = [];

    body.push(data);


    return body;
};
function buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());

        })

        body.push(dataRow);
    });

    return body;
};

function table(data, columns) {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody(data, columns)
        },style:'headlinetext'
    };
};
function table2(data) {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody2(data)
        },style:'headlinetext'
    };
};
factureGenerer = function (id) { // routes to edit profile page, first tab
Meteor.call('sendAenvoyer', Meteor.userId(),"1",id, function(err, res) {
				if (err) {
				
				} else {
			
			}
		});	
						var imgToExport = document.getElementById('imgToExport');
var a = Adverts.findOne({_id : id});
//console.log(a);
var idFacture=" ";
if (document.getElementById('numeroFactureVoulus').value != ""){
	idFacture = document.getElementById('numeroFactureVoulus').value;
}else{
	idFacture=id;
}
var canvas = document.createElement('canvas');
        canvas.width = '250'; 
        canvas.height = '150'; 
        canvas.getContext('2d').drawImage(imgToExport, 0, 0,200,100);
		var imageData = canvas.getContext('2d').getImageData(0, 0, 200, 100);
		//console.log(canvas.toDataURL("image/png"));
 // canvas.toDataURL('image/png');

	var customerName = 'Jobday SAS ';
	var customerName1 = ' 24, rue Descartes ';
	var customerName2 = ' 94200 Ivry-Sur-Seine';
		var customerDetailOne = 'detail_one';
		var customerDetailTwo = 'this.detail_two';
		// Some variables without 'this' 
		var customerAdress = 'adress';
		var currentUser = 'jobday';
		
			var externalDataRetrievedFromServer = [];
			var externalDataRetrievedFromServer2 = [];
 for (var iter = 0; iter < a.offers.length; iter++) {
	 if(UsersDatas.findOne({userId: a.offers[iter].userId}) != undefined){
			externalDataRetrievedFromServer.push({
				
				Nom :  UsersDatas.findOne({userId: a.offers[iter].userId}).name,
				adresse:UsersDatas.findOne({userId: a.offers[iter].userId}).address.street +' '+ UsersDatas.findOne({userId: a.offers[iter].userId}).address.zipcode +' '+ UsersDatas.findOne({userId: a.offers[iter].userId}).address.city +' '
			}) ;
	 }
			};
			 for (var iter = 0; iter < a.offers.length; iter++) {
				 if(UsersDatas.findOne({userId: a.offers[iter].userId}) != undefined){
			externalDataRetrievedFromServer2.push(
				 UsersDatas.findOne({userId: a.offers[iter].userId}).name
			) ;
				 }
			};
		// Define the pdf-document 
		var docDefinition = { 
			pageSize: 'A4',
			pageMargins: [ 30, 25, 30, 25 ],
			
			// Content with styles 
			content: [  {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto', 'auto', 'auto' ],

        body: [
          [ { image:  canvas.toDataURL(),width: 150, height: 25, padding: [0, 0, 0, 0]}, ' ', ' ', { text: 'Ident. Facture : '+idFacture, alignment:'right' } ],
		  [ {
														table: {
															body: [
																[ { text: 'Jobday SAS ',fontSize:8}],
																[ { text: '24, rue Descartes ',fontSize:8}],
																[ { text: '94200 Ivry-Sur-Seine',fontSize:8}]
															]
														},layout: 'noBorders',
													}
		  //{table: {headerRows: 1,widths: [  'auto' ],body: [{ text: 'Jobday SAS '},
		  //{text: ' 24, rue Descartes '},{text: ' 94200 Ivry-Sur-Seine' } ] },layout: 'noBorders'   }  
		     //{ text: 'Jobday SAS ',fontSize:8}
			 , ' ', ' ', {
														table: {
															body: [
																[ { text:  UsersDatas.findOne({userId: a.owner}).name,fontSize:8}],
																[ { text: UsersDatas.findOne({userId: a.owner}).address.street ,fontSize:8}],
																[ { text: UsersDatas.findOne({userId: a.owner}).address.zipcode + ' '+ UsersDatas.findOne({userId: a.owner}).address.city ,fontSize:8}],
																[ { text:  UsersDatas.findOne({userId: a.owner}).siret ,fontSize:8}]
															
															]
																},layout: 'noBorders',alignment:'left',style:'greyTable'
														
													} ],
		  [ { text: ' Facture émise par Jobday SAS au nom de : ',fontSize:8},
			table(externalDataRetrievedFromServer, ['Nom']),
		  //travailleurApayer + UsersDatas.findOne({userId: a.offers[0].userId}).name,
		  table(externalDataRetrievedFromServer, [ 'adresse'])
		  , ' ' 
		  ],
		  [	{ text: ' ',fontSize:8}, ' ', ' ', ' ' ],
          [ { text: ' ', bold: true }, ' ', ' ', ' ' ]
        ]
      },layout: 'noBorders'
    },{
														table: {headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],
															body: [
																[ { text: 'Date',style:'greyTable'}, { text: 'Référence Annonce ',style:'greyTable'}, { text: 'Prestataire',style:'greyTable'},{ text: 'Mode de Paiement',style:'greyTable'}],
															[ { text: formatDate(a.startDate) +' ',fontSize:8}, { text: id  ,fontSize:8}, 
															table2(externalDataRetrievedFromServer2),
															{ text: 'en ligne',fontSize:8}]
															
															]
																},layout: 'noBorders',alignment:'center'
														
													},	
													{
														table: {headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],
									body: [
								[ { text: 'Designation Annonce',style:'greyTable'}, { text: 'Montant Total TTC ',style:'greyTable'}, { text: 'Total de frais de service : Mongo Pay TTC',style:'greyTable'},{ text: 'Montant TTC (hors frais de services)',style:'greyTable'}],
															[ { text: a.title,fontSize:8}, { text: a.totalPrice + ' euros  ',fontSize:8}, { text: 'A determiner calcul selon montant%',fontSize:8},{ text: 'A determiner calcul selon montant',fontSize:8}],
															[ { text: ' ',fontSize:8}, { text: '   ',fontSize:8}, { text: 'Total net ',fontSize:8},{ text: '1,3 euros',fontSize:8}],
															[ { text: ' ',fontSize:8}, { text: '   ',fontSize:8}, { text: 'TVA 40%',fontSize:8},{ text: '30',fontSize:8}]
															
															]
																},layout: 'noBorders',alignment:'center'
														
													}
													,
			{text:'TVA non applicable, art. 293B du CGI',style: 'headline1'},
			{ text: 'Facture établie au nom et pour le compte de '+ UsersDatas.findOne({userId: a.owner}).name +'  par :', style: 'headline1' },
			{ text: customerName, style: 'headline1' },
			{ text: customerName1, style: 'headline1' },
			{ text: customerName2, style: 'headline1' },
			{ text: 'N° Siren : XXX XXX XXX – Code APE : 6201Z – N° TVA Intracommunautaire : FRXXXXXXXXXXX', style: 'headline1' },
		   { text: 'Tél. : 06 26 75 33 06 – E-mail : contact@jobday.Fr', style: 'headline1' },
			//	{
			//		columns: [
			//			{ width: '15%', text: 'Detail #1:', style: ['listItem', 'listLabel'] },
			//			{ width: '35%', text: customerDetailOne, style: ['listItem', 'listText'] },
			//			{ width: '15%', text: 'Detail #2:', style: ['listItem', 'listLabel'] },
			//			{ width: '35%', text: customerDetailTwo, style: ['listItem', 'listText'] }
			//		],
			//		columnGap: 10
			//	},
			//	{ text: customerAdress },
			//	{ text: currentUser }
			], footer: {
														table: {
															body: [
																[ { text: 'Romy Eisemberg ',fontSize:4}],
																[ { text: '24, rue Descartes ',fontSize:4}],
																[ { text: '94200 Ivry-Sur-Seine',fontSize:4}]
															]
																},layout: 'noBorders',alignment:'right',style:'greyTable'
														
													} ,
			
			// Style dictionary 
			styles: {
				headline: { fontSize: 25, bold: true, margin: [0, 0, 0, 25] },
				headlinetext: { fontSize: 8, bold: true, margin: [0, 0, 0, 0] } ,
				headline1: { fontSize: 12,alignment:'center',  bold: true, margin: [0, 0, 0, 0] },
				headline2: { fontSize: 12, alignment:'right',bold: true, margin: [0, 0, 0, 0] },
				listItem: { fontSize: 14, margin: [0, 0, 0, 5] },
				listLabel: { bold: true },
				listText: { italic: true },
				greyTable :{fillColor: 'grey',bold: true}
			}
		};
 
		// Start the pdf-generation process 
		//pdfMake.createPdf(docDefinition).open();
		pdfMake.createPdf(docDefinition).download('PDF_' + id + '.pdf');
		setTimeout(function(){
    factureGenererJobDayPayeur(id);
}, 8000);
		//factureGenererJobDayPayeur(id);
	};
	
	
factureGenererJobDayPayeur = function (id) { // routes to edit profile page, first tab
// Meteor.call('sendAenvoyer', Meteor.userId(),"1",id, function(err, res) {
				// if (err) {
				
				// } else {
			
			// }
		// });		
						var imgToExport = document.getElementById('imgToExport');
var a = Adverts.findOne({_id : id});
//console.log(a);
var idFacture=" ";

	idFacture=id;

var canvas = document.createElement('canvas');
        canvas.width = '250'; 
        canvas.height = '150'; 
        canvas.getContext('2d').drawImage(imgToExport, 0, 0,200,100);
		var imageData = canvas.getContext('2d').getImageData(0, 0, 200, 100);
		//console.log(canvas.toDataURL("image/png"));
 // canvas.toDataURL('image/png');

	var customerName = 'Jobday SAS ';
	var customerName1 = ' 24, rue Descartes ';
	var customerName2 = ' 94200 Ivry-Sur-Seine';
		var customerDetailOne = 'detail_one';
		var customerDetailTwo = 'this.detail_two';
		// Some variables without 'this' 
		var customerAdress = 'adress';
		var currentUser = 'jobday';
		
			var externalDataRetrievedFromServer = [];
			var externalDataRetrievedFromServer2 = [];
 for (var iter = 0; iter < a.offers.length; iter++) {
	 if(UsersDatas.findOne({userId: a.offers[iter].userId}) != undefined){
			externalDataRetrievedFromServer.push({
				
				Nom :  UsersDatas.findOne({userId: a.offers[iter].userId}).name,
				adresse:UsersDatas.findOne({userId: a.offers[iter].userId}).address.street +' '+ UsersDatas.findOne({userId: a.offers[iter].userId}).address.zipcode +' '+ UsersDatas.findOne({userId: a.offers[iter].userId}).address.city +' '
			}) ;
	 }
			};
			 for (var iter = 0; iter < a.offers.length; iter++) {
				 if(UsersDatas.findOne({userId: a.offers[iter].userId}) != undefined){
			externalDataRetrievedFromServer2.push(
				 UsersDatas.findOne({userId: a.offers[iter].userId}).name
			) ;
				 }
			};
		// Define the pdf-document 
		var docDefinition = { 
			pageSize: 'A4',
			pageMargins: [ 30, 25, 30, 25 ],
			
			// Content with styles 
			content: [  {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto', 'auto', 'auto' ],

        body: [
          [ { image:  canvas.toDataURL(),width: 150, height: 25, padding: [0, 0, 0, 0]}, ' ', ' ', { text: 'Ident. Facture : '+idFacture, alignment:'right' } ],
		  [ {
														table: {
															body: [
																[ { text: 'Jobday SAS ',fontSize:8}],
																[ { text: '24, rue Descartes ',fontSize:8}],
																[ { text: '94200 Ivry-Sur-Seine',fontSize:8}]
															]
														},layout: 'noBorders',
													}
		  //{table: {headerRows: 1,widths: [  'auto' ],body: [{ text: 'Jobday SAS '},
		  //{text: ' 24, rue Descartes '},{text: ' 94200 Ivry-Sur-Seine' } ] },layout: 'noBorders'   }  
		     //{ text: 'Jobday SAS ',fontSize:8}
			 , ' ', ' ', {
														table: {
															body: [
																[ { text:  UsersDatas.findOne({userId: a.owner}).name,fontSize:8}],
																[ { text: UsersDatas.findOne({userId: a.owner}).address.street ,fontSize:8}],
																[ { text: UsersDatas.findOne({userId: a.owner}).address.zipcode + ' '+ UsersDatas.findOne({userId: a.owner}).address.city ,fontSize:8}],
																[ { text:  UsersDatas.findOne({userId: a.owner}).siret ,fontSize:8}]
															
															]
																},layout: 'noBorders',alignment:'left',style:'greyTable'
														
													} ],
		  [ { text: ' Facture émise par Jobday SAS au nom de : ',fontSize:8},
			table(externalDataRetrievedFromServer, ['Nom']),
		  //travailleurApayer + UsersDatas.findOne({userId: a.offers[0].userId}).name,
		  table(externalDataRetrievedFromServer, [ 'adresse'])
		  , ' ' 
		  ],
		  [	{ text: ' ',fontSize:8}, ' ', ' ', ' ' ],
          [ { text: ' ', bold: true }, ' ', ' ', ' ' ]
        ]
      },layout: 'noBorders'
    },{
														table: {headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],
															body: [
																[ { text: 'Date',style:'greyTable'}, { text: 'Référence Annonce ',style:'greyTable'}, { text: 'Prestataire',style:'greyTable'},{ text: 'Mode de Paiement',style:'greyTable'}],
															[ { text: formatDate(a.startDate) +' ',fontSize:8}, { text: id  ,fontSize:8}, 
															table2(externalDataRetrievedFromServer2),
															{ text: 'en ligne',fontSize:8}]
															
															]
																},layout: 'noBorders',alignment:'center'
														
													},	
													{
														table: {headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],
									body: [
								[ { text: 'Designation Annonce',style:'greyTable'}, { text: 'Montant Total TTC ',style:'greyTable'}, { text: 'Total de frais de service : Mongo Pay TTC',style:'greyTable'},{ text: 'Montant TTC (hors frais de services)',style:'greyTable'}],
															[ { text: a.title,fontSize:8}, { text: a.totalPrice + ' euros  ',fontSize:8}, { text: 'A determiner calcul selon montant%',fontSize:8},{ text: 'A determiner calcul selon montant',fontSize:8}],
															[ { text: ' ',fontSize:8}, { text: '   ',fontSize:8}, { text: 'Total net ',fontSize:8},{ text: '1,3 euros',fontSize:8}],
															[ { text: ' ',fontSize:8}, { text: '   ',fontSize:8}, { text: 'TVA 40%',fontSize:8},{ text: '30',fontSize:8}]
															
															]
																},layout: 'noBorders',alignment:'center'
														
													}
													,
			{text:'TVA non applicable, art. 293B du CGI',style: 'headline1'},
			{ text: 'Facture établie au nom et pour le compte de '+ UsersDatas.findOne({userId: a.owner}).name +'  par :', style: 'headline1' },
			{ text: customerName, style: 'headline1' },
			{ text: customerName1, style: 'headline1' },
			{ text: customerName2, style: 'headline1' },
			{ text: 'N° Siren : XXX XXX XXX – Code APE : 6201Z – N° TVA Intracommunautaire : FRXXXXXXXXXXX', style: 'headline1' },
		   { text: 'Tél. : 06 26 75 33 06 – E-mail : contact@jobday.Fr', style: 'headline1' },
			//	{
			//		columns: [
			//			{ width: '15%', text: 'Detail #1:', style: ['listItem', 'listLabel'] },
			//			{ width: '35%', text: customerDetailOne, style: ['listItem', 'listText'] },
			//			{ width: '15%', text: 'Detail #2:', style: ['listItem', 'listLabel'] },
			//			{ width: '35%', text: customerDetailTwo, style: ['listItem', 'listText'] }
			//		],
			//		columnGap: 10
			//	},
			//	{ text: customerAdress },
			//	{ text: currentUser }
			], footer: {
														table: {
															body: [
																[ { text: 'Romy Eisemberg ',fontSize:4}],
																[ { text: '24, rue Descartes ',fontSize:4}],
																[ { text: '94200 Ivry-Sur-Seine',fontSize:4}]
															]
																},layout: 'noBorders',alignment:'right',style:'greyTable'
														
													} ,
			
			// Style dictionary 
			styles: {
				headline: { fontSize: 25, bold: true, margin: [0, 0, 0, 25] },
				headlinetext: { fontSize: 8, bold: true, margin: [0, 0, 0, 0] } ,
				headline1: { fontSize: 12,alignment:'center',  bold: true, margin: [0, 0, 0, 0] },
				headline2: { fontSize: 12, alignment:'right',bold: true, margin: [0, 0, 0, 0] },
				listItem: { fontSize: 14, margin: [0, 0, 0, 5] },
				listLabel: { bold: true },
				listText: { italic: true },
				greyTable :{fillColor: 'grey',bold: true}
			}
		};
 
		// Start the pdf-generation process 
		//pdfMake.createPdf(docDefinition).open();
		pdfMake.createPdf(docDefinition).download('PDF_BIS_' + id + '.pdf');
	}
