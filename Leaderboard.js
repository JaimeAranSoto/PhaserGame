var lv;

var leaderboard = [];
var leaderboard_id = "lb";

class Leaderboeard extends Phaser.Scene{
    constructor(game){
        super({key:'leaderboard'});
        //lv = new ListView(game, parent, bounds, options);
    }

    preload(){
        //inicializar el contenido
        leaderboard = JSON.parse(localStorage.getItem(leaderboard_id));
    }

    create(){
        //llenar una lista con los puntajes
        for(var i = 0; i < leaderboard.length; i++){

        }
    }


}

export default Leaderboeard;