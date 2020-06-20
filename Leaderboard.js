var lv;

var leaderboard = [];
var leaderboard_id = "lb";
const charSize = 8;

class Leaderboeard extends Phaser.Scene{
    constructor(){
        super({key:'leaderboard'});
        this.playerText;
        this.button;
        //lv = new ListView(game, parent, bounds, options);
    }

    preload(){
        this.load.bitmapFont('arcade', 'sprites/UI/font.png', 'sprites/UI/font.xml');
        //inicializar el contenido
        leaderboard = JSON.parse(localStorage.getItem(leaderboard_id));
    }

    create(){
        var text = this.add.bitmapText(90, 50, 'arcade', 'RANK  NAME  SCORE',charSize).setTint(0xff8200);

        for(var i = 0; i < leaderboard.length; i++){
            this.add.bitmapText(100, 70 + (10 * i), 'arcade', i + 1 + "    " + leaderboard[i].player_name + '    ' + leaderboard[i].player_score, charSize);
        }

        this.button = this.add.bitmapText(120, 160,'arcade',  'Main Menu', charSize);
        this.button.setInteractive();
        this.enterButtonRestState();
        this.button.on('pointerout', ()=> this.enterButtonRestState());
        this.button.on('pointerover', ()=> this.enterButtonHoverState());
        this.button.on('pointerdown', ()=>this.goBack());
    }

    

    enterButtonHoverState() {
        this.button.tint = 250;
    }

    enterButtonRestState() {
        this.button.tint = 200;
    }

    goBack(){
        this.scene.switch('mainMenu');
    }

}

export default Leaderboeard;