
var playerData = {
    player_name: '',
    player_score: 0,

}

var config;

const scoreId = 'score';
const leaderboard_id = "lb";

class Gameover extends Phaser.Scene{
    constructor(){
        super({key:'gameover'});
    }

    preload(){
        var score = JSON.parse(localStorage.getItem(scoreId));
    }

    create(){
        const text = this.add.text(150, 100, 'Game Over', { fixedWidth: 150, fixedHeight: 36 })
        text.setOrigin(0.5, 0.5)


    }


}

export default Gameover;