Polyworks.Player = (function() {
	// Polyworks.Utils.inherits(Player, Polyworks.AnimatedSprite);
	Polyworks.Utils.inherits(Player, Polyworks.Sprite);

	var _this;
	function Player(params) {
		// trace('Player/constructor');
		_this = this;
		this.model = new Polyworks.Model(params);
		this.initialPosition = true;
		this.oneUpdate = false;
		Player._super.constructor.call(this, params);
		// trace('player body size = ' + this.body.width + '/' + this.body.height);
	}
	
	Player.prototype.begin = function(health) {
		Player._super.begin.call(this);

		// this.health = PolyworksGame.startingHealth;
		this.health = health;

		this.velX = 0;
		this.velY = 0;
		this.previousY = this.body.y;
		this.damageTimer = 0;
		this.damageInterval = 250;
		this.justDamaged = false;

		this.beginWorld();
		this.beginEvents();
		this.beginControls();

		PolyworksGame.setHealth(this.health);
		trace('PLAYER:', this);
	};

	Player.prototype.collided = function(a, b, c) {
		trace('Player/collided', a, b, c);
	};
	
	Player.prototype.setGroup = function(group) {
		this.group = group;
	};
	
	Player.prototype.beginWorld = function() {
		// trace('Player/beginWorld');
		// trace(this);
		var attrs = this.model.attrs;
		if(attrs.anchor) {
			this.anchor.setTo(attrs.anchor.x, attrs.anchor.y);
		}
		if(attrs.followStyle) {
			PolyworksGame.phaser.camera.follow(this, attrs.followStyle);
		}
	};
	
	Player.prototype.beginEvents = function() {
		Polyworks.EventCenter.bind(Polyworks.Events.CONTROL_PRESSED, this.onControlButtonPressed, this);
		Polyworks.EventCenter.bind(Polyworks.Events.CONTROL_RELEASED, this.onControlButtonReleased, this);
	};
	
	Player.prototype.beginControls = function() {
		this.activeControls = {};
		this.activeControls[Polyworks.InputCodes.LEFT] = false;
		this.activeControls[Polyworks.InputCodes.RIGHT] = false;
		this.activeControls[Polyworks.InputCodes.UP] = false;
		this.activeControls[Polyworks.InputCodes.SPACE] = false;
		this.activeControls[Polyworks.InputCodes.DOWN] = false;
		// trace('activeControls');
		// trace(this.activeControls);
	};
	
	Player.prototype.onControlButtonPressed = function(event) {
		this.activeControls[event.value] = true;
		// trace('Player.prototype.onControlButtonPressed, event.value = ' + event.value);
		// trace(this.activeControls);
		if(event.value === Polyworks.InputCodes.RESET) {
			this.activeControls[Polyworks.InputCodes.LEFT] = false;
			this.activeControls[Polyworks.InputCodes.RIGHT] = false;
		} else if(event.value === Polyworks.InputCodes.LEFT) {
			this.activeControls[Polyworks.InputCodes.RIGHT] = false;
		} else if(event.value === Polyworks.InputCodes.RIGHT) {
			this.activeControls[Polyworks.InputCodes.LEFT] = false;
		}
		this.updatePosition();
	};
	
	Player.prototype.onControlButtonReleased = function(event) {
		this.activeControls[event.value] = false;
		// trace('Player.prototype.onControlButtonReleased, event.value = ' + event.value);
		// trace(this.activeControls);
		if(event.value === Polyworks.InputCodes.RESET) {
			this.activeControls[Polyworks.InputCodes.LEFT] = false;
			this.activeControls[Polyworks.InputCodes.RIGHT] = false;
		} else if(event.value === Polyworks.InputCodes.LEFT) {
			this.activeControls[Polyworks.InputCodes.RIGHT] = false;
		} else if(event.value === Polyworks.InputCodes.RIGHT) {
			this.activeControls[Polyworks.InputCodes.LEFT] = false;
		}
		this.updatePosition();
	};
	
	Player.prototype.updatePosition = function() {
		// trace('Player/updatePosition, x = ' + this.body.x);
		if(this.initialPosition) {
			this.initialPosition = false;
			this.activateGravity();
		}

		this.velX = 0;
		this.velY = 0;
		var attrs = this.model.attrs;

		if (this.activeControls[Polyworks.InputCodes.LEFT]) {
			this.velX = -attrs.speed.x;
			attrs.facingForward = false;
		}
		else if (this.activeControls[Polyworks.InputCodes.RIGHT]) {
			this.velX = attrs.speed.x;
			attrs.facingForward = true;
		}

		this.body.velocity.x = this.velX;

		if(this.activeControls[Polyworks.InputCodes.UP] || this.activeControls[Polyworks.InputCodes.SPACE]) {
			if(attrs.grounded && !attrs.justJumped) {
				this.velY = -attrs.speed.y;
				this.body.velocity.y = this.velY;
				attrs.grounded = false;
				attrs.jumping = true;
				attrs.justJumped = true;
			} else {
				this.velY = 0;
			}
		} else if(this.activeControls[Polyworks.InputCodes.DOWN]) {
			// trace('Player/updatePosition, down is active')
		}
	};
	
	Player.prototype.updatePositionFromCollision = function() {
		this.velY = -this.model.attrs.speed.y/2;
		this.body.velocity.y = this.velY;
	};
	
	Player.prototype.activateGravity = function() {
		// trace('Player/activateGravity');
		Player._super.activateGravity.call(this);
	};

	Player.prototype.pwUpdate = function(params) {
		// trace('Player/update, health = ' + this.health);
		// trace(params);
		if(this.alive) {
			// if(this.initialPosition) {
			// 	var start = this.model.attrs.start;
			// 	trace('Player/update x/y = ' + this.x + '/' + this.y 
			// 			+ '\n\tx/y = ' + this.body.x + '/' + this.body.y 
			// 			+ '\n\tstart = ' + start.x + '/' + start.y);
			// }
			this.collided = false;
			var physics = PolyworksGame.phaser.physics;
			var attrs = this.model.attrs;
			var physicalItems = params.physicalItems; 

			for(var key in physicalItems) {
				this[('check' + key + 'Collision')](physicalItems[key], physics);
			}

			if(this.body.touching.down) {
				attrs.grounded = true;
				attrs.jumping = false;
				attrs.justJumped = false;
			} else {
				attrs.grounded = false;
			}
		}
	};

	Player.prototype.checkHazardsCollision = function(hazards, physics) {
		this.checkCollision(hazards, this.onHazardCollision, physics, this);
	};
	
	Player.prototype.checkEnemiesCollision = function(enemies, physics) {
		this.checkCollision(enemies, this.onEnemyCollision, physics, this);
	};
	
	Player.prototype.checkBonusesCollision = function(bonuses, physics) {
		this.checkCollision(bonuses, this.onBonusCollision, physics, this);
	};
	
	Player.prototype.checkRequirementsCollision = function(requirements, physics) {
		this.checkCollision(requirements, this.onRequirementCollision, physics, this);
	};
	
	Player.prototype.checkCollision = function(collection, callback, physics, context) {
		// trace('Player/checkCollision, health = ' + this.health);
		Polyworks.Utils.each(collection,
			function(c) {
				physics.overlap(this, c, callback, null, context);
			},
			this
		);
	};

	Player.prototype.onHazardCollision = function(player, hazard) {
		// trace('Player/onHazardCollision, hazard = ');
		// trace(hazard);
		this.collided = true;
		this.receiveDamage(hazard.model.attrs.attack);
	};
	
	Player.prototype.onEnemyCollision = function(player, enemy) {
		this.collided = true;
		var playerX = player.body.x + (player.body.width);
		var playerY = player.body.y + (player.body.height);
		var enemyX = enemy.body.x + (enemy.body.width);
		var enemyY = enemy.body.y + (enemy.body.height);
		// trace('Player/onEnemyCollision['+enemy.model.name+'], player x/y = ' + Math.ceil(playerX) + '/' + Math.ceil(playerY) + ', enemy x/y = ' + Math.ceil(enemyX) + '/' + Math.ceil(enemyY));
		// trace(enemy);

		if(playerY < (enemyY)) { // player is above enemy
			this.updatePositionFromCollision();
			enemy.damage(this.model.attrs.attack);
		} else {
			this.receiveDamage(enemy.model.attrs.attack);
		}
	};
	
	Player.prototype.onBonusCollision = function(player, bonus) {
		// Polyworks.EventCenter.trigger({ type: Polyworks.Events.BONUS_COLLISION, player: player, bonus: bonus });
		// trace('Player/onBonusCollision, bonus = ');
		// trace(bonus);
		this.collided = true;

		var health = bonus.model.attrs.health;
		if(health) {
			this.health += health;
			PolyworksGame.setHealth(this.health);
		}
		if(bonus.model.attrs.score) {
		    PolyworksGame.setLevelScore(bonus.model.attrs.score);
		}
		bonus.active = false; 
		bonus.destroy();
	};
	
	Player.prototype.onRequirementCollision = function(player, requirement) {
		// Polyworks.EventCenter.trigger({ type: Polyworks.Events.BONUS_COLLISION, player: player, bonus: bonus });
		// trace('Player/onRequirementCollision, bonus = ', requirement);

		this.collided = true;
		requirement.collect();
	};
	
	Player.prototype.receiveDamage = function(damage) {
		// trace('Player/receiveDamage, justDamaged = ' + this.justDamaged);
		if(!this.justDamaged) {
			this.health -= damage;
			PolyworksGame.setHealth(this.health);
			if(this.health <= 0) {
				PolyworksGame.levelScore = 0;
				PolyworksGame.changeState('gameOver');
			} else {
				_this.justDamaged = true;
				_this.damageTimer = setTimeout(_this.resetJustDamaged, _this.damageInterval);
			}
		}
	};
	
	Player.prototype.resetJustDamaged = function() {
		clearTimeout(_this.damageTimer);
		_this.justDamaged = false;
	};
	
	Player.prototype.destroy = function() {
		// trace('Player/destroy');
		Polyworks.EventCenter.unbind(Polyworks.Events.CONTROL_PRESSED, this.onControlButtonPressed);
		Polyworks.EventCenter.unbind(Polyworks.Events.CONTROL_RELEASED, this.onControlButtonReleased);

		this.alive = false;
		this.update = null;
		this.updatePosition = null;
		Player._super.destroy.call(this);
	};
	
	return Player;
})();