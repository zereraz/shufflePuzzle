window.onload = function(){
	var game = new Phaser.Game(320,480, Phaser.AUTO);
	var bird;
	var birdGravity = 800;
	var birdSpeed = 125;
	var birdFlapPower = 300;
	var pipeInterval = 200;
	var reductionInterval = 1300;	
	var pipe;
	var pipeGroup;
	var score = 0;
	var scoreText;
	var topScore;
	var pipebmd;
	var spaceKey;
	var playerSize = 32;
	var enemySize = 12;
	var scale = 1;
	var cursors;
	//add stars if insanely fat get a star and survive
	var stars;

	var play = function (game){}
	play.prototype = {
		preload:function(){},
		create:function(){			
			scale = 1;			
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
			//make color random
			pipebmd.ctx.fillStyle = "#333";
        	pipebmd.ctx.fill();
        	bird = game.add.sprite(80,240,birdbmd);
        	bird.anchor.set(0.5);
        	game.physics.arcade.enable(bird);
        	pipeGroup = game.add.group();
        	game.physics.arcade.enable(pipeGroup);
        	pipeGroup.enableBody = true;        	
			bird.body.gravity.y = birdGravity;
			spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			spaceKey.onDown.add(flap, this);			
			game.time.events.loop(pipeInterval, addPipe);
			game.time.events.loop(reductionInterval, helpBird);	
			cursors = game.input.keyboard.createCursorKeys();
			cursors.up.onDown.add(flap,this);					
        	addPipe();
		},
		update:function(){			
			game.physics.arcade.overlap(bird, pipeGroup, bigger,null,this);			
			if(bird.y>game.height || bird.y <= 0){
				die();
			}
		}
	}
	game.state.add("Play",play);
	game.state.start("Play");
	

	function helpBird(){		
		score+=0.5;
		updateScore();
		if(bird.body.gravity.y == 800){
			return;
		}
		
		bird.body.gravity.y -= 50;
		scale -= 0.3;
		bird.scale.set(scale,scale);		
	}

	function updateScore(){
	
		scoreText.text = "Score: "+score+"\nBest: "+topScore;
	
	}

	function flap(){
		bird.body.velocity.y = -birdFlapPower;
	}
	
	// would be pixel create for pixjum
	function addPipe(){	
		var randomY = game.rnd.between(50,480);
		var pipe = pipeGroup.create(game.width - enemySize,randomY,pipebmd);		
        pipe.body.velocity.x = -birdSpeed;		
	}

	function bigger(bird, enemy){
		scale+=0.3;
		bird.scale.set(scale,scale);
		score -= 0.5;
		bird.body.gravity.y += 50;
		enemy.kill();
		updateScore();
	}
	function die(){
		localStorage.setItem("topScore",Math.max(score,topScore));
		game.state.start("Play");
	
	}
}