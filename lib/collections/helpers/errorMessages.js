SimpleSchema.messages({
	required: "<strong>[label]</strong> est requis",
	minString: "<strong>[label]</strong> doit faire au moins [min] caracteres",
	maxString: "<strong>[label]</strong> ne doit pas depasser [max] caracteres",
	minNumber: "<strong>[label]</strong> doit etre superieur ou egal a [min]",
	maxNumber: "<strong>[label]</strong> ne doit pas depasser [max]",
	minDate: "<strong>[label]</strong> doit etre posterieure au [min]",
	maxDate: "<strong>[label]</strong> doit etre anterieure au [max]",
	badDate: "<strong>[label]</strong> n'est pas un format de date valide",
	minCount: "Il doit y avoir au moins [minCount] valeurs",
	maxCount: "Le nombre de valeurs ne doit pas depasser [maxCount]",
	noDecimal: "<strong>[label]</strong> doit etre un entier",
	notAllowed: "[value] n'est pas une valeur autorisee",
	expectedString: "<strong>[label]</strong> doit etre une chaine de caractere",
	expectedNumber: "<strong>[label]</strong> doit etre un nombre",
	expectedBoolean: "<strong>[label]</strong> ne peut etre qu'une valeur booleene",
	expectedArray: "<strong>[label]</strong> doit etre un tableau",
	expectedObject: "<strong>[label]</strong> doit etre un objet",
	expectedConstructor: "<strong>[label]</strong> doit etre un [type]",
	regEx: [
		{msg: "<strong>[label]</strong> failed regular expression validation"},
		{exp: SimpleSchema.RegEx.Email, msg: "<strong>[label]</strong> doit etre une adresse e-mail valide"},
		{exp: SimpleSchema.RegEx.WeakEmail, msg: "<strong>[label]</strong> doit etre une adresse e-mail valide"},
		{exp: SimpleSchema.RegEx.Domain, msg: "<strong>[label]</strong> doit etre un nom de domaine valide"},
		{exp: SimpleSchema.RegEx.WeakDomain, msg: "<strong>[label]</strong> doit etre un nom de domaine valide"},
		{exp: SimpleSchema.RegEx.IP, msg: "<strong>[label]</strong> must be a valid IPv4 or IPv6 address"},
		{exp: SimpleSchema.RegEx.IPv4, msg: "<strong>[label]</strong> must be a valid IPv4 address"},
		{exp: SimpleSchema.RegEx.IPv6, msg: "<strong>[label]</strong> must be a valid IPv6 address"},
		{exp: SimpleSchema.RegEx.Url, msg: "<strong>[label]</strong> doit etre une URL valide"},
		{exp: SimpleSchema.RegEx.Id, msg: "<strong>[label]</strong> doit etre un ID valide"}
	],
	keyNotInSchema: "[key] n'est pas reconnue"
});