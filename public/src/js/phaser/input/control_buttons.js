Polyworks.ControlButtons = (function() {
	Utils.inherits(ControlButtons, Polyworks.Collection);
	
	var _this = this;
	function ControlButtons(params) {
		_this = this;
		params.collection = this;
		ControlButtons._super.constructor.call(this, params);
	}
	
	ControlButtons.prototype.init = function() {
		ControlButtons._super.init.call(this, 'ControlButton');

		var button;
		var controlConsole = Polyworks.Game.phaser.add.group(null);
		for(var i = 0; i < this.collection.length; i++) {
			button = this.collection[i].button;
			controlConsole.add(button);
		}
	}
	
	ControlButtons.prototype.remove = function() {
		for(var i = 0; i < this.collection.length; i++) {
			this.collection[i].destroy();
		}
	};
	
	return ControlButtons;
})();