var Ball = cc.Sprite.extend({
	ctor:function(){
		this._super('#ball.png');

		this.speed = {
			x:5,
			y:5
		};

		this.count = 10;
	},
	speed:null,
	run:function(){
		this.scheduleUpdate();
	},
	update:function(dt){
		this.x += this.speed.x;
		this.y += this.speed.y;
		this.afterRun && this.afterRun();
	}
});