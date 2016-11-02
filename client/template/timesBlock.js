/*
** creates a dummy array containing values from 0 to [data.n]
** Very usefull to write n times something in a template
**	Example: {{#times 5}} hello {{this}}x {{/times}}
**				->	hello 0x hello 1x ... hello 4x
*/
Template.times.helpers({
	arrayTimes: function() {
		var n = Template.instance().data;
		if (n)
			return _.times(n, function(i) {return i;});
	}
});
