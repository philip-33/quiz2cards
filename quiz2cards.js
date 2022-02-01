import { v4 as uuidv4 } from 'uuid'; // uuidv4();
import * as fs from 'fs';
import readline from 'readline-sync';
const deckDefaultPrompt = "Name for the deck? (Enter for 'default') ";
const deckDefaultName = 'default';

function GenerateDeck(userDeckName = deckDefaultName) {
  return {
    init() {
      this.readCardDataFromDisk();
      this.convertCardData();
      this.writeCardDataToDisk();
      this.writeConfigDataToDisk();
    },
    border: {
      header: '\n<<<\n',
      title: '\n===\n',
      body: '\n---\n',
      close: '\n>>>\n',
      question: 'QUESTION',
      answer: 'ANSWER'
    },
    name: userDeckName,
    folder: `q2c-temp-${userDeckName}`,
    description: `${userDeckName} quiz`,
    configBaseFile: 'base.json.config',
    configJSONData: '',
    originalCardData: '~',
    formattedCardData: '~',
    getUUID() {
      return uuidv4();
    },
    readCardDataFromDisk() {
      const filename = `${this.name}`;
      if (!fs.existsSync(`./${filename}`)) {
        console.log(`No file ${filename} to read.`);
        throw new Error(`No file ${filename} to read.`);
      }
      this.originalCardData = fs.readFileSync(`./${filename}`, {
        encoding: 'utf8',
        flag: 'r'
      });
    },
    convertCardData() {
      if (this.originalCardData !== '~') {
        this.formattedCardData = this.originalCardData
          .split(this.border.question)
          .map(question => [uuidv4(), ...question.split(this.border.answer)])
          .reduce((thisDeck, card) => {
            const [id, q, a] = card;
            return `${thisDeck}${this.border.header}id: ${id}${this.border.title}# ${q}${this.border.body}${a}${this.border.close}`;
          }, '');
      }
    },
    writeConfigDataToDisk() {
      // placeholder for config template filename
      const filename = this.configBaseFile;

      // check that the template file exists
      if (!fs.existsSync(`./${filename}`)) {
        console.log(`No base JSON file ${filename} to read.`);
        return;
      }
      // read the file since it exists
      const baseData = fs.readFileSync(`./${filename}`, {
        encoding: 'utf8',
        flag: 'r'
      });
      // swap placeholders with the provided data
      this.configJSONData = baseData
        .replace(/NAME_HERE/gi, this.name)
        .replace(/ID_HERE/gi, this.getUUID())
        .replace(/DESCRIPTION_HERE/gi, this.description);

      // Write the saved copy of the config to the final location
      fs.writeFile(
        `./${this.folder}/cards_config.json`,
        this.configJSONData,
        err => {
          if (err) {
            console.error(err);
          }
          // file written successfully
        }
      );
    },
    writeCardDataToDisk() {
      const dir = this.folder;
      const name = this.name;
      if (!fs.existsSync(`./${dir}/`)) {
        fs.mkdirSync(`./${dir}/`);
      }
      fs.writeFile(`./${dir}/${name}.cards`, this.formattedCardData, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
    }
  };
}

// main loop
let userInput = readline.question(deckDefaultPrompt);
const myDeck = GenerateDeck(userInput || deckDefaultName);
myDeck.init();
