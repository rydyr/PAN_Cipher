//make a polyalphanumeric cipher

//imports and global vars
import { read } from 'fs';
import {writeFile} from 'fs'
import { promises as fs } from 'fs';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import boxen from 'boxen';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const {exec} = require('child_process');
const alpha = [0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
let greetVal;
let secretKeyWord;
let clearMessage;
let spaceless;
let finalMessage;
let frequency;
let differences = 0;
let score;
let promptAns;
let fileP;
const letters = [];
const punc = {};
const secretIndex = [];
const brokenArray = [];
const encryptArray = [];
const regex = /[a-zA-Z]/g;
const normalizedFreq = {};
const englishFreq = {
    a: 0.08167,
    b: 0.01492,
    c: 0.02782,
    d: 0.04253,
    e: 0.12702,
    f: 0.02228,
    g: 0.02015,
    h: 0.06094,
    i: 0.06966,
    j: 0.00153,
    k: 0.00772,
    l: 0.04025,
    m: 0.02406,
    n: 0.06749,
    o: 0.07507,
    p: 0.01929,
    q: 0.00095,
    r: 0.05987,
    s: 0.06327,
    t: 0.09056,
    u: 0.02758,
    v: 0.00978,
    w: 0.02360,
    x: 0.00150,
    y: 0.01974,
    z: 0.00074,
};
const boxOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'white',
    backgroundColor: 'grey',
}

//clears terminal screen
function clearMess(){
    process.stdout.write('\u001b[2J\u001b[0;0H');
}

//counts letter occurance in user message
function letterFrequency(str){
    frequency = {};
    for(let q = 0;q < str.length;q++){
        const char = str[q].toLowerCase();
        if(char >= 'a' && char <= 'z'){
            frequency[char] = (frequency[char] || 0) +1;
        }
    } return frequency;
}

//seperates letter from spaces and punctuation
function format(str){
    for(let n = 0;n < str.length;n++){
        if(str[n].match(regex)){
            letters.push(str[n]);
        } else {
            punc[n] = str[n];
        }
    }
}

//processing input for output
function ProcessMess(){
    clearMess();
    title();
    format(clearMessage);
    condense(letters);
    breakDown(spaceless);
    encryptMess(brokenArray,secretIndex);
    applyFormat(encryptArray,punc);
    letterFrequency(encryptArray.join(""));
    normalize();
    findFrequency(normalizedFreq,englishFreq);
    findScore();
    console.log('\n');
    console.log("  ",finalMessage);
    console.log('\n')
    writeText(finalMessage);
    fileP = './output.txt';
    finalPrompt();
    toPrint(fileP);

     
}

//creates output.txt file
function writeText(str){
    fs.writeFile('output.txt',str,'utf8',(err)=>{
        if(err){
            console.error('An error occured while writing the file:',err);
        } else {
            console.log('File saved successfully!');
        }
    });
}

//returns spaces and punctuation
function applyFormat(arr,obj){
    finalMessage = "";
    let eIdex = 0;
    for(let p = 0;p < clearMessage.length;p++){
        if(obj.hasOwnProperty(p)){
            finalMessage+= obj[p];
        } else {
            finalMessage+= arr[eIdex];
            eIdex++;
        }
    } return finalMessage
}

//rotates letter index per keyword
function encryptMess(arr1,arr2){
    for(let l = 0;l < arr1.length;l++){
        let subArray = arr1[l];
        for(let m = 0;m < subArray.length;m++){
            if(m < arr2.length){
                let num = alpha.indexOf(subArray[m]) + arr2[m];
                if(num > 26){
                    num-= 26;
                };
                encryptArray.push(alpha[num]);
            }
            
        }
    }
}

//slices condensed string into lengths less/equal to secretIndex length
const breakDown = ((string) =>{
    let sIL = secretIndex.length;
    for(let k = 0;k < string.length;k+= sIL){
        brokenArray.push(string.slice(k,k + sIL));
    }
})

//all letters, no spaces or punctuation
function condense(arr){
  return spaceless = arr.join("");
}

//line art
function title(){
console.log("    ____   _    _   _     ____ _       _ ");             
console.log("   |  _ \\ / \\  | \\ | |   / ___(_)_ __ | |__   ___ _ __ ");
console.log("   | |_) / _ \\ |  \\| |  | |   | | '_ \\| '_ \\ / _ | '__|");
console.log("   |  __/ ___ \\| |\\  |  | |___| | |_) | | | |  __| |");   
console.log("   |_| /_/   \\_|_| \\_____\\____|_| .__/|_| |_|\\___|_|");   
console.log("                   |_____|      |_|");   
console.log("   ************ PolyAlphaNumeric Cipher ***************");                
}

