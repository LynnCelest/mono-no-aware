import Phaser, {Scene} from 'phaser';
import store from '../store';
import items from '../itemList';
import Item from '../Item';

const WIND_DELAY = 3000;

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
        this.timers = [];
        this.updatableTimers = [];
        this.frameMS = 0;
        this.readyForWind = true;
        this.nextWindMS = 0;
    }

    preload() {
        this.load.audio('theme', 'assets/audio/theme.m4a')
        this.load.audio('wind', 'assets/audio/wind.m4a')
        // this.load.image('sake', 'assets/images/Sake.png');
        this.load.image('triangle', 'assets/greenTriangle.png');

        Object.keys(items).forEach(id => {
            let item = items[id];
            if (item.image) {
                // console.log("loaded ", 'item-' + id);
                this.load.image('item-' + id, 'assets/images/item/' + item.image);
            }
        })
    }

    // globalPreload() {//can be run inside of every scene's preload, use .call(this)
    //         this.load.image('sake', 'assets/catToy.png');
    //         this.load.image('triangle', 'assets/greenTriangle.png');
    // }

    create() {
        //create static groups
        this.background = this.physics.add.staticGroup();
        this.behinders = this.physics.add.staticGroup();
        this.smoke = this.physics.add.group();

        if (!store.getMusic()) {
            let theme = this.sound.add('theme');
           theme.play({ loop: true, volume: 0.5 });
           store.setMusic(theme);
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });//master changed {enter: KeyCode} to {inventory: KeyCode}
        //inventory now relies on space instead of enter
        //and I couldn't get inventory and interaction
        //to work with the change that master did aswell
        this.stateChangeEnterKeyReleased = false;
        this.stateChangeSpaceKeyReleased = false;
        store.setAllItems(items);
        this.gameItems = [];
        // console.log(store.getAllItems());
       
    }

    createProtag(newRoom) {
        //position protag
        let controlledX = 0;
        let controlledY = 0;
        const comingFromTo = store.getCurrentRoom() ? `${store.getCurrentRoom()} to ${newRoom}` : ``;
        store.setCurrentRoom(newRoom);

        switch (comingFromTo){
            //room 1 positioning
            case '2 to 1':
            controlledX = 500;
            controlledY = 300;
            break;
            case '4 to 1':
            controlledX = 500;
            controlledY = 300;
            break;
            
            //room 2 positioning
            case '1 to 2':
            controlledX = 1050;//works but overlaps the exit at this time
            controlledY = 400;
            break;
            case '3 to 2':
            controlledX = 250;//testing
            controlledY = 300;
            break;
            
            //room 3 positioning
            case '2 to 3':
            controlledX = 1000;
            controlledY = 500;
            break;
            case '4 to 3':
            break;

            //room 4 positioning
            case '1 to 4':
            break;
            case '3 to 4':
            controlledX = 1000;
            controlledy = 100;
            break;

            default: //starting at room 1 for the first time
            controlledX = 500;
            controlledY = 300;
            break;
        }

        //declare protag
        this.protag = this.physics.add.sprite(controlledX, controlledY, 'protag');

        //set's the protag's hit box, this was copied from room 1
        this.protag.body.height = 30
        this.protag.body.width = 120
        this.protag.body.offset = {
            x: 30,
            y: 150
        };
        this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);

        // this repeat was in room 2 before
        // this.protag = this.physics.add.sprite(1050, 400, 'protag');
        // this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
        // //set's the protag's hit box
        // this.protag.body.height = 40
        // this.protag.body.width = 140
        // this.protag.body.offset = {
        //     x: 30,
        //     y: 245
        // };
        
        //this repeat was in room 3 before
        // this.protag = this.physics.add.sprite(1000, 500, 'protag');
        // this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
        // //set's the protag's hit box
        // this.protag.body.height = 40
        // this.protag.body.width = 140
        // this.protag.body.offset = {
        //     x: 30,
        //     y: 245
        // };
        
        // this repeat was in room 4 before
        // this.protag = this.physics.add.sprite(1000, 500, 'protag');
        // this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
        // //set's the protag's hit box
        // this.protag.body.height = 40
        // this.protag.body.width = 140
        // this.protag.body.offset = {
        //     x: 30,
        //     y: 245
        // };
    }

    createItems(sceneContext, requestedItems) {
        const sceneItems = [];
        requestedItems.forEach((item) => {
            const newItem = new Item({scene: sceneContext, x: item.x, y:item.y, texture: 'item-' + item.id});
            // console.log('creating', store.getAllItems(), item, item.id);
            newItem.create(store.getAllItems()[item.id]);
            sceneItems.push(newItem)
        });

        sceneItems.forEach((sceneItem) => {
            this.gameItems.push(sceneItem);
        })
        
        return sceneItems;
    }

    setCameras() {
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width+50, this.groundLayer.height + 50)
    }

    // updateFrame() {
    //     // do something only every 1/10 second
    // }

    setTimeout(cb, ms) {
        this.timers.push({
            cb,
            ms: this.frameMS + ms
        });
    }

    setInterval(cb, ms) {
        let timer = {
            cb,
            ms: this.frameMS + ms,
            interval: ms
        }
        this.timers.push(timer)
        return timer;
    }

    setUpdatingTimeout(cb, ms, purpose) {
        const updatableTimer = {
            cb,
            ms: this.frameMS + ms,
            purpose: purpose
        }
        this.updatableTimers = this.updatableTimers.filter(timer => {
            if(purpose === timer.purpose) {
                return false;
            }
            return true;
        });
        this.updatableTimers.push(updatableTimer);
    }

    clearInterval(timer) {
        delete timer.interval;
    }

    update(time, delta) {
        this.frameMS += delta;

        this.timers = this.timers.filter(timer => {
            if (this.frameMS >= timer.ms) {
                timer.cb();
                if (timer.interval) {
                    timer.ms += timer.interval;
                } else {
                    return false; // bye bye!
                }
            }
            return true;
        });

        this.updatableTimers = this.updatableTimers.filter(timer => {
            if (this.frameMS >= timer.ms) {
                timer.cb();
                if(this.frameMS + 3000 >= timer.ms) {
                    return false;
                }
            }
            return true;
        })

        // if (this.frameMS >= 100) {
        //     this.frameMS -= 100;
        //     this.frame++;
        //     this.updateFrame();
        // }

        let velX = 0;
        let velY = 0;

        //if you're not in conversation mode, the keys control the protagonist
        if (!store.getDialogue() && !store.getInventoryActive() && !store.getInteractionActive()) {
            if (this.cursors.left.isDown) {
                velX = -120;
            }
            else if (this.cursors.right.isDown) {
                velX = 120;
            }
            else if (this.cursors.up.isDown) {
                velY = -120;
            }
            else if (this.cursors.down.isDown) {
                velY = 120;
            }
            if (this.cursors.space.isDown) {//inventory was changed to space, and interact to enter
                if (this.stateChangeSpaceKeyReleased) {
                    // this is a legitimate key press to open the inventory
                    store.setInventoryActive(true);
                    this.scene.launch('inventory');
                    // let interval = this.setInterval(() => {
                    //     this.sound.add('tap').play({ volume: 0.5 });
                    // }, 500);
                    // this.setTimeout(() => {
                    //     this.clearInterval(interval);
                    // }, 3000);
                }
            } else {
                // this makes sure you release enter from another window before pressing it here
                this.stateChangeSpaceKeyReleased = true;
            }

            if (this.keys.enter.isDown) {
                console.log(`${this.protag.x}, ${this.protag.y}`)
                const currentItem = this.gameItems.filter(item => {
                    return item.sign.visible;
                });
                if (this.stateChangeEnterKeyReleased && currentItem[0]) {//it's currently an array
                    // this is a legitimate key press to open interaction
                    store.setInteractionActive(true);
                    store.setCurrentItem(currentItem[0]);//It's better that items don't overlap zones
                    this.scene.launch('interaction');
                }
            } else {
                // this makes sure you release enter from another window before pressing it here
                this.stateChangeEnterKeyReleased = true;
            }

        } else {
            // key must be lifted in between state changes
            this.stateChangeEnterKeyReleased = false;
            this.stateChangeSpaceKeyReleased = false;
        }

        if (this.protag && this.protag.body) {
            if (velX !== 0 || velY !== 0) {
                if (this.readyForWind && this.frameMS >= this.nextWindMS) {
                    this.sound.add('wind').play({volume: 0.1});
                    this.nextWindMS = this.frameMS + WIND_DELAY;
                }
                this.readyForWind = false;
            } else {
                this.readyForWind = true;
            }

            this.protag.setVelocityX(velX);
            this.protag.setVelocityY(velY);

            //Depth sorting!!! Allows you to go behind charadters and stuff
            if (this.protag.velocity !== 0) {
                this.protag.depth = this.protag.y + this.protag.height / 2;
                if (this.behinders && this.behinders.children) {
                    this.behinders.children.iterate((child) => {
                        child.depth = child.y + child.height / 2
                    })
                }
                if (this.smoke && this.smoke.children) {
                    this.smoke.children.iterate((child) => {
                        child.depth = child.y + child.height / 2
                    })

                }
                if (this.akiko) {
                    this.akiko.depth = this.akiko.y + this.akiko.height / 2;
                }
            }
        }
    }
}

