var regexp = {
	phone: /\b[0-9０-９٠-٩۰-۹]{2}$|^[+＋]*(?:[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]\/~⁓∼～*]*[0-9０-９٠-٩۰-۹]){3,}[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]\/~⁓∼～0-9０-９٠-٩۰-۹]*(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|[,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\.．]?[  \t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)?\b/i,
	url: /\b(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?\b/i,
	email: /\b[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\b/,
	domain: /\b(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z](?:[a-z-]*[a-z])?\b/,
	weakdomain: /\b(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.|$))+|(?:(?:[0-1]?\d{1,2}|2[0-4]\d|25[0-5])(?:\.|$)){4}|(?:(?:[\dA-Fa-f]{1,4}(?::|$)){8}|(?=(?:[^:\s]|:[^:\s])*::(?:[^:\s]|:[^:\s])*$)[\dA-Fa-f]{0,4}(?:::?(?:[\dA-Fa-f]{1,4}|$)){1,6}))\b/
};

Meteor.methods({
	validateOffer: function(params) {
		if (params && params.advert) {
			var ad = Adverts.findOne({_id: params.advert, status: 0});
			if (ad && this.userId && this.userId == ad.owner) {
				if (params.offer) {
					Adverts.update({_id: params.advert,	'offers._id': params.offer}, {
						$set: {'offers.$.validated': true}
					});
				}
			}
		}
	},
	makeOffer: function(params) {
		if (this.userId) {
			if (params.distance && params.comment && params.price && params.advert) {
				var ret = Adverts.update({_id: params.advert}, {$push: {offers: {
					userId: this.userId,
					date: new Date(),
					distance: params.distance,
					comment: params.comment,
					price: params.price,
					validated: false
				}}}, function(err) {
					console.log(err);
					if (err)
						return err
					else
						return 'OK';
				});
				return ret;
			} else
				return 'Bad parameters';
		} else
			return 'User not logged';
	},
	postMessage: function(params) {
		if (this.userId) {
			if (params.to && params.to.advert) {
				var err;
				_.each(_.keys(regexp), function(k) {
					var m = params.text.match(regexp[k]);
					if (m) {
						err = m;
						return;
					}
				});
				if (err)
					return err;
				Adverts.update(params.to.advert, {
					$push: {messages: {text: params.text}}
				}, function(err) {
					if (err)
						return err;
				});
				return;
			}
			return 'Requete invalide';
		}
		return 'Vous devez etre connecte';
	},
	addUser: function(doc) {
		console.log('addUser doc', doc);
		var existingUser = Meteor.users.findOne({
			$or: [
				{'emails.0.address': doc.email},
				{'services.google.email': doc.email},
				{'services.facebook.email': doc.email},
				{'services,linkedin.email': doc.email}
			]
		});
		if (existingUser && existingUser.services.password)
			throw new Error('Email already in database');
		else if (existingUser) {
			if (doc.password != doc.confirmation)
				throw new Error('Password confirmation mismatch');
			Accounts.addEmail(existingUser._id, doc.email);
			Accounts.setPassword(existingUser._id, doc.password);
			Accounts.sendVerificationEmail(existingUser._id);
			return true;
		} else {
			var newUserId = Accounts.createUser({
				email: doc.email,
				password: doc.password,
				profile: {
					name: doc.name,
					firstname: doc.firstname,
					society: doc.society
				}
			});
			console.log('addUser id', newUserId);
			if (newUserId)
				Accounts.sendVerificationEmail(newUserId);
			return newUserId;
		}
	},
	sendEmailNoreply: function (text, text2, text3) {
		check([text], [String]);

		this.unblock();
		process.env.MAIL_URL = 'smtp://directeur.general@incrdev.com:dominique081282@ssl0.ovh.net:465/'
		var html = [
' <html> ',
'<head>',
'          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
'        <meta name="viewport" content="width=device-width, initial-scale=1.0">',
'        <title>Increased Development</title>',
'    <style type="text/css">',
'		body,#bodyTable,#bodyCell{',
'			height:100% !important;',
'			margin:0;',
'			padding:0;',
'			width:100% !important;',
'		}',
'		table{',
'			border-collapse:collapse;',
'		}',
'		img,a img{',
'			border:0;',
'			outline:none;',
'			text-decoration:none;',
'		}',
'	h1,h2,h3,h4,h5,h6{',
'			margin:0;',
'			padding:0;',
'		}',
'		h3{',
'			color:#606060 !important;',
'			display:block;',
'			font-family:Helvetica;',
'			font-size:18px;',
'			font-style:normal;',
'			font-weight:bold;',
'			line-height:125%;',
'			letter-spacing:-.5px;',
'			margin:0;',
'			text-align:left;',
'		}',
'		h4{',
'			color:#808080 !important;',
'			display:block;',
'			font-family:Helvetica;',
'			font-size:16px;',
'			font-style:normal;',
'			font-weight:bold;',
'			line-height:125%;',
'			letter-spacing:normal;',
'			margin:0;',
'			text-align:left;',
'		}',
'		p{',
'			margin:1em 0;',
'			padding:0;',
'		}',
'		a{',
'			word-wrap:break-word;',
'		}',
'		.ReadMsgBody{',
'			width:100%;',
'		}',
'		table,td{',
'			mso-table-lspace:0pt;',
'			mso-table-rspace:0pt;',
'		}',
'		#outlook a{',
'			padding:0;',
'		}',
'		img{',
'			-ms-interpolation-mode:bicubic;',
'		}',
'		body,table,td,p,a,li,blockquote{',
'			-ms-text-size-adjust:100%;',
'			-webkit-text-size-adjust:100%;',
'		}',
'		#bodyCell{',
'			padding:20px;',
'		}',
'		.mcnImage{',
'			vertical-align:bottom;',
'		}',
'		.mcnTextContent img{',
'			height:auto !important;',
'		}',
'		body,#bodyTable{',
'			background-color:#F2F2F2;',
'		}',
'		#bodyCell{',
'			border-top:0;',
'		}',
'		#templateContainer{',
'			border:0;',
'		}',
'		#templatePreheader{',
'			background-color:#FFFFFF;',
'			border-top:0;',
'			border-bottom:0;',
'		}',
'		.preheaderContainer .mcnTextContent,.preheaderContainer .mcnTextContent p{',
'			color:#606060;',
'			font-family:Helvetica;',
'			font-size:11px;',
'			line-height:125%;',
'			text-align:left;',
'		}',
'		.preheaderContainer .mcnTextContent a{',
'			color:#606060;',
'			font-weight:normal;',
'			text-decoration:underline;',
'		}',
'		#templateHeader{',
'			background-color:#FFFFFF;',
'			border-top:0;',
'			border-bottom:0;',
'		}',
'		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{',
'			color:#606060;',
'			font-family:Helvetica;',
'			font-size:12px;',
'			line-height:150%;',
'			text-align:left;',
'		}',
'		.headerContainer .mcnTextContent a{',
'			color:#6DC6DD;',
'			font-weight:normal;',
'			text-decoration:underline;',
'		}',
'		#templateBody{',
'			background-color:#FFFFFF;',
'			border-top:0;',
'			border-bottom:0;',
'		}',
'		#templateSidebar{',
'			border-left:0;',
'		}',
'		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{',
'			color:#606060;',
'			font-family:Helvetica;',
'			font-size:12px;',
'			line-height:150%;',
'			text-align:left;',
'		}',
'		.bodyContainer .mcnTextContent a{',
'			color:#6DC6DD;',
'			font-weight:normal;',
'			text-decoration:underline;',
'		}',
'		#templateSidebar{',
'			background-color:#FFFFFF;',
'		}',
'		#templateSidebarInner{',
'			border-left:0;',
'		}',
'		.sidebarContainer .mcnTextContent,.sidebarContainer .mcnTextContent p{',
'			color:#606060;',
'			font-family:Helvetica;',
'			font-size:13px;',
'			line-height:125%;',
'			text-align:left;',
'		}',
'		.sidebarContainer .mcnTextContent a{',
'			color:#6DC6DD;',
'			font-weight:normal;',
'			text-decoration:underline;',
'		}',
'		#templateFooter{',
'			background-color:#FFFFFF;',
'			border-top:0;',
'			border-bottom:0;',
'		}',
'		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{',
'			color:#606060;',
'			font-family:Helvetica;',
'			font-size:11px;',
'			line-height:125%;',
'			text-align:left;',
'		}',
'		.footerContainer .mcnTextContent a{',
'			color:#606060;',
'			font-weight:normal;',
'			text-decoration:underline;',
'		}',
'	@media only screen and (max-width: 480px){',
'		body,table,td,p,a,li,blockquote{',
'			-webkit-text-size-adjust:none !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		body{',
'			width:100% !important;',
'			min-width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[id=bodyCell]{',
'			padding:10px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcnTextContentContainer]{',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcnBoxedTextContentContainer]{',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcpreview-image-uploader]{',
'			width:100% !important;',
'			display:none !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		img[class=mcnImage]{',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcnImageGroupContentContainer]{',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnImageGroupContent]{',
'			padding:9px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnImageGroupBlockInner]{',
'			padding-bottom:0 !important;',
'			padding-top:0 !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		tbody[class=mcnImageGroupBlockOuter]{',
'			padding-bottom:9px !important;',
'			padding-top:9px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcnCaptionTopContent],table[class=mcnCaptionBottomContent]{',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcnCaptionLeftTextContentContainer],table[class=mcnCaptionRightTextContentContainer],table[class=mcnCaptionLeftImageContentContainer],table[class=mcnCaptionRightImageContentContainer],table[class=mcnImageCardLeftTextContentContainer],table[class=mcnImageCardRightTextContentContainer]{',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnImageCardLeftImageContent],td[class=mcnImageCardRightImageContent]{',
'			padding-right:18px !important;',
'			padding-left:18px !important;',
'			padding-bottom:0 !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnImageCardBottomImageContent]{',
'			padding-bottom:9px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnImageCardTopImageContent]{',
'			padding-top:18px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcnCaptionLeftContentOuter] td[class=mcnTextContent],table[class=mcnCaptionRightContentOuter] td[class=mcnTextContent]{',
'			padding-top:9px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnCaptionBlockInner] table[class=mcnCaptionTopContent]:last-child td[class=mcnTextContent]{',
'			padding-top:18px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnBoxedTextContentColumn]{',
'			padding-left:18px !important;',
'			padding-right:18px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=sectionContainer]{',
'			display:block !important;',
'			max-width:600px !important;',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=mcnTextContent]{',
'			padding-right:18px !important;',
'			padding-left:18px !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[id=templateContainer],table[id=templatePreheader],table[id=templateHeader],table[id=templateBody],table[id=templateBodyInner],table[id=templateSidebar],table[id=templateSidebarInner],table[id=templateFooter]{',
'			max-width:600px !important;',
'			width:100% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		h1{',
'			font-size:24px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		h2{',
'			font-size:20px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		h3{',
'			font-size:18px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		h4{',
'			font-size:16px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[class=mcnBoxedTextContentContainer] td[class=mcnTextContent],td[class=mcnBoxedTextContentContainer] td[class=mcnTextContent] p{',
'			font-size:18px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[id=templatePreheader]{',
'			display:block !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=preheaderContainer] td[class=mcnTextContent],td[class=preheaderContainer] td[class=mcnTextContent] p{',
'			font-size:14px !important;',
'			line-height:115% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=headerContainer] td[class=mcnTextContent],td[class=headerContainer] td[class=mcnTextContent] p{',
'			font-size:18px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=bodyContainer] td[class=mcnTextContent],td[class=bodyContainer] td[class=mcnTextContent] p{',
'			font-size:18px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=sidebarContainer] td[class=mcnTextContent],td[class=sidebarContainer] td[class=mcnTextContent] p{',
'			font-size:18px !important;',
'			line-height:125% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[id=templateSidebar]{',
'			border-left:0 !important;',
'			border-right:0 !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		table[id=templateSidebarInner]{',
'			border-left:0 !important;',
'			border-right:0 !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=footerContainer] td[class=mcnTextContent],td[class=footerContainer] td[class=mcnTextContent] p{',
'			font-size:14px !important;',
'			line-height:115% !important;',
'		}',
'}	@media only screen and (max-width: 480px){',
'		td[class=footerContainer] a[class=utilityLink]{',
'			display:block !important;',
'		}',
'}</style></head>',
'    <body leftmargin="0" topmargin="0" offset="0" style="margin: 0;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #F2F2F2;height: 100% !important;width: 100% !important;" marginheight="0" marginwidth="0">',
'        <center>',
'            <table id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;background-color: #F2F2F2;height: 100% !important;width: 100% !important;" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">',
'                <tbody><tr>',
'                    <td id="bodyCell" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 20px;border-top: 0;height: 100% !important;width: 100% !important;" align="center" valign="top">',
'                        <table id="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;" border="0" cellpadding="0" cellspacing="0" width="600">',
'                            <tbody><tr>',
'                                <td style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="center" valign="top">',
'                                </td>',
'                            </tr>',
'                            <tr>',
'                                <td style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="center" valign="top">',
'                                    <table id="templateHeader" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;" border="0" cellpadding="0" cellspacing="0" width="600">',
'                                        <tbody><tr>',
'                                            <td class="headerContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top"><table class="mcnImageBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">',
'    <tbody class="mcnImageBlockOuter">',
'            <tr>',
'                <td style="padding: 9px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner" valign="top">',
'                    <table class="mcnImageContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">',
'                        <tbody>',
'						<tr>',
'                            <td class="mcnImageContent" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">',
'                          <div style="text-align:center;margin-bottom: 20px;">	',
'						 <a href="http://www.incrdev.com/" title="" rel="home"> ',
'								   </a>',
'								   </div>	',
'						                            </td>',
'                        </tr>',
'						<tr>',
'                            <td class="mcnImageContent" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">',
'                                   <img src="https://scontent-cdg2-1.xx.fbcdn.net/hphotos-xft1/t31.0-8/10636673_983786725020875_2647631277147987870_o.jpg" alt="increased" >',
'                            </td>',
'                        </tr>',
'                    </tbody></table>',
'                </td>',
'            </tr>',
'    </tbody>',
'</table></td>',
'                                        </tr>',
'                                    </tbody></table>',
'                                </td>',
'                            </tr>',
'                            <tr>',
'                                <td style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="center" valign="top">',
'                                    <table id="templateBody" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;" border="0" cellpadding="0" cellspacing="0" width="600">',
'                                        <tbody><tr>',
'                                            <td class="sectionContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="center" valign="top" width="390">',
'                                            	<table id="templateBodyInner" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">',
'                                                	<tbody><tr>',
'                                                    	<td class="bodyContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top"><table class="mcnTextBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">',
'    <tbody class="mcnTextBlockOuter">',
'        <tr>',
'            <td class="mcnTextBlockInner" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">',
'                <table class="mcnTextContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">',
'                    <tbody><tr>',
'                        <td class="mcnTextContent" style="padding-top: 9px;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #606060;font-family: Helvetica;font-size: 15px;line-height: 150%;text-align: left;" valign="top">',
'<I>*** Automated message – Do not reply ***</I></BR></BR>',
'<p style="color:#006583">',
text + ' ',
'</BR></BR>',
'Increased Development<BR>',
'Conseil Informatique de gestion Informatique<BR>',
'13 Bvld de l hôpital Stell<BR>',
'92500 Rueil-Malmaison<BR>',
'France<BR>',
'Téléphone : 0686843044<BR>',
'<div class="container" style="text-align:left;"  ><BR>',
'<a href="https://plus.google.com/u/0/102886660986180638053/" target="_blank">Google+</a><BR>',
'<a href="http://www.youtube.com/channel/UCmqCaH1n5rLZ3XtagSet_Cw" target="_blank">Youtube</a><BR>',
'<a href="https://www.linkedin.com/company/increased-development" target="_blank">Linkedin</a><BR>',
'<a href="https://www.facebook.com/Increased.development/" target="_blank">Facebbok</a><BR>',
'<a href="https://twitter.com/Incr_dev" target="_blank">Twitter</a><BR>',
'<a href="https://www.instagram.com/increased_development/" target="_blank">Instagram</a><BR>',
'</div>',
'</p>',
'                        </td>',
'                    </tr>',
'                </tbody></table>',
'            </td>',
'        </tr>',
'    </tbody>',
'</table></td>',
'                                                    </tr>',
'                                                </tbody></table>',
'                                            </td>',
'                                            </tr>',
'                                    </tbody></table>',
'                                </td>',
'                            </tr>',
'                            <tr>',
'                                <td style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="center" valign="top">',
'                                    <!-- BEGIN FOOTER // -->',
'                                    <table id="templateFooter" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;" border="0" cellpadding="0" cellspacing="0" width="600">',
'                                        <tbody><tr>',
'                                            <td class="footerContainer" style="padding-bottom: 9px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top"><table class="mcnTextBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">',
'    <tbody class="mcnTextBlockOuter">',
'        <tr>',
'            <td class="mcnTextBlockInner" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">',
'                <table class="mcnTextContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="left" border="0" cellpadding="0" cellspacing="0" width="600">',
'                    <tbody><tr>',
'                        <td class="mcnTextContent" style="padding-top: 9px;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #606060;font-family: Helvetica;font-size: 11px;line-height: 125%;text-align: left;" valign="top">',
'                        </td>',
'                    </tr>',
'                </tbody></table>',
'            </td>',
'        </tr>',
'    </tbody>',
'</table></td>',
'                                        </tr>',
'                                    </tbody></table>',
'                                </td>',
'                            </tr>',
'                        </tbody></table>',
'                             </td>',
'                </tr>',
'            </tbody></table>',
'        </center>',
'</body>',
'</html>'
		].join('');
		//var html = Blaze.toHTML(html);
		Email.send({
			to: text3,
			from: 'no-reply@incrdev.com',
			subject: text2,
			html: html
		});
	}
});
