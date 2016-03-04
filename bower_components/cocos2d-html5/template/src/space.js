var SpaceLayer = cc.Layer.extend({
	ctor:function(){
		this._super();


		var ball = new Ball();
		ball.x = cc.winSize.width/2;
		ball.y = cc.winSize.height/2 - 80;
		this.addChild(ball);

		ball.run();

		ball.afterRun = function(){
			if(ball.x > cc.winSize.width || ball.x < 0){
				ball.speed.x *= -1;
			}
			if(ball.y > cc.winSize.height || ball.y < 0){
				ball.speed.y *=-1;
			}
		};
	}
});

var SpaceScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		var lay = new SpaceLayer();
		this.addChild(lay);
	}
});