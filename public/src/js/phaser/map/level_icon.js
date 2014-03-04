Polyworks.LevelIcon = (function() {
	Polyworks.Utils.inherits(LevelIcon, Polyworks.GroupCollection);
	
	LevelIcon.width = (Polyworks.Stage.stageUnit * 2);
	LevelIcon.height = (Polyworks.Stage.stageUnit * 1.5);
	
	function LevelIcon(params) {
		LevelIcon._super.constructor.call(this, params);
	}
	
	LevelIcon.prototype.begin = function() {
		this.model.attrs = this.initAttributes();
		trace('LevelIcon['+this.model.name+']/begin', this.model);
		LevelIcon._super.begin.call(this);
	};
	
	LevelIcon.prototype.initAttributes = function() {
		var attributes = [
		{
			name: 'levelIcon',
			cl: 'Sprite',
			attrs: {
				img: this.model.name + 'Icon',
				start: this.model.start,
				phaser: {
					width: LevelIcon.width,
					height: LevelIcon.height,
				}
			}
		},
		{
			name: 'selected',
			cl: 'Sprite',
			attrs: {
				img: 'levelSelectedIcon',
				start: this.model.start,
				phaser: {
					width: LevelIcon.width,
					height: LevelIcon.height,
					visible: this.model.selected
				}
			}
		},
		{
			name: 'locked',
			cl: 'Sprite',
			attrs: {
				img: 'levelLockedIcon',
				start: this.model.start,
				phaser: {
					width: LevelIcon.width,
					height: LevelIcon.height,
					visible: this.model.locked
				}
			}
		},
		{
			name: 'cleared',
			cl: 'Sprite',
			attrs: {
				img: 'levelClearedIcon',
				start: this.model.start,
				phaser: {
					width: LevelIcon.width,
					height: LevelIcon.height,
					visible: this.model.cleared
				}
			}
		}
		];
		
		return attributes;
	};
	
	LevelIcon.prototype.select = function() {
		this.showHideChild('selected', true);
	};
	
	LevelIcon.prototype.deselect = function() {
		this.showHideChild('selected', false);
	};
	
	LevelIcon.prototype.unlock = function() {
		this.showHideChild('locked', false);
	};
	
	LevelIcon.prototype.clear = function() {
		this.showHideChild('cleared', true);
	};
	
	LevelIcon.prototype.showHideChild = function(name, show) {
		var child = this.model.collection.getItemByName(name);
		child.alpha = (show) ? 1 : 0;
	};
	
	return LevelIcon;
})();