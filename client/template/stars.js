Template.stars.onCreated(function() {
	// n : array of notes values
	// l : length of notes array
	// s : sum of all notes
	// mean: mean of all notes
	console.log(this.data);
	var n = _.map(this.data.notes, function(e) { return e.note }),
			l = this.data.notes.length;
	var s = _.reduce(n, function(acc,val){ return acc+val }, 0);
	if (l)
		this.mean = Math.floor(s / l);
	else
		this.mean = 0;
});

Template.stars.helpers({
	mean: function() { return Template.instance().mean },
	fullStars: function() {	return Math.floor(Template.instance().mean / 2); },
	halfStars: function() {	return Template.instance().mean % 2; },
	emptyStars: function() {
		return 5 - Math.floor(Template.instance().mean / 2) - Template.instance().mean % 2
	},
});
