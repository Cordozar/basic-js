const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(message, key) {
    this.validateArguments(message, key);

    message = message.toUpperCase();
    key = this.generateKey(message, key);

    let result = '';
    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        const messageCharIndex = this.alphabet.indexOf(message[i]);
        const keyCharIndex = this.alphabet.indexOf(key[i]);
        const encryptedIndex = (messageCharIndex + keyCharIndex) % 26;
        result += this.alphabet[encryptedIndex];
      } else {
        result += message[i];
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.validateArguments(encryptedMessage, key);

    encryptedMessage = encryptedMessage.toUpperCase();
    key = this.generateKey(encryptedMessage, key);

    let result = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
      if (this.alphabet.includes(encryptedMessage[i])) {
        const encryptedCharIndex = this.alphabet.indexOf(encryptedMessage[i]);
        const keyCharIndex = this.alphabet.indexOf(key[i]);
        const decryptedIndex = (encryptedCharIndex - keyCharIndex + 26) % 26;
        result += this.alphabet[decryptedIndex];
      } else {
        result += encryptedMessage[i];
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  generateKey(message, key) {
    const keyLength = key.length;
    let generatedKey = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        generatedKey += key[j % keyLength];
        j++;
      } else {
        generatedKey += message[i];
      }
    }

    return generatedKey.toUpperCase();
  }

  validateArguments(arg1, arg2) {
    if (!arg1 || !arg2) {
      throw new Error('Incorrect arguments!');
    }
  }
}

module.exports = {
  VigenereCipheringMachine,
};
