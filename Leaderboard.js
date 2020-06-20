var lv;

var leaderboard = [];
var leaderboard_id = "lb";

class Leaderboeard extends Phaser.Scene{
    constructor(){
        super({key:'leaderboard'});
        this.playerText;
        //lv = new ListView(game, parent, bounds, options);
    }

    preload(){
        this.load.bitmapFont('arcade', 'sprites/UI/font.png', 'sprites/UI/font.xml');
        //inicializar el contenido
        //leaderboard = JSON.parse(localStorage.getItem(leaderboard_id));
    }

    create(){
        
    }


}

export default Leaderboeard;