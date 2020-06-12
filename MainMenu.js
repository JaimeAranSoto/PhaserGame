const separation_px = 20;
var width = 300;
var height = 200;

//Exit Buttons
var yes;
var no;

//Option Buttons
var play;
var leaderboard;
var options;
var exit;

//Title screen
var pressanykey;

class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
    }

    preload(){
        this.load.image('background', 'sprites/UI/background_ui.jpg');
        this.load.audio('waveSound', 'sound/sfx1.wav');
    }

    create(){
        var bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);
        
        for(var i = 0; i < 4; i++){
            var btn_name = "";
            switch(i){
                case 0: btn_name = "Play" ; break;
                case 1: btn_name = "Leaderboard" ; break;
                case 2: btn_name = "Options" ; break;
                case 3: btn_name = "Exit" ; break;
            }

            var btn = this.add.text(width / 2, height / 2 + (separation_px * i), btn_name);
            btn.setOrigin(0.5)
            btn.setInteractive({ useHandCursor: true });

            switch(i){
                case 0: btn.on('pointerdown', () => this.OnPlay()); play = btn; break;
                case 1: btn.on('pointerdown', () => this.OnLeaderboard()); leaderboard = btn; break;
                case 2: btn.on('pointerdown', () => this.OnOptions()); options = btn; break;
                case 3: btn.on('pointerdown', () => this.OnExit()); exit = btn; break;
            }
            btn.on('pointerdown', () => this.sound.play('waveSound'));
        }

        this.ToggleMainOptions(false);

        yes = this.add.text(100, height / 2, "Yes");
        yes.setOrigin(0.5)
        yes.setInteractive({ useHandCursor: true });
        yes.visible = false;
        yes.on('pointerdown', () => this.OnExit());
        yes.on('pointerdown', () => pressanykey.visible = true);
        yes.on('pointerdown', () => this.ToggleExitOptions(false));

        no = this.add.text(200, height / 2 , "No");
        no.setOrigin(0.5)
        no.setInteractive({ useHandCursor: true });
        no.visible = false;
        no.on('pointerdown', () => this.ToggleMainOptions(true));
        no.on('pointerdown', () => this.ToggleExitOptions(false));
    
        pressanykey = this.add.text(width / 2, 180, "Press any key...");
        pressanykey.setOrigin(0.5)

        this.input.keyboard.on('keydown', ()=>this.ToggleMainOptions(true));
        this.input.keyboard.on('keydown', ()=>pressanykey.visible = false);
        


    }

    OnPlay() {
        this.scene.switch('gameScene');
    }

    OnLeaderboard(){
        this.scene.switch('leaderboard');
    }

    OnOptions(){

    }

    OnExit(){
        this.ToggleExitOptions(true)
        this.ToggleMainOptions(false);
    }

    ToggleExitOptions(toggle){
        yes.visible = toggle;
        no.visible = toggle;
    }

    ToggleMainOptions(toggle){
        play.visible = toggle;
        leaderboard.visible = toggle;
        options.visible  = toggle;
        exit.visible = toggle;
    }

    
}

export default MainMenu