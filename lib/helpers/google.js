/*
** I created this Maps Api wrapper to ensure loading is complete
** every time I call it,
** To permit registration of callbacks
** To keep handers on objects like map, geocoder, etc, not re-creating
** them everytime I need
**
** I will not comment it wright know but here is a little hint :

Maps.create(params) : params.type have to exist and be one of 
											'autocomplete', 'map', 'marker', 'distance', 'geocoder'

for type 'autocomplete' : 
	- params.doc is an inputHTMLElement
	- params.params contains autocomplete options, 
			check google maps autocomplete documentation
			for more informations

for type 'maps' :
	- params.name is the name you choose for your map object
	- params.doc is usually a divHTMLElement
	- params.params contains maps options, 
			check google maps Maps documentation
			for more informations

for type 'marker':
	- params.map is a map object created by Maps.create,
		you can retrieve by calling Maps.maps.[name],
		replacing [name] by the name you chose for the map
		you want to add this marker to
	- params.position is a latLng
			see google document for more informations 
			about latLng

for types 'geocoder' and 'distance', no parameters are required.
	these objects will only be created once to save space and
	computation time.

NB: You should always use object created by this API in a callback
		registered by calling Maps.onLoad to ensure everything is loaded
		before executing your scripts.
		You will usualy do : 
			Maps.create(...); 
			Maps.onLoad(function() {...});
		I'll maybe set an optional callback parameter like Maps.create(params, callback)
		in the future if necessary

NB2: You can set the API key in the params.key below


*/
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
					cb.f.call(this, cb.p);
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
						if (options.listeners) {
							_.each(_.keys(options.listeners), function(k) {
								Maps.places.autocomplete.addListener(k, options.listeners[k]);
							});
						}
						break;
					case 'map':
						this._checkMap(options);
						this.maps[options.name] = new google.maps.Map(options.doc, options.params);
						break;
		
					case 'marker':
						this._checkMarker(options);
						this.markers[options.name] = new google.maps.Marker(options);
						
						this.markers[options.name].addListener('click', function() {
							
				var corpsHtml ="Annonce : " 
				var corpsHtml = corpsHtml + "<br><div style ='width:100px;word-wrap: break-word;'><a href='/missionProfil/" + options.name +"'>" +Adverts.findOne({_id: options.name}).title ;
				var corpsHtml = corpsHtml + "</a></div>";
				
				var infowindow = new google.maps.InfoWindow({
							content: corpsHtml 
						  }).open(this.maps,this);
						});
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
				if (options.after && typeof options.after == 'function')
					options.after.call();
			} else {
				Maps._cbs.push({f: Maps.create, p: options});
			}
		},
		_check: function(k,t,o) {
				if (!o || !o[k] || typeof(t) != 'function' || typeof(t()) != typeof(o[k]))
					throw new Error('Maps option error: '+k+' should be of type '+typeof(t()));
		},
		_checkMap: function(options) {
			this._check('doc', Object, options);
			this._check('name', String, options);
			this._check('params', Object, options);
		},
		_checkAutocomplete: function(options) {
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
