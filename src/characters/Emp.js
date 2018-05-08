import Character from './character'
import Dialogue from '../Dialogue'
import store from '../store'

export default class Emp extends Character {
  constructor(config) {
      super(config)
      this.scene = config.scene;
      let pronouns = store.getBeloved()
      if (pronouns === 'she') {
          this.pronoun1 = 'she'
          this.pronoun2 = 'her'
          this.pronoun3 = 'hers'
          this.name = 'Empress'
      } else if (pronouns === 'he') {
          this.pronoun1 = 'he'
          this.pronoun2 = 'him'
          this.pronoun3 = 'his'
          this.name = 'Emperor'
      } else if (pronouns === 'them') {
        this.pronoun1 = 'they'
        this.pronoun2 = 'them'
        this.pronoun3 = 'theirs'
        this.name = 'Eminence'
      } else {
          this.pronoun1 = 'she'
          this.pronoun2 = 'her'
          this.pronoun3 = 'hers'
          this.name = 'Empress'
      }
      let dialogue = new Dialogue('Attendant', 'The ' + this.name + ' is asleep.  Would you like to try to cure ' + this.pronoun2 + "?");
      dialogue.addResponse('I\'m ready!', () => {
          this.saveEmpress();
      });
      dialogue.addResponse("I need more time.", () => {
          // do something
      });
      this.dialogue = dialogue;
    }
    saveEmpress() {
        let inventory = store.getInventory();
        if (inventory.includes(store.cure1 && store.cure2)) {
            store.setDialogue(new Dialogue("You cured " + this.pronoun2 + "!"))
        } else if (inventory.includes(store.cure1 || store.cure2)) {
            store.setDialogue(new Dialogue("You do not have all the things!"))
        } else {console.log("the empress is asleep")}
    }

    create() {
        this.emp = this.scene.physics.add.image(750, 340, 'empress');
        this.emp.angle = 28;
        this.emp.body.immovable = true;
        // this.scene.scene.launch('dialogue');

    }


  }

