Template.stars.onCreated(function() {
	if (typeof this.data.notes == 'number') {
		this.mean = this.data.notes + 1;
	} else {
		// n : array of notes values
		// l : length of notes array
		// s : sum of all notes
		// mean: mean of all notes
		var n = _.map(this.data.notes, function(e) { return e.note + 1 }),
				l = this.data.notes.length;
		var s = _.reduce(n, function(acc,val){ return acc+val }, 0);
		if (l)
			this.mean = Math.floor(s / l);
		else
			this.mean = 0;
	}
});

Template.stars.helpers({
	mean: function() { return Template.instance().mean },
	fullStars: function() {	return Math.floor(Template.instance().mean); },
	emptyStars: function() {
		return 5 - Math.floor(Template.instance().mean);
	},
});
