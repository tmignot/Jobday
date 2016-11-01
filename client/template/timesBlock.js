Template.times.helpers({
	arrayTimes: function() {
		var n = Template.instance().data;
		if (n)
			return _.times(n, function(i) {return i;});
	}
});
