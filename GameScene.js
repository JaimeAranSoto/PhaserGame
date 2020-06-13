var player = null;
var cursors = null;
var platforms;
var spacebar;
var balls;
var waves;
var wave;
var newScale;
var level = 1;
var rnd;

var score;

class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'gameScene' });

    }

    init() {
        level = 1;
        score = 0;
    };


    preload() {
        //this.load.setBaseURL('http://labs.phaser.io');
        this.load.audio('music', 'sound/music.ogg');
        this.load.audio('waveSound', 'sound/sfx1.wav');
        this.load.audio('ballSound1', 'sound/sfx2.wav');
        this.load.audio('ballSound2', 'sound/sfx5.ogg');
        this.load.image('bg', 'sprites/bg.png');
        this.load.image('ball', 'sprites/ball.png');
        this.load.image('wave', 'sprites/wave.png');
        this.load.spritesheet('calvo',
            'sprites/calvo.png',
            { frameWidth: 36, frameHeight: 53 }
        );
    }

    create() {
        rnd = Phaser.Math.RND;
        //Fondo
        this.add.image(150, 100, 'bg');

        //Plataformas
        platforms = this.physics.add.staticGroup();

        //Jugador
        player = this.physics.add.sprite(150, 150, 'calvo');
        player.setBounce(0);
        player.body.setGravityY(300);
        player.setCollideWorldBounds(true);
        player.movable = true;
        player.stock = 1;
        player.setScale(0.8);
        player.speed = 210;

        //Animaciones
        this.anims.create({
            key: 'attack',
            frames: [{ key: 'calvo', frame: 1 }],
            frameRate: 20
        }); this.anims.create({
            key: 'move',
            frames: [{ key: 'calvo', frame: 0 }],
            frameRate: 20
        });

        //Input
        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Colisiones
        balls = this.physics.add.group();
        this.physics.add.collider(player, balls, this.gameover, null, this);

        waves = this.physics.add.group();
        this.physics.add.collider(waves, balls, this.divideBall, null, this);

        //Crear primera bola
        this.time.delayedCall(500, this.createBall, this, false);

        //Audio
        var music = this.sound.add('music');
        music.play();
        music.loop = true;
        music.volume = 0.5;

    }

    updated() {

    }

    end() {

    }

    gameover(player, ball) {
        player.setPosition(150, 150);
        balls.clear(true);
        level = 1;
        this.createBall();

        //Save Score
        localStorage.setItem(score, 'score');
        score = 0;
        this.scene.switch('gameover');
    }

    divideBall(wave, ball) {
        //Simple score:
        score = score + 1;

        if (ball.scale > 0.25) {
            this.sound.play('ballSound2');

            newScale = ball.scale * 0.5;

            var ball1 = balls.create(ball.x - 10, 16, 'ball');
            ball1.setBounce(1);
            ball1.setCollideWorldBounds(true);
            ball1.setVelocity(-20, -20);
            ball1.setScale(newScale);
            ball1.body.allowGravity = false;
            ball1.scale = newScale;

            var ball2 = balls.create(ball.x + 10, 16, 'ball');
            ball2.setBounce(1);
            ball2.setCollideWorldBounds(true);
            ball2.setVelocity(20, -20);
            ball2.setScale(newScale);
            ball2.body.allowGravity = false;
            ball2.scale = newScale;

        } else {
            this.sound.play('ballSound1');
        }
        wave.destroy();
        ball.destroy();
        if (balls.countActive() == 0) {
            this.nextLevel();
        }
    }

    nextLevel(){
        level += 1;
        for (let index = 0; index < level; index++) {
            this.createBall();
        }
    }

    createBall() {
        var x = (player.x < 100) ? Phaser.Math.Between(150, 300) : Phaser.Math.Between(0, 150);
        var ball = balls.create(x, 16, 'ball');
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);

        ball.setVelocity(rnd.sign() * (100 + 5 * level), -55 + 5 / level);
        ball.scale = 1;
        ball.body.allowGravity = false;

    }

    createWave() {
        wave = waves.create(player.x, player.y, 'wave');
        wave.setVelocityY(-200);
        wave.body.allowGravity = false;
        //this.time.delayedCall(1000, this.destroyObject, [wave], this,false);
    }

    destroyObject(obj) {
        obj.destroy();
    }

    update() {        
        if (player.movable) {
            if (cursors.left.isDown) {
                player.setVelocityX(-(player.speed+10*level));
                player.anims.play('move', true);
            }
            else if (cursors.right.isDown) {
                player.setVelocityX(player.speed+10*level);
                player.anims.play('move', true);
            }
            else {
                player.setVelocityX(0);
            }

            if (Phaser.Input.Keyboard.JustDown(spacebar)) {
                player.setVelocityX(0);
                player.movable = false;
                this.sound.play('waveSound');
                for (let index = 0; index < player.stock; index++) {
                    this.time.delayedCall(150 * index, this.createWave, this, false);

                }
                this.time.delayedCall(150 * (player.stock), this.restoreMovement, this, false);
                player.anims.play('attack', true);
            }
        }


    }
    restoreMovement() {
        player.movable = true;
    }
}

export default GameScene;