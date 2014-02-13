Polyworks.LevelState = (function() {
	Utils.inherits(LevelState, Polyworks.State); 
	
	var _this;
	function LevelState(params) {
		// trace('LevelState/constructor, phaser = ');
		_this = this;
		LevelState._super.constructor.call(this, params);

		this.gameOver = false;
		this.terrain;
		this.controls;
		this.cursors;
		this.player; 
		this.quitButton;
		// PolyworksGame.score = 0;
	};
	
	LevelState.prototype.preload = function() {
	};
	
	LevelState.prototype.create =  function() {
		// trace('LevelState['+this.model.name+']/create');
		LevelState._super.create.call(this);
	};
	
	LevelState.prototype.createState = function() {

		// create views and controls with super
		LevelState._super.createState.call(this);

		this.terrain = this.getChildByName('terrain');
		this.sectorManager = this.getChildByName('sectors');
		this.sectorManager.setActiveSector(0);

		this.createPlayer();

		// this.addOvalMask();
	};

	LevelState.prototype.createPlayer = function() {
		var playerConfig = Utils.clone(PolyworksGame.get('player'));
		// trace('Level['+this.model.name+']/createPlyaer, playerConfig = ');
		// trace(playerConfig);

		playerConfig.game = PolyworksGame.phaser;
		playerConfig.sectorManager = this.sectorManager;

		this.playerGroup = PolyworksGame.phaser.add.group();
		this.player = new Polyworks[playerConfig.cl](playerConfig);
		this.player.begin();
		this.playerGroup.add(this.player);
		trace('LevelState['+this.model.name+']/player created, jump = ' + playerConfig.attrs.speed.y, playerConfig);
	};
	
	LevelState.prototype.addOvalMask = function() {
		var mask = PolyworksGame.phaser.add.sprite(-5, -5, 'ovalMask');
		mask.width = PolyworksStage.width + 10;
		mask.height = PolyworksStage.height + 10;
		mask.fixedToCamera = true;
	};
	
	var renderedOnce = false;
	LevelState.prototype.render = function() {
		if(!renderedOnce) {
			trace('LevelState['+this.model.name+']/render');
			trace(this.player.body);
		    PolyworksGame.phaser.debug.renderRectangle(this.player.body);
			renderedOnce = true;
		}

	};
	
	LevelState.prototype.update = function() {
		if(!this.paused) {
			// trace('LevelState['+this.model.name+']/update');
			if(this.player.body.x >= this.model.bounds.end) {
				PolyworksGame.changeState('intermission');
			} else {
				// update active sector via sector manager
				var updateParams = {
					player: this.player.sprite,
					terrain: this.terrain.group,
					position: {
						x: this.game.camera.x + (PolyworksStage.winW/2),
						y: this.game.camera.y + (PolyworksStage.winH/2)
					}
				};
				this.sectorManager.pwUpdate(updateParams);

				// update player with active sector members & terrain
				var sector = this.sectorManager.activeSector;

				this.player.pwUpdate({
					terrain: this.terrain.group,
					dynamicTerrain: sector.dynamicTerrain.getActive(),
					hazards: sector.hazards.getActive(),
					enemies: sector.enemies.getActive(),
					bonuses: sector.bonuses.getActive(),
					context: this
				});
			}
			LevelState._super.update.call(this);
		}
	};
	
	LevelState.prototype.shutdown = function() {
		Utils.each(this.model.collection,
			function(c) {
				c.destroy();
			},
			this
		);

		this.playerGroup.destroy();
		this.player.destroy();
		LevelState._super.shutdown.call(this);
	};

	return LevelState;
})();
