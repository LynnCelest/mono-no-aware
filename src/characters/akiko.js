import Character from './character'
import Dialogue from '../Dialogue';

let AKIKO_DIALOGUE = [{
  type: 'Node',
  id: '6532685a-85b0-461d-bc06-0d3a2295cc76',
  actor: 'Akiko',
  name: 'Hm? Who are you?',
  choices: ['ab567726-ddad-4286-9a3c-15771e82d1a1', 'bdcd01bb-a8c9-42e8-a45a-5b9882b2f616']
}, {
  type: 'Choice',
  id: 'ab567726-ddad-4286-9a3c-15771e82d1a1',
  title: 'sassy',
  name: '"...I live here.  I feel like I should be asking who <i>you</i> are."',
  next: '75a1aae8-b044-4ec1-9df2-038ff90be572'
}, {
  type: 'Text',
  id: '75a1aae8-b044-4ec1-9df2-038ff90be572',
  actor: 'Akiko',
  name: "*Laughs*\n\n\"Maybe so, maybe so.   Forgive my rudeness.  I'm Akiko.  I came to the capitol to visit the Empress, but...\"",
  next: '1fb4e322-3262-4022-9cc4-e1dbf80026b5'
}, {
  type: 'Text',
  id: 'dd2e771b-b31a-4747-8bd2-d746f4b36a04',
  actor: 'Akiko',
  name: "\"Mm, more or less.  I lived here for a while once, a long time ago, but I'm essentially a stranger now.  A foreigner, almost.*  *laughs* . \"What about you, Setsuna-dono?  How did you become the Empress's pet detective?\"",
  choices: ['d3207acf-8f35-4de4-9c05-5cfa365b3594', '32e500e4-0084-4824-a6c9-dc3cec5a19c3'],
  next: '767edf10-ca64-4c4f-bf1f-6a0cd525440c'
}, {
  type: 'Branch',
  id: '1fb4e322-3262-4022-9cc4-e1dbf80026b5',
  variable: 'judgmental',
  branches: {
    '> 10': '26c6bce0-1080-443c-aaf9-1fceccf515c6',
    _default: 'bcb23c02-8fb6-456a-ab4b-b70b3af7d64a'
  }
}, {
  type: 'Text',
  id: '26c6bce0-1080-443c-aaf9-1fceccf515c6',
  actor: 'Akiko',
  name: '"But she fell ill shortly after you arrived," you finish for her.',
  choices: ['0d96def2-d19b-4092-a343-ffa606d5eeb2']
}, {
  type: 'Choice',
  id: '0d96def2-d19b-4092-a343-ffa606d5eeb2',
  title: '',
  name: '"What bad luck to arrive just after the empress became so ill',
  next: null
}, {
  type: 'Text',
  id: 'bcb23c02-8fb6-456a-ab4b-b70b3af7d64a',
  actor: '',
  name: "\"But she's become ill.  Ah, how unfortunate.\"",
  choices: ['e31437ad-a3c0-4803-b9dd-2b0346c385cd']
}, {
  type: 'Choice',
  id: 'e31437ad-a3c0-4803-b9dd-2b0346c385cd',
  title: '',
  name: '"What brought you here, if I may ask?"',
  next: null
}, {
  type: 'Choice',
  id: 'c8c31707-dc6d-4cea-b4f3-bae1512c4ba6',
  title: 'aggressive',
  name: '"I should have you thrown out of the palace for such a comment.  Have you never learned how to speak to your betters?"',
  next: '3c93c6b0-b0fb-4bce-b919-cfe7405c06fb'
}, {
  type: 'Set',
  id: '3c93c6b0-b0fb-4bce-b919-cfe7405c06fb',
  variable: 'Akiko.happiness',
  value: '-30',
  next: 'dfc91c7e-2c20-4d19-8b4c-6176ef0d1a77'
}, {
  type: 'Choice',
  id: '32e500e4-0084-4824-a6c9-dc3cec5a19c3',
  title: '',
  name: "\"I don't know about 'detective.' \n I'm just trying to find out what's wrong before it's too late.",
  next: null
}, {
  type: 'Branch',
  id: '767edf10-ca64-4c4f-bf1f-6a0cd525440c',
  variable: 'Arrogance',
  branches: {
    '> 10': 'c19a17b7-c3ac-408e-a2a3-e04b8d3154ce',
    _default: null
  }
}, {
  type: 'Text',
  id: 'c19a17b7-c3ac-408e-a2a3-e04b8d3154ce',
  actor: 'Protag',
  name: "'Pet'?",
  choices: ['c8c31707-dc6d-4cea-b4f3-bae1512c4ba6', '0c95aa7d-8cee-431a-af1a-c400231d0805']
}, {
  type: 'Choice',
  id: '0c95aa7d-8cee-431a-af1a-c400231d0805',
  title: 'A tongue on you',
  name: "\"You have quite a tongue on you, don't you, Milady.  You should watch where you point that thing.\"",
  next: 'f5149df5-375e-476b-b17d-d95dfb5a514d'
}, {
  type: 'Choice',
  id: 'd3207acf-8f35-4de4-9c05-5cfa365b3594',
  title: 'Innocent',
  name: "\"I'm just worried about the Empress.  It seems she might be cursed.  I can't imagine who would want to see her hurt...  but whoever it is, I want to find them, and bring them to justice!\"",
  next: '02d4e9fb-317b-4475-aba4-bde38646e049'
}, {
  type: 'Choice',
  id: 'bdcd01bb-a8c9-42e8-a45a-5b9882b2f616',
  title: 'respectful',
  name: "\"I'm Setsuna,\" you reply with a slight, respectful bow.  \"I don't believe I've had the pleasure of making your acquaintance yet.  Are you new in the capitol?\"",
  next: 'dd2e771b-b31a-4747-8bd2-d746f4b36a04'
}, {
  type: 'Text',
  id: 'da2c1536-b315-490f-a945-0b4c5592f74a',
  actor: 'Akiko',
  name: "Akiko begins laughing more than is strictly normal.\n\n\"You're an earnest one, aren't you?  That's cute.  And you're awfully devoted, to boot.  ",
  next: null
}, {
  type: 'Set',
  id: '02d4e9fb-317b-4475-aba4-bde38646e049',
  variable: 'Akiko.happiness',
  value: '+10',
  next: 'da2c1536-b315-490f-a945-0b4c5592f74a'
}, {
  type: 'Text',
  id: 'f5149df5-375e-476b-b17d-d95dfb5a514d',
  actor: '',
  name: 'Akiko grins back; her teeth are strangely sharp.\n\n"Oh, I do.  Would you like to?  Watch where I point that thing, that is."',
  choices: ['0070afb7-d101-48c4-b92b-711d516e67c8', 'f7706b85-8190-4ddb-8559-cfce0571aa24']
}, {
  type: 'Choice',
  id: '0070afb7-d101-48c4-b92b-711d516e67c8',
  title: 'Devoted',
  name: "\"Uh... Thanks, but I'll pass. \"",
  next: '48c0d32e-bfe1-4f70-b66c-7ea3fee83bdc'
}, {
  type: 'Choice',
  id: 'f7706b85-8190-4ddb-8559-cfce0571aa24',
  title: "I wouldn't mind",
  name: '"Now that you mention it...."',
  next: '6f737622-29d1-42d3-9b57-ede26f1a97a7'
}, {
  type: 'Text',
  id: '48c0d32e-bfe1-4f70-b66c-7ea3fee83bdc',
  actor: 'You',
  name: "\"Uh... Thanks, but I'll pass.  I'm busy fulfilling my duties to my liege -- too busy to indulge with you, despite how beautiful you are.\"\n\nAkiko laughs; her eyes glitter strangely as she does.  You note the feeling for later.\n\n\"Duty... Is that what they're calling it these days?  I suppose you wouldn't be the first to call it that.  Well, your loss.  Can I help you with something?\n\n",
  choices: ['a740b32a-8c3f-4c7e-94fd-59419161114c', '9127dacb-fc88-4076-b4b6-53578eb77853']
}, {
  type: 'Text',
  id: '6f737622-29d1-42d3-9b57-ede26f1a97a7',
  actor: 'You',
  name: "You smile back.\n\n\"Now that you mention it, I wouldn't mind getting to know you a little better.  Perhaps after my work is done.\"",
  next: 'edf64715-787e-4e15-ab23-6c0bd5f193c8'
}, {
  type: 'Text',
  id: '0462c08e-0398-4678-808a-13198e480753',
  actor: 'Akiko',
  name: "\"Or perhaps you'll change your mind as the evening passes,\" she says with a sly smile. \"  If you find yourself lonely or want a good time,  come see me.  In the meantime, can I help you with anything?\"",
  choices: ['9127dacb-fc88-4076-b4b6-53578eb77853', 'a740b32a-8c3f-4c7e-94fd-59419161114c']
}, {
  type: 'Choice',
  id: '5be63319-f4f3-4188-a7f5-b5b9d1bbd224',
  title: '',
  name: '"When did you arrive here?"',
  next: '9c76f756-0eaf-43eb-9b7d-1fe1f80de8e1'
}, {
  type: 'Choice',
  id: 'a740b32a-8c3f-4c7e-94fd-59419161114c',
  title: '',
  name: 'Yes',
  next: 'c7995adb-2a17-4a7c-a278-91e6af2db3f7'
}, {
  type: 'Text',
  id: 'c7995adb-2a17-4a7c-a278-91e6af2db3f7',
  actor: 'You',
  name: '"Ah, right.  I had some questions to ask."',
  choices: ['5be63319-f4f3-4188-a7f5-b5b9d1bbd224', '295f954c-802d-4019-a370-cd548fa10b6d', '64518aa8-4d5e-40b2-b935-b44dbe98f20e']
}, {
  type: 'Choice',
  id: '9127dacb-fc88-4076-b4b6-53578eb77853',
  title: '',
  name: 'No, thank you',
  next: '7c034884-17ca-430d-ae0e-0c890e1c04f2'
}, {
  type: 'Text',
  id: '7c034884-17ca-430d-ae0e-0c890e1c04f2',
  actor: 'Akiko',
  name: '"Have a good evening, then.  Or day.   With the way these clouds are I can hardly even tell."',
  next: null
}, {
  type: 'Text',
  id: 'dfc91c7e-2c20-4d19-8b4c-6176ef0d1a77',
  actor: 'Akiko',
  name: "Akiko's expression curls up into disgust.\n\n\"Oh, so you're one of <i>those</i>, are you.  How charming.  Maybe your task would be easier if you learned some basic manners.\"",
  choices: ['435033e4-259d-43f2-97e2-5aa5ae47d2ab', 'fab555dd-2d4f-4cb1-b8a0-a5d149f1293b']
}, {
  type: 'Choice',
  id: '435033e4-259d-43f2-97e2-5aa5ae47d2ab',
  title: 'Apology',
  name: "You forcibly relax your shoulders and sigh loudly.\n\n\"I apologize, milady.  I admit I'm on edge.  The Empress's illness has me more rattled than I like to admit.",
  next: null
}, {
  type: 'Choice',
  id: '295f954c-802d-4019-a370-cd548fa10b6d',
  title: '',
  name: '"Have you noticed anything unusual happening at the palace recently?"',
  next: '9066ac5c-581d-4b39-8e34-eab00c3fb399'
}, {
  type: 'Choice',
  id: '64518aa8-4d5e-40b2-b935-b44dbe98f20e',
  title: 'If humble',
  name: '"What do you think has happened to the Empress, milady?"',
  next: '2b44610f-febb-42f1-8bc5-014ae6af2139'
}, {
  type: 'Text',
  id: '2b44610f-febb-42f1-8bc5-014ae6af2139',
  actor: 'Akiko',
  name: "Akiko looks at you in surprise.\n\n\"You're asking me?  Aren't you the great detective and loyal servant?  What could an ordinary noblewoman like me possibly offer?\"",
  choices: ['036eed7d-2b9a-4b07-96d4-618b98cc8fcf', '2ba73f13-7738-4da7-9e28-dca36ac49506']
}, {
  type: 'Choice',
  id: '036eed7d-2b9a-4b07-96d4-618b98cc8fcf',
  title: '',
  name: "\"I haven't known you very long, but I can already tell that 'ordinary noblewoman' would be a laughable way to describe you.\"",
  next: null
}, {
  type: 'Text',
  id: '9066ac5c-581d-4b39-8e34-eab00c3fb399',
  actor: '',
  name: '"Nah, not at all.  The spooky noises and semi-permanent smoke seem perfectly normal to me."',
  choices: ['41f50077-da9c-4c18-b289-dd51bd56c92d']
}, {
  type: 'Choice',
  id: '41f50077-da9c-4c18-b289-dd51bd56c92d',
  title: '',
  name: '"What kinds of spooky noises?"',
  next: '5a56f328-02cf-4221-bc7e-5504613cc5b7'
}, {
  type: 'Text',
  id: '5a56f328-02cf-4221-bc7e-5504613cc5b7',
  actor: '',
  name: "Akiko shrugs.\n\n\"If I knew, I'd tell you.",
  next: null
}, {
  type: 'Choice',
  id: '2ba73f13-7738-4da7-9e28-dca36ac49506',
  title: '',
  name: "\"That's a good question.  I had been hoping to find out by asking you.\"",
  next: null
}, {
  type: 'Text',
  id: '9c76f756-0eaf-43eb-9b7d-1fe1f80de8e1',
  actor: 'Akiko',
  name: '"About two weeks ago."',
  next: null
}, {
  type: 'Choice',
  id: 'fab555dd-2d4f-4cb1-b8a0-a5d149f1293b',
  title: '',
  name: '"Or perhaps you should try learning your place."',
  next: '6e46a596-e94c-4da3-ad77-18428ffe6a08'
}, {
  type: 'Text',
  id: '6e46a596-e94c-4da3-ad77-18428ffe6a08',
  actor: '',
  name: 'Her eyes flash.\n\n"Not likely, $milord. ',
  next: null
}, {
  type: 'Branch',
  id: 'faeef27c-cc77-477d-a076-2c4f8a385b68',
  variable: 'has-conversed',
  branches: {
    true: 'd5efd945-9867-4576-b31a-12fe81deba92',
    _default: '6532685a-85b0-461d-bc06-0d3a2295cc76'
  }
}, {
  type: 'Text',
  id: 'd5efd945-9867-4576-b31a-12fe81deba92',
  actor: 'Akiko',
  name: "Oh, it's you again.",
  next: 'eac10c40-83d7-49ad-bff6-c52632ccfb1d'
}, {
  type: 'Branch',
  id: 'eac10c40-83d7-49ad-bff6-c52632ccfb1d',
  variable: 'Akiko.happiness',
  branches: {
    '25 < x < 50': null,
    'x < 25': '1149f43f-0b1e-4af9-8ce7-f22d5f2bbad9',
    _default: 'e1d061c7-46eb-4511-9604-2ce09f7c9331'
  }
}, {
  type: 'Branch',
  id: 'b0468412-3bc1-4cdf-932e-5a0b3e079173',
  variable: 'has-sake',
  branches: {
    true: '7d9b6478-b576-4e6c-ab28-61ec0ce71b86',
    _default: 'f9230284-edee-4fa2-bb0c-65dcf456f2dd'
  }
}, {
  type: 'Set',
  id: '7d9b6478-b576-4e6c-ab28-61ec0ce71b86',
  variable: 'callback',
  value: 'startScene(drinkingBuddies)',
  next: null
}, {
  type: 'Text',
  id: 'e1d061c7-46eb-4511-9604-2ce09f7c9331',
  actor: 'Akiko',
  name: 'Did you come here for some fun this time?',
  choices: ['1dbd3eae-1888-422e-90d4-e2845be03cd2', '0b1dc4c0-0d89-4b66-a1c6-baf5307da099']
}, {
  type: 'Choice',
  id: '1dbd3eae-1888-422e-90d4-e2845be03cd2',
  title: '',
  name: 'Yes',
  next: 'f786b46d-259a-4be5-a084-e7ff55fe7f74'
}, {
  type: 'Choice',
  id: '0b1dc4c0-0d89-4b66-a1c6-baf5307da099',
  title: '',
  name: 'No, not right now.',
  next: '0462c08e-0398-4678-808a-13198e480753'
}, {
  type: 'Text',
  id: 'f9230284-edee-4fa2-bb0c-65dcf456f2dd',
  actor: 'Akiko',
  name: '"Hm.. not much of a party with this atmosphere, is it?"',
  next: null
}, {
  type: 'Text',
  id: 'f786b46d-259a-4be5-a084-e7ff55fe7f74',
  actor: '',
  name: '"Really?  How exciting!  ',
  next: 'b0468412-3bc1-4cdf-932e-5a0b3e079173'
}, {
  type: 'Text',
  id: 'edf64715-787e-4e15-ab23-6c0bd5f193c8',
  actor: 'Akiko',
  name: "\"Or perhaps you'll get impatient as the evening passes and be back sooner,\" she says with a sly smile. \"  If you find yourself lonely or want a good time,  come see me.  In the meantime, can I help you with anything?\"",
  choices: ['a740b32a-8c3f-4c7e-94fd-59419161114c', '9127dacb-fc88-4076-b4b6-53578eb77853']
}, {
  type: 'Text',
  id: '1149f43f-0b1e-4af9-8ce7-f22d5f2bbad9',
  actor: 'Akiko',
  name: "\"I didn't think you'd show your face again after the way you left.",
  choices: ['66e178dc-ed4d-48d9-8640-66a8d4637759', 'dcdcd32e-c568-424a-a1bb-c04b8e5df4fb']
}, {
  type: 'Choice',
  id: '66e178dc-ed4d-48d9-8640-66a8d4637759',
  title: 'Reluctant',
  name: '"It turns out I have need of you, despite your attitude."',
  next: null
}, {
  type: 'Choice',
  id: 'dcdcd32e-c568-424a-a1bb-c04b8e5df4fb',
  title: 'Apology',
  name: '"Ah, I wanted to apologize for that.',
  next: null
}];

export default class Akiko extends Character {
  constructor(config) {
    super(config);
    this.name = 'Akiko';
    this.pronouns = 'She';
    this.dialogue = new Dialogue(AKIKO_DIALOGUE);

    // this.state = {
    //   happinessMeter: 50,
    //   inebriationLevel: 0
    // inConversation: false
    // }

    //this sets the size of the hit box
    this.body.height = 20
    this.body.width = 120
    this.body.offset = {
      x: 10,
      y: 160
    };


  }


}
