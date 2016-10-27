Template.registerHelper('Maps', function() { return Maps; });
Template.registerHelper('toUrlQuery', function(obj) {
	var q = '';
	_.each(_.keys(obj), function(k, i, l) {
		q += (i == l.length-1) ? k+'='+obj[k] : k+'='+obj[k]+'&';
	});
	return q;
});
