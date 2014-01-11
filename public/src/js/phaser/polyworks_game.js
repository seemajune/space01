Polyworks.Game = (function() {
	var _model = {};
	var _player = {};
	var _controls = {};
	var _states = {};
	var _qKey; 
	
	var polyworks_game = {
		phaser: null,
		score: 0,
		currentState: '',
		previousState: '',
		gameOver: false,

		init: function(params) {
			_model = params;

			Polyworks.Game.phaser = new Phaser.Game(stage.width, stage.height, Phaser.AUTO, '', { preload: _preload, create: _create });
			// _checkPhaserBoot();
		},

		getPlayer: function() {
			return _player;
		},

		getControls: function() {
			return _controls;
		},

		getStates: function() {
			return _states;
		},

		get: function(key) {
			if(_model.hasOwnProperty(key)) {
				return _model[key];
			}
		},

		set: function(params) {
			for(var key in params) {
				_model[key] = params[key];
			}
		},

		changeState: function(id) {
			var state = _states[id];
			Polyworks.Game.previousState = Polyworks.Game.currentState;
			Polyworks.Game.currentState = id;
			Polyworks.Game.phaser.state.start(id, state.clearWorld, state.clearCache);
		},

		quit: function() {
			trace('Polyworks.Game/quit');
			if(!Polyworks.Game.gameOver) {
				Polyworks.EventCenter.reset();
				Polyworks.Game.gameOver = true;
				Polyworks.Game.phaser.destroy();
			}
		}
	};

	function _preload() {
		// trace('_preload');
		var images = _model.images;
		// trace('preload images');
		for(key in images) {
			Polyworks.Game.phaser.load.image(key, images[key]);
		}
		var sprites = _model.sprites;
		// trace('preload sprites');
		for(key in sprites) {
			// trace('\t' + key + ', width = ' + sprites[key].width + ', height = ' + sprites[key].height + ', frames = ' + sprites[key].frames);
			Polyworks.Game.phaser.load.spritesheet(key, sprites[key].url, sprites[key].width, sprites[key].height, sprites[key].frames);
		}
	}
	
	function _create() {
		_initEvents();
		_initWorld();
		_initPlayer();
		_initControls();
		_initStates();
		Polyworks.Game.changeState(config.initialState);

	}
	
	function _initEvents() {
		Polyworks.EventCenter.init();
		// Polyworks.EventCenter.bind(Polyworks.Events.CONTROL_BUTTON_PRESSED, _controlButtonPressed);
	}
	
	function _controlButtonPressed(event) {
		trace('Polyworks.Game/_controlButtonPressed, event = ');
		trace(event);
		switch(event.value) {
			case Polyworks.ControlKeys.QUIT:
			Polyworks.Game.quit();
			break;
		}
	}
	
	function _initWorld() {
		Polyworks.Game.phaser.world.setBounds(world.x, world.y, world.width, world.height);
	}

	function _initPlayer() {
		// trace('Polyworks.Game/init, phaser = ');
		// trace(Polyworks.Game.phaser);

		// _player = new Polyworks.Player(config.player, 0);
	}
	
	function _initControls() {
		_controls = new Polyworks.ControlButtons(config.controls);

		// CONTROLS
		_qKey = Polyworks.Game.phaser.input.keyboard.addKey(Phaser.Keyboard.Q);
		_qKey.onDown.add(Polyworks.Game.quit, this);
	}

	function _initStates() {
		_states = {};

		var states = _model.states;
		var state;
		// trace(states);
		for(var i = 0; i < states.length; i++) {
			state = new Polyworks[states[i].type](states[i], states[i].name);
			_states[states[i].name] = state;
			Polyworks.Game.phaser.state.add(states[i].name, state, false);
		}
		// trace('Game/init, initialState = ' + config.initialState + ', states = ');
		// trace(_states);
		// Polyworks.Game.phaser.state.add(config.initialState, _states[config.initialState], false);
	}

	return polyworks_game;
}());