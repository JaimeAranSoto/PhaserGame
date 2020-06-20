//Se crea un player data y se añade a una lista de puntajes donde se consideran solo los 10 mejores

var playerData = {
    player_name: '',
    player_score: 0,
}

const charSize = 8;
const mov_x = 13;
const mov_y = 16;

//7 * 8 = 56 alto + 6 separacion = 62 
// 10 * 8 = 80 ancho + 20 por la separacion = 100



const scoreId = 'score';
const leaderboard_id = "lb";

class Gameover extends Phaser.Scene{
    constructor(){
        super({key:'gameover'});

        this.chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '+', '=' ]
        ];

        this.cursor = new Phaser.Math.Vector2();

        this.text;
        this.block;

        this.name = '';
        this.charLimit = 3;

        this.score = 0;
        this.text_name;

        this.button;
        this.score = 0;
    }

    preload(){
        var scoreString = localStorage.getItem('score');
        this.score = JSON.parse(scoreString);
        this.load.bitmapFont('arcade', 'sprites/UI/font.png', 'sprites/UI/font.xml');
        this.load.image('block', 'sprites/UI/block.png')

    }

    create(){

        var title = this.add.bitmapText(78, 20, 'arcade', 'Game over',charSize * 2);

        let text = this.add.bitmapText(90, 50, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-+=',charSize);
        text.setLetterSpacing(20);
        text.setInteractive();

        this.block = this.add.image(text.x - 3.5, text.y - 1.5, 'block').setOrigin(0);
        this.block.setScale(0.3);

        this.text = text;

        this.input.keyboard.on('keyup_LEFT', this.moveLeft, this);
        this.input.keyboard.on('keyup_RIGHT', this.moveRight, this);
        this.input.keyboard.on('keyup_UP', this.moveUp, this);
        this.input.keyboard.on('keyup_DOWN', this.moveDown, this);
        this.input.keyboard.on('keyup_ENTER', this.pressKey, this);
        this.input.keyboard.on('keyup_SPACE', this.pressKey, this);
        //this.input.keyboard.on('keyup', this.anyKey, this);

        this.tweens.add({
            targets: this.block,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 350
        });

        this.button = this.add.bitmapText(106, 160,'arcade',  'Enter Score', charSize);
        this.button.setInteractive();
        this.enterButtonRestState();
        this.button.on('pointerout', ()=> this.enterButtonRestState());
        this.button.on('pointerover', ()=> this.enterButtonHoverState());
        this.button.on('pointerdown', ()=>this.saveScore());

        this.score *= 100;
        this.text_name = this.add.bitmapText(100, 115, 'arcade', this.name,charSize * 2);
        this.text_score = this.add.bitmapText(170, 120, 'arcade', this.score,charSize);
    }

    enterButtonHoverState() {
        this.button.tint = 250;
    }

    enterButtonRestState() {
        this.button.tint = 200;
    }

    saveScore(){
        var pd = Object.create(playerData);
        pd.player_name = this.name;
        pd.player_score = this.score;

        var scoreList = JSON.parse(localStorage.getItem(leaderboard_id));
        if(scoreList != null){
            scoreList.push(pd);
            scoreList.sort( function(a,b){return b.player_score - a.player_score} );
            console.log(scoreList);
            if(scoreList.length > 5){
                scoreList.pop();
            }

        }else{
            scoreList = [];
            scoreList.push(pd);
        }

        var s = JSON.stringify(scoreList);
        localStorage.setItem(leaderboard_id, s);

        var scene = this.scene.get('leaderboard');
        scene.scene.restart();
        
        this.scene.switch('leaderboard');
    }

    moveLeft ()
    {
        if (this.cursor.x > 0)
        {
            this.cursor.x--;
            this.block.x -= mov_x;
        }
        else
        {
            this.cursor.x = 9;
            this.block.x += mov_x * 9;
        }
    }

    moveRight ()
    {
        if (this.cursor.x < 9)
        {
            this.cursor.x++;
            this.block.x += mov_x;
        }
        else
        {
            this.cursor.x = 0;
            this.block.x -= mov_x * 9;
        }
    }

    moveUp ()
    {
        if (this.cursor.y > 0)
        {
            this.cursor.y--;
            this.block.y -= mov_y;
        }
        else
        {
            this.cursor.y = 2;
            this.block.y += mov_y * 2;
        }
    }

    moveDown ()
    {
        if (this.cursor.y < 2)
        {
            this.cursor.y++;
            this.block.y += mov_y;
        }
        else
        {
            this.cursor.y = 0;
            this.block.y -= mov_y * 2;
        }
    }

    pressKey ()
    {
        let x = this.cursor.x;
        let y = this.cursor.y;
        let nameLength = this.name.length;

        this.block.x = this.text.x - 3.5 + (x * mov_x);
        this.block.y = this.text.y - 1.5 + (y * mov_y);

        if (this.name.length < this.charLimit)
        {
            //  Add
            this.name = this.name.concat(this.chars[y][x]);
            this.events.emit('updateName', this.name);
            this.text_name.text = this.name;
        }
    }

}

export default Gameover;