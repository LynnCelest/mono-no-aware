import Phaser from 'phaser'
import Zone from './InteractableZone'
import Sign from './Sign'

export default class Item extends Phaser.GameObjects.Image {
    constructor(config) {
      super(config.scene, config.x, config.y, config.texture);
      config.scene.add.existing(this);
      config.scene.physics.world.enable(this);
      this.type = "item";
      this.body.immovable = true;
      this.name = '';
      this.description = '';
      this.id = null;
    }

    create({name, description, id, scale}) {
      this.name = name;
      this.description = description;
      this.id = id;
      this.scaleX = this.scaleY = scale;

      this.origSignY = this.y - this.body.sourceHeight * scale / 2 - 50;
      this.sign = new Sign({
        scene: this.scene,
        x: this.x,
        y: this.origSignY,
        texture: 'triangle',
        alpha: 0
      });
      this.zone = new Zone({
        scene: this.scene,
        x: this.x - (this.body.sourceWidth * scale * .75),
        y: this.y - (this.body.sourceHeight * scale * .75),
        width: this.body.sourceWidth * scale * 1.5,
        height: this.body.sourceHeight * scale * 1.5
      });//origin isn't the same as items origin. Item is centered, zone's origin is top left corner.

      this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
        this.zone,
        () => {
            this.setSign(225);
        },
        () => {
          if(this.visible) {//if item was picked up, you can't interact with it's zone any more
            return true;//Item is set to invisible on pick up (happens in InteractionScene.js)
          } else {
            return false;
          }
        }, 
        this.scene)
    }

    setSign(time) {
      this.depth = this.sign.depth = (this.y > this.scene.protag.body.y) ? 3000 : 0;
      if (!this.sign.visible) {
        this.sign.visible = true;
        this.signTween = this.scene.tweens.add({
          targets: this.sign,
          ease: 'Sine.easeInOut',
          duration: 300,
          y: this.origSignY + 30,
          alpha: 1
      });
    }
      this.scene.setUpdatingTimeout(() => {
        this.signTween = this.scene.tweens.add({
          targets: this.sign,
          ease: 'Sine.easeInOut',
          duration: 300,
          y: this.origSignY,
          alpha: 0,
          onComplete: () => {
            this.sign.visible = false;
          }
        });
      }, time, 'triangle')
    }
  }


  //   create() {
  //     this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
  //       this.zone, this.overlap, null, this.scene)
  //       this.scene.input.on('dragstart', function (pointer) {

  //         this.scene.children.bringToTop(this);

  //     }, this);



  //   this.scene.input.on('drop', function (pointer, dropZone) {

  //     console.log('drop');
  //     console.log(dropZone);

  //     this.x = dropZone.x;
  //     this.y = dropZone.y;

  //     this.input.enabled = false;

  // });

  // this.scene.input.on('dragend', function (pointer, dropped) {

  //     console.log('dragend', dropped);

  //     if (!dropped)
  //     {
  //         this.x = this.input.dragStartX;
  //         this.y = this.input.dragStartY;
  //     }

  // });
  //     this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
  //       this.zone,
  //       () => {
  //           this.setSign(225);
  //       },
  //       null,
  //       this.scene)
  //   }