import Character from './character'
import Dialogue from '../Dialogue'
import store from '../store'
import Constants from '../constants'

export default class Emp extends Character {
    constructor(config) {
        super(config)
        this.scene = config.scene;
        let pronouns = store.getBeloved()
        this.angle = 28;
        this.key = 'empress'
        if (pronouns === Constants.PRONOUN_SHE) {
            this.pronoun1 = 'she'
            this.pronoun2 = 'her'
            this.pronoun3 = 'hers'
            this.name = 'Empress'
        } else if (pronouns === Constants.PRONOUN_HE) {
            this.pronoun1 = 'he'
            this.pronoun2 = 'him'
            this.pronoun3 = 'his'
            this.name = 'Emperor'
        } else {
            this.pronoun1 = 'they'
            this.pronoun2 = 'them'
            this.pronoun3 = 'theirs'
            this.name = 'Eminence'
        }
        this.dialogue = new Dialogue({
            name: 'Attendant',
            text: 'The ' + this.name + ' is asleep.  Would you like to try to cure ' + this.pronoun2 + '?',
            responses: [{
                text: "I'm ready!",
                childFn: this.saveEmpress.bind(this)
            }, {
                text: 'I need more time.'
            }]
        });
        this.body.angle = 28;
        // this.body.checkCollision.none = true;

    }
    saveEmpress() {
        let inventory = store.getInventory();
        if (inventory.includes(store.cure1) && inventory.includes(store.cure2)) {
            return new Dialogue({
                name: 'Attendant',
                text: 'You cured ' + this.pronoun2 + '!',
                responses: [{
                    text: 'Yay!',
                    cb: () => {
                        this.scene.scene.stop('HUD');
                        this.scene.scene.start('EndingScene')
                    }
                }]
            });
        } else if (inventory.includes(store.cure1) || inventory.includes(store.cure2)) {
            return new Dialogue({
                name: 'Attendant',
                text: "Oh no!  Whatever you did didn't seem to work....."
            });
        // } else {
        //     console.log("the empress is asleep")
        }
    }


    // create() {
        // this.emp = this.scene.add.image(750, 340, 'empress');
        // this.emp.angle = 28;
        // this.emp.body.immovable = true;
        // this.scene.scene.launch('dialogue');

    // }


}
