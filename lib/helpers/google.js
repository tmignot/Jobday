if (Meteor.isClient) {
	Maps = {
		loaded: false,
		queryUrl: 'https://maps.googleapis.com/maps/api/js?',
		params: {
			v: '3',
			key: 'AIzaSyCZi1ejGcXnlRxRdOqcqy5noRhSEAhaWt8',
			libraries: 'places',
			callback: 'Maps.init'
		},
		maps: [],
		places: {},
		geocoder: null,
		init: function() {
			if (!this.loaded) {
				this.loaded = true;
				_.each(this._cbs, function(cb) {
					cb.f(cb.p);
				});
				this._cb = [];
			}
		},
		getUrl: function() {
			var resp = this.queryUrl;
			var self = this;
			_.each(_.keys(this.params), function(k,i,l) {
				resp += (i < l.length-1)? k+'='+self.params[k]+'&':k+'='+self.params[k];
			});
			return resp;
		},
		create: function(options) {
			if (this.loaded) {
				this._checkOptions(options)
				switch(options.type) {
					case 'autocomplete':
						this.places.autocomplete = new google.maps.places.Autocomplete(options.doc, options.params);
						break;
					case 'geocoder':
						if (!this.geocoder)
							this.geocoder = new google.maps.Geocoder();
						break;
					default: return;
				}
			} else
				this._cbs.push({f: this.create, p: options});
		},
		_cbs: [],
		_checkOptions: function(options) {
			var check = function(k,t,o) {
				if (!o || !o[k] || typeof(t) != 'function' || typeof(t()) != typeof(o[k]))
					throw new Meteor.error('Maps option error: '+k+' should be of type '+typeof(t()));
			};
			check('type', String, options);
			check('doc', Object, options);
			check('params', Object, options);
		}
	};

	(function() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = Maps.getUrl(),
		document.body.appendChild(script);
	})();
}
