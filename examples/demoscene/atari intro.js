var effect;
var image;
var mask = new Phaser.Rectangle();
var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-example", {
    preload: function () {
        game.load.image("atari", "assets/demoscene/atari.png");
        game.load.image("raster", "assets/demoscene/pink-raster.png");
        game.load.image("floor", "assets/demoscene/checker-floor.png");
    },
    create: function () {
        game.stage.backgroundColor = "#000042";
        var floor = game.add.image(0, game.height, "floor");
        floor.width = 800;
        floor.anchor.y = 1;
        effect = game.make.bitmapData();
        effect.load("atari");
        image = game.add.image(game.world.centerX, game.world.centerY, effect);
        image.anchor.set(0.5);
        image.smoothed = false;
        mask.setTo(0, 0, effect.width, game.cache.getImage("raster").height);
        game.add.tween(mask).to({ y: -(mask.height - effect.height) }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);
        game.add.tween(image.scale).to({ x: 4, y: 4 }, 3000, Phaser.Easing.Quartic.InOut, true, 0, 100, true);
    },
    update: function () {
        effect.alphaMask("raster", effect, mask);
        image.rotation += 0.01;
    }
});
