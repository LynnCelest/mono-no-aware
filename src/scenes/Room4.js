import {
    default as GameScene
} from './GameScene';


export default class Room4 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRoom1 = this.changeRoom1.bind(this);
        this.changeRoom3 = this.changeRoom3.bind(this);
        this.timers = []
        this.roomId = 4;
    }

    preload() {
        super.preload();
    }
    createObjects() {
        this.groundLayer = this.background.create(600, 340, 'background4');
        this.bookshelf = this.behinders.create(264, 282, 'bookshelf');
        this.background.create(575, 415, 'bed');
        this.background.create(1010, 555, 'GoBoard');
        this.screenTop = this.background.create(334, 350, 'screen-top');
        this.screenBottom = this.behinders.create(492, 350, 'screen-bottom');

        //this.screenTop.depth = -1000;
        this.screenBottom.depth = 2000
        
        //smoke

        /*this.smoke.create(0, 0, 'smoke1')
        this.smoke.create(0, 0, 'smoke2')
        this.smoke.create(0, 0, 'smoke3')
        this.smoke.create(0, 0, 'smoke4')
        this.smoke.create(0, 0, 'smoke5')*/

        //set world bounds

        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }

    changeRoom3() {
        this.physics.shutdown();
        this.scene.start('Room3')
    }

    changeRoom1() {
        this.physics.shutdown();
        this.scene.start('EmpressBedroom')
    }

    create() {
        super.create();

        //creating background objects
        this.createObjects()

        this.createProtag(this.roomId, {image: 'protagRoom3'})///this function has been moved to Gamescene

        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
            child.body.height = 40;
            child.body.y = child.y + (child.height / 2) - 40
        })

        this.bookshelf.body.height = 260;
        this.bookshelf.body.width = 1200;

        this.bookshelf.body.position = { 
            x: 0,
            y: this.bookshelf.y - (this.bookshelf.texture.source[0].height / 2)
        }

        this.screenTop.body.height = 100
        this.screenTop.body.width = 10
        this.screenTop.body.position = {
            x: this.bookshelf.x - 75,
            y: this.bookshelf.y - 20
        }

        this.screenBottom.body.height = 100
        this.screenBottom.body.width = 10
        this.screenBottom.body.position = {
            x: this.bookshelf.x - 25,
            y: this.bookshelf.y + 100
        }

        //this.bookshelf.depth -= 50;//just experimenting here

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.door4to3 = this.add.zone(1150, 0, 50, 650).setName('door4to3').setInteractive();
        this.physics.world.enable(this.door4to3)
        this.door4to3.body.immovable = true;

        this.door4to1 = this.add.zone(0, 220, 50, 650).setName('door4to1').setInteractive();
        this.physics.world.enable(this.door4to1)
        this.door4to1.body.immovable = true;

        this.r4To1Tri = this.add.image(45, 530, 'yTriangle');
        this.r4To3Tri = this.add.image(1150, 300, 'yTriangle');

        //Camera setup
        this.setCameras();

        this.physics.add.overlap(this.protag, this.door4to3, this.changeRoom3)
        this.physics.add.overlap(this.protag, this.door4to1, this.changeRoom1)
    }
    // update() {
    //     super.update()
    // }

}
