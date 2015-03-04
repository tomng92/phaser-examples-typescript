var player;
var facing = "left";
var jumpTimer = 0;
var platformerBasicCursors;
var jumpButton;
var bg;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, "phaser-example", {
    preload: function () {
        game.load.spritesheet("dude", "assets/games/starstruck/dude.png", 32, 48);
        game.load.image("background", "assets/games/starstruck/background2.png");
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 30;
        bg = game.add.tileSprite(0, 0, 800, 600, "background");
        game.physics.arcade.gravity.y = 250;
        player = game.add.sprite(32, 32, "dude");
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(20, 32, 5, 16);
        player.animations.add("left", [0, 1, 2, 3], 10, true);
        player.animations.add("turn", [4], 20, true);
        player.animations.add("right", [5, 6, 7, 8], 10, true);
        platformerBasicCursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function () {
        player.body.velocity.x = 0;
        if (platformerBasicCursors.left.isDown) {
            player.body.velocity.x = -150;
            if (facing != "left") {
                player.animations.play("left");
                facing = "left";
            }
        }
        else if (platformerBasicCursors.right.isDown) {
            player.body.velocity.x = 150;
            if (facing != "right") {
                player.animations.play("right");
                facing = "right";
            }
        }
        else {
            if (facing != "idle") {
                player.animations.stop();
                if (facing == "left") {
                    player.frame = 0;
                }
                else {
                    player.frame = 5;
                }
                facing = "idle";
            }
        }
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }
    },
    render: function () { return game.debug.text("" + game.time.suggestedFps, 32, 32); }
});