//welcome screen, program fork
function greeting(){
    let greetMess = "Welcome to PANCipher!\nIt is recommended to copy/paste ("+ chalk.blue("'CTRL' + 'SHIFT' + 'V'") + ")\nyour message from a text editor and run PANCipher multiple\ntimes to compare deviation scores. Deviation scores compare\nencryption letter frequency against those expected in the\nEnglish language. A low deviation score will be displayed\nin " + chalk.red("red") + ", medium in " + chalk.yellow("yellow") + ", and high in " + chalk.green("green");
    clearMess();
    title();
    console.log(boxen(greetMess,boxOptions));
    console.log('\n')
    const firstChoice = readlineSync.question('  Press 1 to encode. Press 2 to decode. ');
    greetVal = firstChoice;
}

//directs between encrypt and decrypt
function director(){
    if(greetVal === "1"){
        //add encrypt function here
        createWord();
        createMessage();
        ProcessMess();
    } else if(greetVal === "2"){
        //add decrypt function here
        getMessage();
        getWord();
        ProcessMess2();
    } else {
        //add a "you fucked up" message here
        console.log(`Yo! you selected '${greetVal}' that's not even an option man!`)
    }
}

//create secret keyword
function createWord(){
    let wordMess = "***Important***\nremember your secret keyword!\nit will be needed later to\ndecode the message.";
    clearMess();
    title();
    console.log('\n  Create new "Key" word...\n');
    console.log(boxen(wordMess,boxOptions));
    const createKey = readlineSync.question('\n  Enter your "Key" word \n');
    secretKeyWord = createKey;
    findSecretIndex(secretKeyWord);
}

//index of keyword's letters
function findSecretIndex(str){
    for(let i = 0;i < str.length;i++){
        secretIndex.push(alpha.indexOf(str[i]));
    }
}

//user enters message for encryption
function createMessage(){
    clearMess();
    title();
    const message = readlineSync.question('\n  Enter the message you would like to encrypt \n \n')
    clearMessage = message;
}

//user enters message for decryption
function getMessage(){
    clearMess();
    title();
    const message = readlineSync.question('\n  Enter the message you would like to decrypt \n')
    clearMessage = message;
}

//user enters secret keyword
function getWord(){
    clearMess();
    title();
    const createKey = readlineSync.question('\n  Enter your "Key" word \n');
    secretKeyWord = createKey;
    findSecretIndex(secretKeyWord);
}

//reverse rotates letter index per keyword
function decryptMess(arr1,arr2){
    for(let l = 0;l < arr1.length;l++){
        let subArray = arr1[l];
        for(let m = 0;m < subArray.length;m++){
            if(m < arr2.length){
                let num = alpha.indexOf(subArray[m]) - arr2[m];
                if(num < 1){
                    num+= 26;
                };
                encryptArray.push(alpha[num]);
            }
            
        }
    }
}

//process input for output
function ProcessMess2(){
    clearMess();
    title();
   format(clearMessage);
    condense(letters);
    breakDown(spaceless);
    decryptMess(brokenArray,secretIndex);
    applyFormat(encryptArray,punc);
    letterFrequency(encryptArray.join(""));
    console.log("\n  ",finalMessage,"\n");
    writeText(finalMessage);
     
}

//converts occurance count into frequency 
function normalize(){
    const charTotal = Object.values(frequency).reduce((sum,count)=> sum + count,0);
    for(const letter in frequency){
        normalizedFreq[letter] = frequency[letter] / charTotal;
    }
}

//returns a count of differences between message and general english
function findFrequency(freq1,freq2){
   for(const letter in freq1){
        differences+= Math.abs((freq1[letter] || 0) - (freq2[letter]));
   } return differences;
}

//outputs color based frequency difference 
function findScore(){
   score = `  Score: ${differences}`;
   if(differences < 0.6){
    console.log(chalk.red(score));
   } else if(differences >= 0.6 && differences <= 0.77){
    console.log(chalk.yellow(score));
   } else if(differences > 0.77){
    console.log(chalk.green(score));
   }
}

//identifies platform to provide openfile command
function openFile(filePath){
    let command;

    switch(process.platform){
        case 'win32':
            command = `start"" "${filePath}"`;
            break;
        case 'darwin':
            command = `open "${filePath}"`;
            break;
        case 'linux':
            command = `xdg-open "${filePath}"`;
            break;
        default:
            console.error('Unsupported platform:',process.platform);
            return;
    }
    exec(command,(error)=>{
        if(error){
            console.error(`Error opening the file: ${error.message}`);
        } else {
            console.log("Text file opened successfully.");
        }
    });
}

//provide prompt to open output.txt in default editor.
function finalPrompt(){
    const lastPrompt = readlineSync.question("\n  Press 'P' to open output.txt in default text editor.\n  Otherwise press any other key to exit.\n");
    promptAns = lastPrompt;
}

//users option to open or exit
function toPrint(file){
    if(promptAns.toLowerCase() === 'p'){
        openFile(fileP);
    } else {
        console.log('Session end by user.');
    }
}

greeting();
console.log(greetVal);
director();