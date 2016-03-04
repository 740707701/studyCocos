var Bar = cc.Sprite.extend({
	ctor:function(){
		this._super('#bar.png');

		this.speed = 10;
	},
	dir:null,
	speed:null,
	range:null,
	run:function(){
		this.scheduleUpdate();
	},
	update:function(dt){
		var self = this;
		// cc.log(self.dir);
		if(self.dir == 'left'){
			self.x -= self.speed;
		}else if(self.dir == 'right'){
			self.x += self.speed;
		}

		self.x = cc.clampf(self.x,self.range.min,self.range.max);

		this.afterRun && this.afterRun();
	}
});