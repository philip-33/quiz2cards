# Quiz2Cards

## About

Quiz2Cards is a script that converts flashcard sets exported from quizlet.com into [Mnemocards](https://github.com/guiferviz/mnemocards) '.cards' format. It also generates the required configuration file that Mnemocards needs to generate an Anki deck (.apkg).

## Prerequisites

Node, plus the following packages via npm:

- **readline-sync**
- **fs**
- **uuid**

To generate Anki decks from the output of quiz2cards:

- [**mnemocards**](https://github.com/guiferviz/mnemocards)

## Usage

1. In the same directory as the `quiz2cards.js` file, place the quiz data in a .txt file.
2. With node.js installed, run `node quiz2cards.js`
3. When prompted, type the name of the file to process it.

## Documentation

_Generating flashcard quiz data exports from quizlet.com:_

- Creating an account there currently allows exporting flashcard data
- When exporting, use custom markers for questions and answers w/o newlines/cr
  - The defaults used by this script are ANSWER and QUESTION
- Once the data is on the clipboard, save it in a file.
- Place this file in the same directory as quiz2cards.js.

_Steps for generating one or more Anki decks:_

- Export quiz questions to a file, then run `node quiz2cards.js`
- When prompted, enter the name of the file
- Repeat for all exported quiz sets
- With [mnemocards](https://github.com/guiferviz/mnemocards) installed and on $PATH:
  - run `mnemocards generate -r`
    - mnemocards -r switch searches all child subdirectories for deck data
    - Mnemocards generates a separate Anki deck for each subfolder of data
    - Temp subfolders can be deleted once the decks are generated

_Files generated:_

Temp folders can be deleted once the decks are generated. If desired, the config and .cards file can be used to manage deck content since a new deck can be generated at will.

- _./q2c-temp-<user-deck-name>/_ : temp subfolder
- _./q2c-temp-<user-deck-name>/cards_config.json_ : configuration file for mnemocards deck gen
- _./q2c-temp-<user-deck-name>/<user-deck-name>.cards_ : exported questions converted into .cards format.

## Todo

- Add MIT License
- Integrate Mnemocards completely so an Anki deck is generated
- Rename the program at that point? Quizlet2Anki?
 
