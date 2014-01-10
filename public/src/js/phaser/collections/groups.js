// collection of Phaser group objects
Polyworks.Groups = (function() {
	Utils.inherits(Groups, Polyworks.Collection);
	
	function Groups(params, id) {
		Groups._super.constructor.call(this, params, id);
		this.group = Polyworks.Game.phaser.add.group();
	}
	
	Groups.prototype.addView = function(params, itemClass, idx) {
		params.parentType = 'group';
		params.group = this.group;
		return new Polyworks[itemClass](params, idx);
	};
	
	Groups.prototype.checkTerrainCollision = function(ground) {
		for(var key in this.collection) {
			this.collection[key].checkTerrainCollision(ground);
		}
	};
	
	return Groups;
})();