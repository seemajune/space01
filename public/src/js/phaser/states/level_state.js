
Polyworks.LevelState = (function() {
	Utils.inherits(LevelState, Polyworks.ControlsState); 
	
	var _this;
	function LevelState(params, id) {
		// trace('LevelState/constructor, phaser = ');
		_this = this;
		LevelState._super.constructor.call(this, params, id);

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
		// trace('LevelState['+this.id+']/create');
		LevelState._super.create.call(this);
	}
	
	LevelState.prototype.createState = function() {

		// create views and controls with super
		LevelState._super.createState.call(this);

		this.terrain = this.elements.terrain;
		this.sectorManager = this.elements.sectors;
		// trace('player type = ' + config.player.type);
		this.player = new Polyworks[config.player.type](Utils.clone(config.player.attrs), config.player.name);

		this.createControls.call(this);

		this.gui = this.elements.gui;
		this.gui.setInitialContent();
	};
	
	LevelState.prototype.update = function() {
		// trace('this.player.x = ' + this.player.sprite.x + ', end = ' + this.model.bounds.end);
		// this.gameOver = true;
		if(!this.gameOver) {
			if(this.player.sprite.x >= this.model.bounds.end) {
				PolyworksGame.changeState('intermission');
			} else {
				this.sectorManager.checkTerrainCollision(this.terrain.group);
				this.sectorManager.setActive(this.game.camera.x + (stage.width/2));

				var sector = this.sectorManager.activeSector;
				sector.enemies.update({ player: this.player.sprite });

				this.player.update({
					terrain: this.terrain.group,
					enemies: {
						collection: sector.enemies.getActive(),
						callback: this.enemyCollision
					},
					bonuses: {
						collection: sector.bonuses.getActive(),
						callback: this.bonusCollision
					},
					context: this
				});

			}
		}
	};
	
	LevelState.prototype.enemyCollision = function(player, sprite) {
		// trace('LevelState['+this.id+']/enemyCollision');
		// trace(this);
		// trace(this.sectorManager);
		var enemy = this.sectorManager.activeSector.enemies.collection[sprite.idx];

		if(this.player.isJumping) {
			this.player.hitEnemy();
			enemy.damaged(this.player.damage);
		} else {
			this.gui.setContent('health', this.player.health);
			this.player.damaged(enemy.damage);
		}
	};

	LevelState.prototype.bonusCollision = function(player, sprite) {
		var bonus = this.sectorManager.activeSector.bonuses.collection[sprite.idx];
		sprite.kill();
		bonus.active = false; 

	    PolyworksGame.score += bonus.get('score');

		this.player.health += bonus.get('health');
		this.gui.setContent('health', this.player.health);
	};

	LevelState.prototype.shutdown = function() {
		this.player.destroy();
		this.player = null;
		LevelState._super.shutdown.call(this);
	};

	return LevelState;
})();
