window.onload = function(){
    var BasicGame = {};
    BasicGame.MainMenu = function(){ }; 
     
    BasicGame.MainMenu.prototype = { 
        preload : function(){ 
            // load basic assets for this state 
        
            this.load.image('name','img/pixum2.png'); 
        
        }, 
     
        create : function(){ 
     
            // place the assets and elements in their initial positions, create the state 
     
            this.titleName = this.add.sprite(300,300,'name'); 
     
        }, 
     
        update : function(){ 
     
            // your game loop goes here 
     
            this.titleName.x++;
            if(this.titleName.x > 480){
                game.state.start("Play");
            }
        } 
    }
    var game = new Phaser.Game(320,480, Phaser.AUTO);
    game.state.add('MainMenu',BasicGame.MainMenu);
    game.state.start('MainMenu');
    game.state.add("Play",play);
    
}