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
		maps: {},
		places: {},
		markers: {},
		distance: null,
		_cbs: [],
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
		onLoad: function(cb) {
			if (!this.loaded)
				this._cbs.push({f: cb, this});
			else
				cb(this);
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
				switch(options.type) {
					case 'autocomplete':
						this._checkAutocomplete(options);
						this.places.autocomplete = new google.maps.places.Autocomplete(options.doc, options.params);
						break;
					case 'map':
						this._checkMap(options);
						this.maps[options.name] = new google.maps.Map(options.doc, options.params);
						break;
					case 'marker':
						this._checkMarker(options);
						this.markers[options.name] = new google.maps.Marker(options);
						break;
					case 'geocoder':
						if (!this.geocoder)
							this.geocoder = new google.maps.Geocoder();
						break;
					case 'distance':
						if (!this.distance)
							this.distance = new google.maps.DistanceMatrixService();
						break;
					default: 
						throw new Error('Maps.create: no valid type found');
				}
			} else
				this._cbs.push({f: this.create, p: options});
		},
		_check: function(k,t,o) {
				if (!o || !o[k] || typeof(t) != 'function' || typeof(t()) != typeof(o[k]))
					throw new Meteor.error('Maps option error: '+k+' should be of type '+typeof(t()));
		},
		_checkMap: function(options) {
			this._check('type', String, options);
			this._check('doc', Object, options);
			this._check('name', String, options);
			this._check('params', Object, options);
		},
		_checkAutocomplete: function(options) {
			this._check('type', String, options);
			this._check('doc', Object, options);
			this._check('params', Object, options);
		},
		_checkMarker: function(options) {
			this._check('name', String, options);
			this._check('map', Object, options);
			this._check('position', Object, options);
		}
	};

	(function() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = Maps.getUrl(),
		document.body.appendChild(script);
	})();
}
