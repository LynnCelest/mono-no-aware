import {Scene} from 'phaser';
import store from '../store';

const WIDTH = 400;
const MAX_HEIGHT = 500;
const SPACE_PX = 15;
const TITLE_HEIGHT = 50;
const BORDER_HEIGHT = 20;
const LINE_HEIGHT = 40;
const SELECTION_HEIGHT = 54;

export default class DialogueScene extends Scene {
    constructor(config) {
        super(config);
        this.handleKey = this.handleKey.bind(this);
    }

    preload() {
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    handleResponse() {
        let response = null;
        if (this.responses.length > this.selectionIndex) {
            response = this.responses[this.selectionIndex];
        }

        // set dialogue to child, if one exists, otherwise reset it
        store.setDialogue(response && response.child);

        if (response && response.child) {
            // re-render convo with child text
            this.render();
        } else {
            // no child, so exit dialogue
            this.input.keyboard.off('keydown', this.handleKey)
            this.scene.stop();
        }

        if (response && response.cb) {
            // run callback, if any
            response.cb();
        }
    }

    updateSelectionTween() {
        if (this.selectionTween) {
            this.selectionTween.stop();
        }
        this.selectionTween = this.tweens.add({
            targets: this.selection,
            ease: 'Sine.easeInOut',
            duration: 300,
            y: this.getSelectionY()
        });
    }

    handleKey(event) {
        if (event.repeat) {
            return;
        }

        switch (event.key) {
            case 'ArrowUp':
                if (this.selectionIndex > 0) {
                    this.sound.add('tap').play();
                    this.selectionIndex--;
                    this.updateSelectionTween();
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < store.getDialogue().responses.length-1) {
                    this.sound.add('tap').play();
                    this.selectionIndex++;
                    this.updateSelectionTween();
                }
                break;
            case 'Enter':
                this.sound.add('select').play();
                this.handleResponse();
                break;
            default:
                break;
        }
    }

    justifyText(text, width) {
        let splitText = text.split(' ');

        this.words.forEach(word => word.destroy());
        this.words = splitText.map(word => this.add.text(0, 0, word, { font: "40px Amatic SC" }));
        let y = LINE_HEIGHT / 4;
        let curWord = 0;
        while (curWord < this.words.length) {
            // more words, so make a line of text
            let lineWidth = this.words[curWord].width;
            let startingWord = curWord;
            this.words[curWord++].y = y;
            while (curWord < this.words.length &&
                lineWidth + SPACE_PX + this.words[curWord].width < width) {
                this.words[curWord].x = this.words[curWord - 1].x + this.words[curWord - 1].width + SPACE_PX;
                this.words[curWord].y = y;
                lineWidth += SPACE_PX + this.words[curWord].width;
                curWord++;
            }
            if (curWord !== this.words.length && curWord - startingWord > 1) {
                let addWidth = (width - lineWidth) / (curWord - startingWord - 1);
                for (let i = startingWord; i < curWord; i++) {
                    this.words[i].x += addWidth * (i - startingWord);
                }
            }
            y += LINE_HEIGHT;
            this.wordWidth = Math.max(this.wordWidth, this.words[curWord-1].x + this.words[curWord-1].width);
        }

        this.wordHeight = y + LINE_HEIGHT / 2;
    }

    getSelectionY() {
        return this.contentY + 
            this.contentHeight - 
            BORDER_HEIGHT -
            (this.responses.length - this.selectionIndex) * SELECTION_HEIGHT;
    }

    render() {
        let dialogue = store.getDialogue();

        this.selectionIndex = 0;
        this.responses = dialogue.responses;

        // justify text
        this.wordWidth = 0;
        this.wordHeight = 0;
        this.justifyText(dialogue.text.trim(), 400);
        this.contentHeight = this.wordHeight + 
            SELECTION_HEIGHT * this.responses.length +
            BORDER_HEIGHT * 2 +
            TITLE_HEIGHT;

        // scale text height
        let wordScaleY = 1;
        if (this.contentHeight > MAX_HEIGHT) {
            // compress text so it fits
            wordScaleY = (this.wordHeight - (this.contentHeight - MAX_HEIGHT)) / this.wordHeight;
            this.contentHeight = MAX_HEIGHT;
        }
        this.contentY = (600 - this.contentHeight) / 2;

        this.bkg.clear();
        this.bkg.lineStyle(2, 0xffffff, 1);
        this.bkg.fillStyle(0, 1);
        this.bkg.strokeRect(0, 0, 450, this.contentHeight);
        this.bkg.fillRect(0, 0, 450, this.contentHeight);
        this.bkg.x = 175;
        this.bkg.y = this.contentY;

        // too tall, so compress lines
        this.words.forEach(word => {
            word.x += 400 - this.wordWidth / 2;
            word.y = this.contentY + BORDER_HEIGHT + TITLE_HEIGHT + word.y * wordScaleY;
            word.scaleY = wordScaleY;
        })
        
        if (this.title) {
            this.title.destroy();
        }
        this.title = this.add.text(0, 0, dialogue.name, { font: "40px Berkshire Swash" });
        Phaser.Display.Align.In.Center(this.title, this.add.zone(400,
            this.contentY + BORDER_HEIGHT + TITLE_HEIGHT / 2, 0, 0));

        let maxWidth = 0;
        this.responsesText.forEach(response => response.destroy());
        this.responsesText.length = 0;
        for (let i = 0; i < this.responses.length; i++) {
            let response = this.add.text(0, 0, this.responses[i].response, { font: "40px Amatic SC" });
            this.responsesText.push(response);
            Phaser.Display.Align.In.Center(response, this.add.zone(400, 
                this.contentY + this.contentHeight - BORDER_HEIGHT - (this.responses.length - i - 0.5) * SELECTION_HEIGHT,
                0, 0));
            maxWidth = Math.max(maxWidth, response.width);
        }
        maxWidth += 20;
    
        this.selection.clear();
        if (this.responses.length) {
            this.selection.lineStyle(2, 0xffffff, 1);
            this.selection.strokeRect(0, 0, maxWidth, 54);
            this.selection.x = 400-maxWidth/2;
            this.selection.y = this.getSelectionY();
        }
    }

    create() {
        this.protag = store.protag;

        this.bkg = this.add.graphics();
        this.selection = this.add.graphics();

        this.words = [];
        this.responsesText = [];
        this.title = null;

        this.render();

        this.blink = 0;

        this.input.keyboard.on('keydown', this.handleKey);
    }

    update(time, delta) {
        this.blink += delta;
        this.title.alpha = [1,0.85,0.7,0.85][Math.floor(this.blink / 500) % 4];
   }
}
