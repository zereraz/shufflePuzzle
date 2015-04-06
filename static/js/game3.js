window.onload = function(){
    var width = 500;
    var height = 500;    
    var menu = function(game){

    }; 
    menu.prototype = {
        init: function () {

        },

        preload: function(){            
            game.load.image('title', 'img/juspay.jpg');
            game.load.image('0', 'img/juspay-1.png');
            game.load.image('1', 'img/juspay-2.png');
            game.load.image('2', 'img/juspay-3.png');
            game.load.image('3', 'img/juspay-4.png');
            game.load.image('4', 'img/juspay-5.png');
            game.load.image('5', 'img/juspay-6.png');
            game.load.image('6', 'img/juspay-7.png');
            game.load.image('7', 'img/juspay-8.png');
            game.load.image('8', 'img/juspay-9.png');
            game.stage.backgroundColor = "222222";
        },
        create: function(){
            
            this.title = game.add.sprite(0,0,'title');
            
            this.title.anchor.setTo(0.5,0.5);
            this.title.scale.set(3.2,3.2);
            game.input.onDown.addOnce(this.changeState,this);
        },
        update: function(){
        },
        changeState: function(){
            game.state.start('game');
        }
    
    }
    var play = function(game){
         this.mainGame = [];
    };    
    play.prototype = {        
        create:function(){
                                
            
            game.stage.backgroundColor = "222";
            this.shuffle();
            //if the browser tab loses focus game will not pause
            game.stage.disableVisibilityChange = true;
            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            
        },
        update:function(){  
        },
        changeState: function(){
            game.state.start('gameover');
        },
        shuffle: function(){
            var j = -1;
            for(var i = 0; i<8 ; i++){
                if(i%3==0){
                    j+=1;                    
                }
                this.mainGame.push(game.add.sprite(i%3*500/3,j*500/3,String(i)));
                this.mainGame[i].scale.set(3.2,3.2);              
            }
            this.mainGame[8] = 0;
        },
    }
    var gameover = function(game){

    }; 
    gameover.prototype = {
        preload: function(){            
            game.load.image('title', 'img/juspay.jpg');            
            game.stage.backgroundColor = "222222";
        },
        create: function(){
            game.input.onDown.addOnce(this.changeState,this);           
        },
        update: function(){
        
        },
        changeState: function(){
            game.state.start('game');
        },
    }
    var game = new Phaser.Game(width,height, Phaser.AUTO,'myGame');

    game.state.add('menu',menu);
    game.state.add('game',play);
    game.state.add('gameover',gameover);
    game.state.start('menu');
}