Images = new FilesCollection({
	collectionName: 'Images',
	storagePath: function() { return '/home/tmignot/Agency/jobday-uploads'; },
	allowClientCode: true,
	onBeforeRemove: function(cursor) {
		var records = cursor.fetch();
		if (records && records.length) {
			_.each(records, function(r) {
				if (r.userId != this.userId) {
					return false;
				}
			});
		}
		return true
	}
});

