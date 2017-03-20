emailBodyTemplate = [
' <html> ',
'<head>',
'          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
'        <meta name="viewport" content="width=device-width, initial-scale=1.0">',
'        <title>Jobday</title>',
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
'						 <a href="http://jobday.fr/" title="" rel="home"> ',
'								   </a>',
'								   </div>	',
'						                            </td>',
'                        </tr>',
'						<tr>',
'                            <td class="mcnImageContent" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">',
'                                   <img src="https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-1/p200x200/15078730_1079384282178858_7354101503611438923_n.jpg?oh=6419b6f0e96744bde2bc4b255f48ee64&oe=58EF9B7B" alt="increased" >',
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
'<p style="color:#006583">'].join('');
emailBodyTemplate2 = [
'<BR><BR>',
'Jobday SAS <BR>',
' 24, rue Descartes <BR>',
' 94200 Ivry-Sur-Seine <BR>',
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
		
// some  regular expressions to check messages contents
var regexp = {
	phone: /([0-9].{0,2}){7,12}/i,
	url: /((ht|f)tps?:\/\/)?[^\s]+\.(com|fr|de|org|it|info|net)/i,
	providers: /(gmail)|(hotmail)|(microsoft)|(laposte)|(live\.((com)|fr))/i
};

Future = Npm.require('fibers/future');

Meteor.methods({
	topCategories: function() {
		var pipeline = [
			{$sort: {createdAt: -1}},
			{$limit: 50},
			{$group: {_id: '$category', count: {$sum: 1}}},
			{$sort: {count: -1}}
		];
		var rc = Adverts.rawCollection();
		var res = Meteor.wrapAsync(rc.aggregate.bind(rc))(pipeline,{});
		return res;
	},
	removeEvent: function(eid) {
		var current = Meteor.userId();
		if (current) {
			if (Roles.userIsInRole(current, 'admin')) {
				var e = Events.findOne({_id: eid});
				if (e) {
					Events.remove({_id: eid});
				} else throw new Meteor.Error(404, 'Event not found');
			} else throw new Meteor.Error(403, 'You have to be an administrator to do that');
		} else throw new Meteor.Error(403, 'You have to be logged in to do that');
	},
	addBadge: function(p) {
		var current = Meteor.userId();
		if (current) {
			if (Roles.userIsInRole(current, 'admin')) {
				var udata = UsersDatas.findOne({userId: p.userId});
				if (udata) {
					var b = Badges.findOne({name: p.badgeName});
					if (b) {
						if (!_.findWhere(udata.badges, {badgeId: b._id})) {
							UsersDatas.update({_id: udata._id}, {$push: {badges: {giver: current, badgeId: b._id}}});
						} else throw new Meteor.Error(400, 'This user already has the badge '+b.name);
					} else throw new Meteor.Error(500, 'Badges '+p.badgeName+' not found');
				} else throw new Meteor.Error(404, 'User not found');
			} else throw new Meteor.Error(403, 'You have to be an administrator to do that');
		} else throw new Meteor.Error(403, 'You have to be logged in to do that');
	},
	sendEvent: function(params) {
		if (Meteor.userId()) {
			if (params.type) {
				Events.insert(params);
			} else throw new Meteor.Error('Le type d\'evenement est obligatoire');
		} else throw new Meteor.Error('Vous devez etre connecte pour effectuer cette action');
	},
	leaveComment: function(params) {
		var advertId = params.advertId,
				offerId = params.offer,
				note = params.note,
				msg = params.msg;
		if (this.userId) {
			var advert = Adverts.findOne({_id: advertId});
			if (advert) {
				if (advert.owner == this.userId) {
					var offer = _.findWhere(advert.offers, {_id: offerId, validated: true});
					if (offer) {
						var noted = UsersDatas.findOne({userId: offer.userId});
						if (noted && !_.where(noted.notes, {advertId: advertId}).length) {
							var ctx = NoteSchema.newContext();
							var data = {
								advertOwnerId: this.userId,
								advertId: advertId,
								note: note,
								message: msg
							};
							ctx.validate(data);
							if (ctx.invalidKeys().length)
								return ctx.getErrorObject();
							else  {
								UsersDatas.update({userId: offer.userId}, {$push: {notes: data}});
								noted.notes.push(data);
								if (noted.notes.length >= 5) {
									var assidu = true;
									_.times(5, function(t) {
										var n = noted.notes.reverse()[t];
										if (n.note < 4) {
											assidu = false;
											return;
										}
									});
									var b = Badges.findOne({name: 'Assidu'})._id;
									if (assidu && !_.findWhere(noted.badges, {badgeId: b})) {
										UsersDatas.update({userId: offer.userId}, {
											$push: {
												badges: {
													giver: offer.userId,
													badgeId: b
												}
											}
										});
									}
								}
								var user = MangoUsers.findOne({userId: this.userId});
								var err = createMangoTransfer(user.mango.user, user.mango.wallet, offer);
								if (err) { throw err; }
							}
						} else { throw new Meteor.Error('Une note a deja ete laissee pour ce Job'); }
					} else { throw new Meteor.Error('L\'offre est introuvable'); }
				} else { throw new Meteor.Error('Vous n\'etes pas le proprietaire de cette annonce'); }
			} else { throw new Meteor.Error('L\'annonce est introuvable'); }
		} else { throw new Meteor.Error('Vous devez etre connecte pour effectuer cette operation'); }
	},
	finalizePayment: function(advertId) {
		var advert = Adverts.findOne({_id: advertId});
		var user = MangoUsers.findOne({userId: this.userId});
		if (advert && advert.status == 1 && user) {
			Adverts.update({_id: advert._id}, {$set: {status: 2}});
		} else {
			if (!advert)
				return ['L\'annonce n\'existe pas'];
			else if (advert.status == 3)
				return ['L\'annonce a deja ete payee'];
			else if (advert.status == 0)
				return ['Les offres de cette annonce n\'ont pas encore ete validees'];
			else if (!user)
				return ['Vous devez etre connecte pour effectuer cette action'];
			else
				return ['Une erreur est survenue'];
		}
	},
	getPayin: function(id) {
		var mangoUser = MangoUsers.findOne({userId: this.userId});
		var payin = Payins.findOne({Id: id});
		if (mangoUser && mangoUser.mango && mangoUser.mango.user &&
				payin && payin.CreditedUserId && payin.CreditedUserId == mangoUser.mango.user) {
			var ret = new Future();
			MangoPaySDK.payin.fetch(id, function(e,r) {
				if (e)
					ret.throw(e);
				else {
					r.advertId = payin.advertId
					ret.return(r);
				}
			});
			return ret.wait();
		} else
			throw new Meteor.Error('No wright to do that bro');
	},
	createCardReg: function() {
		var u = MangoUsers.findOne({userId: this.userId});
		if (u) {
			var retVal = new Future();
			var regCard = new MangoPaySDK.cardRegistraton.CardRegistration({
				cardType: MangoPaySDK.card.type.VISA_MASTERCARD,
				Currency: 'EUR',
				UserId: u.mango.user
			});
			MangoPaySDK.cardRegistraton.create(regCard, function(err, rc) {
				if (err || !rc)
					retVal.throw(err);
				else
					retVal.return({user: u.mango.user, cardReg: rc});
			});
			return retVal.wait();
		}
		else
			throw new Meteor.Error('Mango user not found');
	},
	updateCardReg: function(data) {
		var currentUser = this.userId;
		var retVal = new Future();
		MangoPaySDK.cardRegistraton.update(data.id, {RegistrationData: data.data}, function(err, res) {
			if (err || !res || !res.CardId) 
				retVal.throw('Erreur lors de l\'enregistrement de la carte');
			else {
				retVal.return(res.CardId);
			}
		});
		return retVal.wait();
	},
	makePayment: function(data) {
		var advertId = data.advertId,
				cardId = data.cardId;
		var mangoUser = MangoUsers.findOne({userId: this.userId});
		var a = Adverts.findOne({_id: advertId});
		if (a && a.status == 1 && mangoUser && mangoUser.mango.user && mangoUser.mango.wallet) {
			var m = mangoUser.mango;
			var amount = _.reduce(a.offers, function(acc,offer) {
				return acc + offer.price;
			}, 0) * 1.1;
			return createMangoPayin(m.user, cardId, m.wallet, amount, a._id, _.where(a.offers, {validated: true}));
		} else
			throw new Meteor.Error('An error occured');
	},
	fakePayment: function(data) {
		var advertId = data.advertId;
		var a = Adverts.findOne({_id: advertId});
		if (a && a.status == 2) {
			Adverts.update({_id: advertId}, {$set: {status: 3}});
		}
	},
	removeOffer: function(params) {
		if (params && params.advert && params.offer) {
			var ad = Adverts.findOne({_id: params.advert});
			if (ad && ad.offers && ad.offers.length) {
				var o = _.findWhere(ad.offers, {_id: params.offer._id});
				if (o && o.userId) {
					if (this.userId == o.userId || Roles.userIsInRole(this.userId, 'admin')) {
						Adverts.update({_id: params.advert}, {
							$pull: {offers: {_id: params.offer._id}}
						});
					} else throw new Meteor.Error(403, 'Unauthorized');
				} else throw new Meteor.Error(404, 'Offer not found');
			} else throw new Meteor.Error(404, 'Advert not found');
		} else throw new Meteor.Error(400, 'Bad request');
	},
	updateOffer: function(params) {
		if (params && params.advert && params.offer) {
			var ad = Adverts.findOne({_id: params.advert});
			if (ad && ad.offers && ad.offers.length) {
				var o = _.findWhere(ad.offers, {_id: params.offer._id});
				if (o && o.userId) {
					if (this.userId == o.userId || Roles.userIsInRole(this.userId, 'admin')) {
						if (ad.negocible) {
							Adverts.update({_id: params.advert, 'offers._id': params.offer._id}, {
								$set: {
									'offers.$.comment': params.offer.comment,
									'offers.$.price': params.offer.price,
									'offers.$.validated': false
								}
							});
						} else {
							Adverts.update({_id: params.advert, 'offers._id': params.offer._id}, {
								$set: {
									'offers.$.comment': params.offer.comment,
									'offers.$.validated': false
								}
							});
						}
					} else throw new Meteor.Error(403, 'Unauthorized');
				} else throw new Meteor.Error(404, 'Offer not found');
			} else throw new Meteor.Error(404, 'Advert not found');
		} else throw new Meteor.Error(400, 'Bad request');
	},
	invalidateOffer: function(params) {
		if (params && params.advert) {
			var ad = Adverts.findOne({_id: params.advert});
			if (ad && this.userId && this.userId == ad.owner) {
				if (params.offer) {
					Adverts.update({_id: params.advert,	'offers._id': params.offer}, {
						$set: {'offers.$.validated': false}
					});
				}
			}
		}
	},
	validateOffer: function(params) { // offer validation
		if (params && params.advert) {
			var ad = Adverts.findOne({_id: params.advert});
			if (ad && this.userId && this.userId == ad.owner) {
				if (params.offer) {
					Adverts.update({_id: params.advert,	'offers._id': params.offer}, {
						$set: {'offers.$.validated': true}
					});
				}
			}
		}
	},
	makeOffer: function(params) { // make an offer
		if (this.userId) {
			var o = Adverts.findOne({_id: params.advert}).offers;
			if (_.where(o, {userId: this.userId}).length){
				//console.log('peter');
				return;}
			//if (params.distance && params.comment && params.price && params.advert) {
				//erreur sur l'offre pour calcul de la distance
			if ( params.comment && params.price && params.advert) {	
				var u = UsersDatas.findOne({userId: this.userId});
				if (!u || !u.bankComplete)
					return false;
				var ret = Adverts.update({_id: params.advert}, {$push: {offers: {
					userId: this.userId,
					date: new Date(),
					distance: params.distance,
					comment: params.comment,
					price: params.price,
					validated: false
				}}});
				UserNotification.insert({
					  name:'Offre',
							 description:'Offre' ,
							 icon:'glyphicon glyphicon-eur' ,
							 urlNotif: '/missionProfil/'+ params.advert ,
							 owner: Adverts.findOne({_id : params.advert}).owner,
							 createdBy :this.userId							 
							 }, function(err) {
							if (err)
							 return err;}
				);
				return ret;
			} else{
				return 'Bad parameters';}
		} else
			return 'User not logged';
	},
	removeMessage: function(params) {
		if (params && params.advert && params.message) {
			var ad = Adverts.findOne({_id: params.advert});
			if (ad && ad.messages && ad.messages.length) {
				console.log(params);
				var m = _.findWhere(ad.messages, {_id: params.message._id});
				if (m && m.userId) {
					if (this.userId == m.userId || Roles.userIsInRole(this.userId, 'admin')) {
						Adverts.update({_id: params.advert}, {
							$pull: {messages: {_id: params.message._id}}
						});
					} else throw new Meteor.Error(403, 'Unauthorized');
				} else throw new Meteor.Error(404, 'Message not found');
			} else throw new Meteor.Error(404, 'Advert not found');
		} else throw new Meteor.Error(400, 'Bad request');
	},
	updateMessage: function(params) {
		if (params && params.advert && params.message) {
			var ad = Adverts.findOne({_id: params.advert});
			if (ad && ad.messages && ad.messages.length) {
				var m = _.findWhere(ad.messages, {_id: params.message._id});
				if (m && m.userId) {
					if (this.userId == m.userId || Roles.userIsInRole(this.userId, 'admin')) {
						Adverts.update({_id: params.advert, 'messages._id': params.message._id}, {
							$set: {'messages.$.text': params.message.text}
						});
					} else throw new Meteor.Error(403, 'Unauthorized');
				} else throw new Meteor.Error(404, 'Message not found');
			} else throw new Meteor.Error(404, 'Advert not found');
		} else throw new Meteor.Error(400, 'Bad request');
	},
	postMessage: function(params) { // post message (checks content with regex)
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
				UserNotification.insert({
					name:'Message',
					description:'Annonce' ,
					icon:'glyphicon glyphicon-tag' ,
					urlNotif: '/missionProfil/'+ params.to.advert ,
					owner: Adverts.findOne({_id : params.to.advert}).owner,
					createdBy :this.userId							 
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
	addAdmin: function(email, firstname, name) {
		var current = Meteor.userId();
		console.log(email, firstname, name);
		if (current && Roles.userIsInRole(current, ['admin','root'])) {
			var existingUser = Meteor.users.findOne({
				$or: [
					{'emails.0.address': email},
					{'services.google.email': email},
					{'services.facebook.email': email},
					{'services.linkedin.emailAddress': email}
				]
			});
			if (existingUser) {
				if (!Roles.userIsInRole(existingUser, ['admin', 'root'])) {
					Roles.addUsersToRoles(existingUser, 'admin');
					var subjectmail ="[Jobday] You now have Administrator privileges";
					var corpsHtml = "<br>Bonjour/Bonsoir<br>  Nous vous avons enregistre comme nouvel Administrateur.<br>";
					Meteor.call("sendEmailNoreply",corpsHtml, subjectmail, email);
				}
				else throw new Meteor.Error(400, 'This user has already admin privileges');
			} else {
				var newAdminId = Accounts.createUser({
					email: email,
					profile: {
						firstname: firstname,
						name: name,
						userType: 'individual'
					}
				});
				Roles.addUsersToRoles(newAdminId, 'admin');
				Accounts.sendEnrollmentEmail(newAdminId);
			}
		} else 
				throw new Meteor.Error(405, 'You have to be an Administrator to do that');
	},
	removeAdmin: function(_id) {
		var current = Meteor.userId();
		if (_id != current) {
			if (current && Roles.userIsInRole(current, ['admin','root'])) {
				var user = Meteor.users.findOne({_id: _id});
				if (user) {
					if (Roles.userIsInRole(_id, 'admin')) {
						if (!Roles.userIsInRole(_id, 'root')) {
							Roles.removeUsersFromRoles(_id, 'admin');
						} else throw new Meteor.Error(405, "You can't revoke root's privileges");
					} else throw new Meteor.Error(400, "This user is not an administrator");
				} else throw new Meteor.Error(404, "User not found");
			} else throw new Meteor.Error(405, "You have to be an administrator to do that");
		} else throw new Meteor.Error(405, "You can't revoke your own privileges");
	},
	userResetPassword: function(email) {
		var existingUser = Meteor.users.findOne({
			$or: [
				{'emails.0.address': email},
				{'services.google.email': email},
				{'services.facebook.email': email},
				{'services.linkedin.emailAddress': email}
			]
		});
		if (existingUser)
			Accounts.sendResetPasswordEmail(existingUser._id);
		else
			throw new Meteor.Error(404, "Cette adresse email ne correspond a aucun compte");
	},
	certifyUser: function(uid) {
		var current = Meteor.userId();
		if (current) {
			if (Roles.userIsInRole(current, 'admin')) {
				var udata = UsersDatas.findOne({userId: uid});
				if (udata) {
					var b = Badges.findOne({name: 'Certifie'});
					if (b) {
						if (!_.findWhere(udata.badges, {badgeId: b._id})) {
							UsersDatas.update({userId: uid}, {$addToSet: {badges: {giver: current, badgeId: b._id}}});
						} else throw new Meteor.Error(400, 'This user is already certified');
					} else throw new Meteor.Error(500, 'Badges Certifie not found');
				} else throw new Meteor.Error(404, 'User not found');
			} else throw new Meteor.Error(403, 'You have to be an administrator to do that');
		} else throw new Meteor.Error(403, 'You have to be logged in to do that');
	},
	removeUser: function(_id) {
		var current = Meteor.userId();
		if (_id != current) {
			if (current && Roles.userIsInRole(current, ['admin','root'])) {
				var user = Meteor.users.findOne({_id: _id});
				if (user) {
					if (!Roles.userIsInRole(_id, 'root')) {
						Meteor.users.remove({_id: _id});
					} else throw new Meteor.Error(405, "You remove root's account");
				} else throw new Meteor.Error(404, "User not found");
			} else throw new Meteor.Error(405, "You have to be an administrator to do that");
		} else throw new Meteor.Error(405, "You can't remove your own account");
	},
	addUser: function(doc) { // 
		var existingUser = Meteor.users.findOne({
			$or: [
				{'emails.0.address': doc.email},
				{'services.google.email': doc.email},
				{'services.facebook.email': doc.email},
				{'services.linkedin.emailAddress': doc.email}
			]
		});
		if (existingUser && existingUser.services.password) // user exists and has password
			throw new Meteor.Error('Email already in database');
		else if (existingUser) {	// user exists but hasn't password
			if (doc.password != doc.confirmation)
				throw new Meteor.Error('Password confirmation mismatch');
			// we add its email and set password
			// then we send verification mail to ensure
			// identity (it have to be the same that previously logged in
			// with another service provider
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
					userType: doc.userType
				}
			});
			if (newUserId) {
				Accounts.sendVerificationEmail(newUserId);
				
				subjectmail ="[Jobday] Inscription sur Jobday";
				corpsHtml = "Bonjour et Bienvenue ! <br><br>Sujet : [JOBDAY] Inscription sur Jobday. Bonjour et Bienvenue ! "+
										"Nous avons le plaisir de vous accueillir au sein de la Communauté Jobday. "+
										"Votre inscription a bien été validée <br>  <a href=#>Conditions Générales </a> ) "+
										"Pour accéder à votre profil, <a href='http://jobday.fr/profiluser/'"+newUserId+"> cliquez ici</a> <br><br>";
										"N’hésitez pas à nous contacter directement sur contact@jobday.fr <br><br>";	
										"A bientôt! <br><br>L’équipe de Jobday.fr";
				Meteor.call("sendEmailNoreply",corpsHtml, subjectmail, doc.email);

				var subjectmail ="[Jobday] Débloquer vos badges";
				var corpsHtml = "Débloquer vos badges. <br>Un profil certifié, c'est quatre fois plus de chances d'être sélectionné !<br>"+
												"En moins de 5 minutes, obtenez l'ensemble de vos badges ! Certifier son profil, c'est simple et rapide <br>" ;
				Meteor.call("sendEmailNoreply",corpsHtml, subjectmail, doc.email);
				
				return newUserId;
			}
		}
	},
	closeAdvert: function(params) {
		var advertId = params.advertId;
		if (this.userId) {
			var advert = Adverts.findOne({_id: advertId});
			if (advert) {
				if (advert.owner == this.userId) {
					var offers = _.where(advert.offers, {validated: true});
					if (offers.length == advert.nbPeople)
						Adverts.update({_id: advertId}, {$set: {status: 2}});
					else { throw new Meteor.Error('Vous n\'avez pas valide suffisament d\'offres'); }
				} else { throw new Meteor.Error('Vous n\'etes pas le proprietaire de cette annonce'); }
			} else { throw new Meteor.Error('L\'annonce est introuvable'); }
		} else { throw new Meteor.Error('Vous devez etre connecte pour effectuer cette operation'); }
	},
	sendEmailNoreply: function (text, text2, text3) {
		this.unblock();
		var	html = emailBodyTemplate+text +emailBodyTemplate2;
		Email.send({
			to: text3,
			from: 'no-reply@incrdev.com',
			subject: text2,
			html: html
		});
	},
	sendEmailNoreplyByAnnonce: function (text, text2, text3) {
		var auteurAnnonce = Adverts.findOne({ "_id" : text3 }).owner ;
		var m1 = UsersDatas.findOne({userId: auteurAnnonce}).notificationMail;
		if (m1 && _.contains(m1, 3)) { 		
			this.unblock();
			text3 = Meteor.users.findOne({ "_id" : Adverts.findOne({ "_id" : text3 }).owner }).emails[0].address;
			var html = emailBodyTemplate+text +emailBodyTemplate2; 
			Email.send({
				to: text3,
				from: 'no-reply@incrdev.com',
				subject: text2,
				html: html
			});
		}
	},
	sendEmailNoreplySMS: function (text, text2, text3) {
		this.unblock();
		var html = text ;
		Email.send({
			to: text3,
			from: 'no-reply@incrdev.com',
			subject: text2,
			html: html
		});
	},
	sendEmailNoreplyAccountReseau: function (text, text2, text3) {
		this.unblock();
		text3 = Meteor.users.findOne({_id: text3}, {fields: {'services.facebook.email': 1}}).services.facebook.email; 
		var html = emailBodyTemplate + text +emailBodyTemplate2;
		Email.send({
			to: text3,
			from: 'no-reply@incrdev.com',
			subject: text2,
			html: html
		});
	},
	sendEmailNoreplyAccountReseau1: function (text, text2, text3) {
		this.unblock();
		text3 = Meteor.users.findOne({_id: text3}, {fields: {'services.google.email': 1}}).services.google.email; 
		var html = emailBodyTemplate + text +emailBodyTemplate2;
		Email.send({
			to: text3,
			from: 'no-reply@incrdev.com',
			subject: text2,
			html: html
		});
	},
	sendEmailNoreplyAccountReseau2: function (text, text2, text3) {
		this.unblock();
		text3 = Meteor.users.findOne({_id: text3}, {fields: {'services.linkedin.emailAddress': 1}}).services.linkedin.emailAddress; 
		var html = emailBodyTemplate + text +emailBodyTemplate2;
		Email.send({
			to: text3,
			from: 'no-reply@incrdev.com',
			subject: text2,
			html: html
		});
	},
	connexionReseaux: function (idOwner) {
		UsersDatas.update({userId: idOwner}, {
			$push: { 
				badges: {
					giver: idOwner,
					badgeId: Badges.findOne({"name":"Social"})._id
				} 
			} 
	 });
		UsersDatas.update({userId: Meteor.userId()}, {
			$push: { 
				badges: {
					giver: Meteor.userId(),
					badgeId: Badges.findOne({"name":"Mail"})._id
				} 
			} 
		});
	},
	sendAenvoyer: function (idOwner,typeAenvoyer,id_cle) {
		this.unblock();
		Aenvoyer.insert({
			owner: idOwner,
			type: typeAenvoyer ,
			id_cle: id_cle
		}, function(err) {
			if (err){
				//console.log(err);
			}
			return err;
		});

		if(typeAenvoyer=="0"){
			UsersDatas.update({userId: this.userId}, {$set: {verifPhone:Math.floor((Math.random() * 1000) + 1) }}, function() {
			});		
		}
	},
	verifEmail: function () {
		try {
			Accounts.emailTemplates.siteName = "www.jobday.fr";
			Accounts.emailTemplates.from     = "Jobday <no-reply@incrdev.com>";
			Accounts.emailTemplates.verifyEmail = {
			  subject: function() {
					return "[Jobday] Verify Your Email Address";
			  },
				html: function(user, url) {
					var supportEmail   = "concact@jobday.fr",
							emailBody = emailBodyTemplate+"<br>Bonjour/Bonsoir<br>  Nous avons bien pris en compte votre inscription. <br>"+
													"Pour activer votre compte et débloquer votre badge E-mail vérifié, il vous suffit "+
													"de cliquer sur le lien ci-dessous : <a href='" +url+"'> Valider mon compte <a/> "+
													emailBodyTemplate2;
				 return emailBody;
			  }
			};
			Accounts.sendVerificationEmail(this.userId);
		}	catch (e) {
			throw new Meteor.Error('Vous avez un compte Réseau (Facebook ou autre), la vérification ne peut vous être affecter ');				
		}
			
	},
	existeUser: function(idOwner) { // 
		var existingUser = Meteor.users.findOne({_id:idOwner,createdAt :{$lt: new Date} });
		if (existingUser){
			return true;
		} else {
			return false;
		}
	}
});
