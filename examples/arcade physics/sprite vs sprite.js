var _this = this;
var sprite1;
var sprite2;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, "phaser-example", {
    preload: function () {
        game.load.image("atari", "assets/sprites/atari130xe.png");
        game.load.image("mushroom", "assets/sprites/mushroom2.png");
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#2d2d2d";
        sprite1 = game.add.sprite(50, 200, "atari");
        sprite2 = game.add.sprite(700, 220, "mushroom");
        game.physics.enable([sprite1, sprite2], Phaser.Physics.ARCADE);
        sprite1.name = "atari";
        sprite1.body.velocity.x = 100;
        sprite2.name = "mushroom";
        sprite2.body.velocity.x = -100;
    },
    update: function () { return game.physics.arcade.collide(sprite1, sprite2, spriteVsSpriteCollisionHandler, null, _this); },
    render: function () {
        game.debug.body(sprite1);
        game.debug.body(sprite2);
    }
});
function spriteVsSpriteCollisionHandler(obj1, obj2) {
    game.stage.backgroundColor = "#992d2d";
}
