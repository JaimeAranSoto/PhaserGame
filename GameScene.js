var player = null;
var cursors = null;
var platforms;
var spacebar;
var balls;
var waves;
var wave;
var newScale;

class GameScene extends Phaser.Scene{
    
    constructor(){
        super({key: 'gameScene'});
        
    }

    init(){
        
    };

    preload(){
        //this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('bg', 'sprites/bg.png');
        this.load.image('ball', 'sprites/ball.png');
        this.load.image('wave', 'sprites/wave.png');
        this.load.spritesheet('calvo',
            'sprites/calvo.png',
            { frameWidth: 36, frameHeight: 53 }
        );
    }

    create(){
        this.add.image(150, 100, 'bg');
        platforms = this.physics.add.staticGroup();

        player = this.physics.add.sprite(150, 150, 'calvo');
        player.setBounce(0);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'attack',
            frames: [{ key: 'calvo', frame: 1 }],
            frameRate: 20
        }); this.anims.create({
            key: 'move',
            frames: [{ key: 'calvo', frame: 0 }],
            frameRate: 20
        });
        player.body.setGravityY(300);
        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        balls = this.physics.add.group();
        this.physics.add.collider(player, balls, this.gameover, null, this);

        waves = this.physics.add.group();
        this.physics.add.collider(waves, balls, this.divideBall, null, this);

        var timer = this.time.delayedCall(500, this.createBall, this, false);
    }

    updated(){
        
    }

    end(){

    }

    gameover(player, ball) {
        player.setPosition(150, 150);
        balls.children.iterate(function (child) {
            child.destroy();
        });
        this.createBall();
    }

    divideBall(wave, ball) {
        if (ball.scale > 0.25) {
            newScale = ball.scale * 0.5;

            var ball1 = balls.create(ball.x - 10, 16, 'ball');
            ball1.setBounce(1);
            ball1.setCollideWorldBounds(true);
            ball1.setVelocity(-20, -50);
            ball1.setScale(newScale);
            ball1.scale = newScale;

            var ball2 = balls.create(ball.x + 10, 16, 'ball');
            ball2.setBounce(1);
            ball2.setCollideWorldBounds(true);
            ball2.setVelocity(20, -50);
            ball2.setScale(newScale);
            ball2.scale = newScale;
        }
        wave.destroy();
        ball.destroy();
    }

    createBall() {
        var x = (player.x < 100) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var ball = balls.create(x, 16, 'ball');
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(Phaser.Math.Between(-200, 200), 50);
        ball.scale = 1;
    }
    
    createWave() {
        wave = waves.create(player.x, player.y, 'wave');
        wave.setVelocityY(-200);
        wave.body.allowGravity = false;
        //var timerdestroy = this.time.delayedCall(1, destroyObject, [wave], this);
    }
    
    destroyObject(obj) {
        obj.destroy();
    }
    
    update() {
        
        if (cursors.left.isDown) {
            player.setVelocityX(-260);

            player.anims.play('move', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(260);

            player.anims.play('move', true);
        }
        else {
            player.setVelocityX(0);


        }

        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            this.createWave();
            player.anims.play('attack', true);

        }
    }
}

export default GameScene;