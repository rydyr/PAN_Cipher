# PAN_Cipher
[![Run on Repl.it](https://replit.com/badge/github/rydyr/PAN_Cipher)](https://replit.com/new/github/rydyr/PAN_Cipher)


## Before you press "Run"...

This application was originally intended to be run from a full-screen desktop terminal. Because there are different options for running this application it is recommended to maximize the available screen space to ensure proper display.

## README Contents:

- What is PAN cipher?
- About this application.
- Getting started.
- How to use.


## What is PAN cipher?

PAN Cipher stands for PolyAlphaNumeric Cipher. A polyalphanumeric cipher is a fascinating method of encryption that goes beyond the traditional single-alphabet substitution systems such as the Ceasar cipher. Rather than a single-character key, this cipher employs multiple-characters for encryption. The essence of its mechanism lies in the dynamic rotation of characters based on their alignment with the key. This introduces an added layer of complexity, making the encoded message even more challenging for interceptors to decipher. By intertwining multiple characters, the polyalphanumeric cipher offers a robust and intricate way to secure infomation, ensuring the message remained a riddle to those without knowledge of its inner workings.

While the Cesear cipher was groundbreaking in its time, it had an Achilles heel: letter frequency. In any language, certain letters or combinations appear more frequently than others. For instance in English, letters like 'E','T', and 'A' are used more often. Astute observers realized that by analyzing the frequency of letters in the encrypted message, they could make educated guesses about the original content, making the Ceasar cipher susceptible to what's known as frequency analysis.

Enter the polyalphanumeric cipher. By weaving together multiple characters, it effectively muddles the predictable patterns seen in single-alphabet systems. This dynamic interplay ensures that even if one letter appears frequently in the original message, its encrypted counterpart isn't consistently the same. Thus, the polyalphanumeric approach elegantly sidesteps the pitfalls of letter frequency, presenting a more intricate puzzle for would-be codebreakers and elevating the art of encryption to new heights. 

## About this application

Firstly it's important to note that PAN cipher is based on ancient cryptographic techniques and not on modern encryption technology. It's highly recommended NOT to use this encryption on any type of genuinely sensitive information.

This application is intended to be used for educational and entertainment purposes only.


## Getting started.

Live Demo

If you have a Repl.it account and would like to try a live demo, click the button at the top of this Readme, follow any prompts for logging in, then simply press the run button. 

Local application 

To run this application locally you first need to clone the repository. Open a terminal and cd to the location where you would like to save the files.

```cd /path/to/directory```

Next clone the directory 

```git clone https://github.com/rydyr/PAN_Cipher.git ```

Navigate to the repository 

```cd PAN_Cipher```

Install the dependencies 

```npm install ```

Then run the application 

```node cipher ```


## How to use 

The PAN_Cipher interface is very simple. You're first prompted to make a choice of either encrypting or decrypting.

### To encrypt

Press 1. 

You will now be prompted to enter a secret key. This can be any word or letter combination. Choose something you will remember as this key will be needed later to decrypt the message. 

Next you will be prompted to enter the message you would like to encrypt. Upon completion you will recieve a color coded score and be given the option to either save the output as a .txt file or exit. 

The score represents the level of deviation from typical English letter frequency. The higher the level of deviation the better the encryption.

### To decrypt 

Press 2.

You will now be prompted to enter the message for decryption. 

Once the message is entered you will be prompted to enter the key. 

Once the correct key is entered you will see the hidden message and be given the option to either save the output as a .txt or exit.


### Future improvements 

- Improve code structure by implementing proper design patterns. As example the Module Design pattern could be employed to help protect certain functions and variables.
