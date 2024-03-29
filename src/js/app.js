const styles = require('../scss/main.scss');

class Site {
  constructor() {
    this.passphraseInput = document.querySelector(".input__passphrase");
    this.messageInput = document.querySelector(".input__message");
    this.encodeButton = document.querySelector(".button__encode");
    this.alphabethInput = document.querySelector(".input__alphabeth");
    this.saveButton = document.querySelector(".button__save");
    this.fileInput = document.querySelector(".input__message-file");
    this.encryptCheckbox = document.querySelector("#encrypt");
    this.decryptCheckbox = document.querySelector("#decrypt");

    this.passphrase = this.passphraseInput.value.replace(/\s/g, '');
    this.message = this.messageInput.value.replace(/\s/g, '');
    this.alphabeth = this.alphabethInput.value;

    document.addEventListener('DOMContentLoaded', () => {
      this.bindEvents();
    });
  }

  bindEvents() {
    this.alphabethInput
      .addEventListener('keyup', (e) => {
        this.alphabeth = e.target.value;
        this.printOutput();
      });

    this.passphraseInput
      .addEventListener('keyup', (e) => {
        this.passphrase = e.target.value;
        this.printOutput();
      });

    this.messageInput
      .addEventListener('keyup', (e) => {
        this.message = e.target.value;
        this.printOutput();
      });

    this.encryptCheckbox
      .addEventListener('change', (e) => {
        this.printOutput();
      });

    this.decryptCheckbox
      .addEventListener('change', (e) => {
        this.printOutput();
      });

    this.printOutput();
  }

  printOutput() {
    const outputElement = document.querySelector(".output");

    outputElement.innerText = this.encryptCheckbox.checked
    ? this.encrypt()
    : this.decrypt();
  }

  encrypt() {
    const passwordArray = this.getPasswordArray();

    return Array.from(this.message)
      .map((letter, letterIndex) => {
        const messageIndex = this.alphabeth.indexOf(letter);
        const passphraseIndex = this.alphabeth.indexOf(passwordArray[letterIndex]);
        const shift = (messageIndex + passphraseIndex) % this.alphabeth.length;

        return this.alphabeth[shift];
      }).join('');
  }

  decrypt() {
    const passwordArray = this.getPasswordArray();

    return Array.from(this.message)
      .map((letter, letterIndex) => {
        const messageIndex = this.alphabeth.indexOf(letter);
        const passphraseIndex = this.alphabeth.indexOf(passwordArray[letterIndex]);
        const shift = messageIndex >= passphraseIndex
          ? messageIndex - passphraseIndex
          : this.alphabeth.length - Math.abs(messageIndex - passphraseIndex) % this.alphabeth.length;

        return this.alphabeth[shift];
      }).join('');
  }

  getPasswordArray() {
    return Array.from(this.message)
      .reduce((arr, letter, index) => {
        return [
          ...arr,
          this.passphrase[index % this.passphrase.length],
        ]
      }, [])
      .join('')
      .toUpperCase();
  }

  saveToFile() {
    const output = document.querySelector(".output").innerText;
    const file = new Blob([output], {
      type: 'plain/text'
    });
    console.log('output', file);
  }
}

new Site();
