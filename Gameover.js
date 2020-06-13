
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

        //this.load.scenePlugin({
            //key: 'rexuiplugin',
            //url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            //sceneKey: 'rexUI'
        //})
        
        //this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
    }

    create(){
        const text = this.add.text(150, 100, 'Hello World', { fixedWidth: 150, fixedHeight: 36 })
        text.setOrigin(0.5, 0.5)

        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.rexUI.edit(text) );

    }


}

export default Gameover;