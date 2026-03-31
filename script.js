const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: 'arcade', arcade: { gravity: { y: 500 } } },
  scene: { preload: preload, create: create, update: update }
};

let player, cursors, platforms, goal, message, playerName;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
  this.load.image('platform', 'https://labs.phaser.io/assets/sprites/platform.png');
  this.load.image('goal', 'https://labs.phaser.io/assets/sprites/star.png');
}

function create() {
  // Platformlar
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, 'platform').setScale(2).refreshBody();
  platforms.create(600, 450, 'platform');
  platforms.create(200, 350, 'platform');
  platforms.create(400, 250, 'platform');

  // Oyuncu
  player = this.physics.add.sprite(100, 450, 'player');
  player.setCollideWorldBounds(true);

  // Oyuncu adı ekranda
  playerName = this.add.text(player.x - 20, player.y - 50, "Yiğit", { fontSize: '20px', fill: '#fff' });

  // Ödül (Hira)
  goal = this.physics.add.staticSprite(700, 200, 'goal');

  // Çarpışmalar
  this.physics.add.collider(player, platforms);
  this.physics.add.overlap(player, goal, reachGoal, null, this);

  // Klavye
  cursors = this.input.keyboard.createCursorKeys();

  // Mesaj
  message = this.add.text(200, 50, '', { fontSize: '24px', fill: '#fff' });
}

function update() {
  // Karakter hareketi
  if (cursors.left.isDown) player.setVelocityX(-200);
  else if (cursors.right.isDown) player.setVelocityX(200);
  else player.setVelocityX(0);

  if (cursors.up.isDown && player.body.touching.down) player.setVelocityY(-350);

  // Karakter adını hareket ettir
  playerName.x = player.x - 20;
  playerName.y = player.y - 50;
}

function reachGoal(player, goal) {
  message.setText("Tebrikler! Hira seni bekliyor ⭐");
}