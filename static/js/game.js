window.onload = function(){
	var game = new Phaser.Game(320,480, Phaser.AUTO) ;
	var bird;
	var birdGravity = 800;
	var birdSpeed = 125;
	var birdFlapPower = 300;
	var pipeInterval = 2000;
	var pipeHole = 120;
	var pipeGroup;
	var score = 0;
	var scoreText;
	var topScore;
	var pipebmd;
	var spaceKey;
	var playerSize = 32;
	var enemySize = 12;
	var scale = 1;

	var play = function (game){}
	play.prototype = {
		preload:function(){},
		create:function(){
			scale = 1;
			pipeGroup = game.add.group();
			score = 0;
			topScore = localStorage.getItem("topScore")==null?0:localStorage.getItem("topScore");
			scoreText = game.add.text(10,10,"-",{
				font:"bold 16px Arial"
			});
			updateScore();
			game.stage.backgroundColor = "87CEEB";
			//if the browser tab loses focus game will not pause
			game.stage.disableVisibilityChange = true;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			//bitmapdata if doing without sprite
			var birdbmd = game.add.bitmapData(playerSize,playerSize);
			birdbmd.ctx.rect(0,0,playerSize,playerSize);
			birdbmd.ctx.fillStyle = "#fff";
        	birdbmd.ctx.fill();
        	pipebmd = game.add.bitmapData(enemySize,enemySize);
			pipebmd.ctx.rect(0,0,enemySize,enemySize);
			pipebmd.ctx.fillStyle = "#333";
        	pipebmd.ctx.fill();
        	bird = game.add.sprite(80,240,birdbmd);
        	bird.anchor.set(0.5);
        	game.physics.arcade.enable(bird);
			bird.body.gravity.y = birdGravity;
			spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			spaceKey.onDown.add(flap, this);
			game.time.events.loop(pipeInterval, addPipe);
        	addPipe();
		},
		update:function(){
			game.physics.arcade.collide(bird, pipeGroup, bigger);
			if(bird.y>game.height){
				die();
			}
		}
	}
	game.state.add("Play",play);
	game.state.start("Play");
	
	function updateScore(){
	
		scoreText.text = "Score: "+score+"\nBest: "+topScore;
	
	}

	function flap(){
		
		bird.body.velocity.y = -birdFlapPower;
	
	}
	
	// would be pixel create for pixjum
	function addPipe(){
	/*
		var pipeHolePosition = game.rnd.between(50,430-pipeHole);
		var upperPipe = new Pipe(game, 320, pipeHolePosition, -birdSpeed);
		game.add.existing(upperPipe);
		pipeGroup.add(upperPipe);
		var lowerPipe = new Pipe(game, 320, pipeHolePosition+pipeHole, -birdSpeed);
		game.add.existing(lowerPipe);
		pipeGroup.add(lowerPipe);
	*/
		
		var pipe = new Pipe(game, 320, randomY, -birdSpeed);	
		pipeGroup.add(pipe);
	}
	function bigger(){
		scale+=0.1;
		bird.scale.set(scale,scale);
		score -= 0.5;
		bird.body.gravity.y += 50;

	}
	function die(){
		localStorage.setItem("topScore",Math.max(score,topScore));
		game.state.start("Play");
	
	}

	Pipe = function (game, x, y, speed) {
		Phaser.Sprite.call(this, game, x, y, pipebmd);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.x = speed;
		this.giveScore = true;
	};

	Pipe.prototype = Object.create(Phaser.Sprite.prototype);

	Pipe.prototype.constructor = Pipe;

	Pipe.prototype.update = function(){
		if(this.x+this.width < bird.x && this.giveScore){
			score += 0.5;
			updateScore();
			this.giveScore = false;
		}
		if(this.x <- this.width){
			this.destroy();
		}
	};
}