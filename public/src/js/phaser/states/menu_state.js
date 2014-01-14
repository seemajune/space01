Polyworks.MenuState = (function() {
	Utils.inherits(MenuState, Polyworks.ControlsState);
	
	var _this;
	function MenuState(params) {
		_this = this;
		MenuState._super.constructor.call(this, params);
	}
	
	MenuState.prototype.createState = function() {
		MenuState._super.createState.call(this);
		// this.createControls.call(this);

		Polyworks.EventCenter.bind(Polyworks.Events.BUTTON_PRESSED, _this.onButtonPressed, _this);

	};
	
	MenuState.prototype.onButtonPressed = function(event) {
		trace('MenuState/onButtonPressed, event = ');
		trace(event);
		if(event.value === Polyworks.InputCodes.PLAY) {
			PolyworksGame.changeState('level'); 
		}
	};
	
	return MenuState;
})();