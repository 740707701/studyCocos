var SpaceLayer = cc.LayerColor.extend({
	ctor:function(){
		this._super(cc.color.WHITE);



		var ball = this.ball = new Ball();
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


		var bar = this.bar = new Bar();
		// bar.width *=2;
		// bar.scaleX = 2;
		bar.x = cc.winSize.width/2;
		bar.y = 100;
		bar.range = {min:bar.width/2,max:cc.winSize.width - bar.width/2};
		this.addChild(bar);
		bar.run();

		this._keys = [];
		this.listen();


		this.scheduleUpdate();
		this._isCheck = true;
	},
	bar:null,
	ball:null,
	_keys:null,
	_isCheck:null,
	_checkCollide:function(){
		var self = this;
		var getRect = function(s){
			return cc.rect(s.x-s.width/2,s.y-s.height/2,s.width,s.height);
		}
		var aRect = getRect(self.bar);
		var bRect = getRect(self.ball);
		
		if(cc.rectIntersectsRect(bRect, aRect)){
			// self.ball.speed.x *=-1;
			self.ball.speed.y *=-1;
			self._isCheck =false;
			self.scheduleOnce(function(){self._isCheck=true;},1);
		}
	},
	update:function(){
		this._checkCollide();
	},
	listen:function(){
		var self = this;
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  function(keyCode, event){
				self._setKey(keyCode);
				!self._hasKey(keyCode) && self._keys.push(keyCode);
			},
			onKeyReleased: function(keyCode, event){
				self._removeKey(keyCode);
				var key = self._keys[self._keys.length-1];
					self._setKey(key);

			}
		}, self);

	},
	_setKey:function(keyCode){
		var self = this;
		if(keyCode == cc.KEY.left){
			self.bar.dir = 'left';
		}else if(keyCode == cc.KEY.right){
			self.bar.dir = 'right';
		}else{
			self.bar.dir = null;
		}
	},
	_removeKey:function(key){
		var index = -1;
		var arr = this._keys;
		for (var i = 0; i < arr.length; i++) {
			if(arr[i] == key){
				index = i;
			}
		};
		if(index!=-1){
			arr.splice(index,1);			
		}
	},
	_hasKey:function(key){
		var arr = this._keys;
		for (var i = 0; i < arr.length; i++) {
			if(arr[i] == key){
				return true;
			}
		};
		return false;
	}
});

var SpaceScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		var lay = new SpaceLayer();
		this.addChild(lay);
	}
});