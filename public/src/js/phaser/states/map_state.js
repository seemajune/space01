Polyworks.MapState = (function() {
	Polyworks.Utils.inherits(MapState, Polyworks.MenuState); 
	
	function MapState(params) {
		MapState._super.constructor.call(this, params);
	}

	MapState.prototype.createState = function() {
		trace('MapState/createState, this = ', this);
		// MapState._super.createState.call(this);
		var stateGroup = PolyworksGame.phaser.add.group();
		this.model.stateGroup = stateGroup;

		var pages = this.model.pages;
		trace('\tpages = ', pages);
		this.model.pageCollection = [];
		var mapPage;

		Polyworks.Utils.each(pages,
			function(page) {
				trace('\tcreating MapPage with: ', page);
				page.addTo = 'stateGroup';
				page.stateGroup = stateGroup;
				mapPage = new Polyworks.MapPage(page);
				mapPage.begin();
				this.model.pageCollection.push(mapPage);
				// this.model.attrs.push(page);
			},
			this
		);

		MapState._super.createState.call(this);

	};
	
	return MapState;
})();