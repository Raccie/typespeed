import React from 'react';
import styles from './TextField.module.css';

let words:string[] = [];
let currentWord = 0;
let isLastWord = false;

function clearTF(){
  // @ts-ignore
  document.getElementById('textField').value = '';
}

function setText(text:string){
  words = text.split(' ');
  currentWord = 0;
  isLastWord = false;
  const textArea = document.getElementById('textArea');
  if(textArea !== null)
    textArea.innerText = text;
}

function focus(){
  // @ts-ignore
  document.getElementById('textField').focus();
}

function nextWord(){
  currentWord++;
  if(currentWord === words.length){
    isLastWord = true;
  }
  console.log(words[currentWord]);
}

function checkWord(){
  const tf = document.getElementById('textField');
  if(tf !== null)
    { // @ts-ignore
      // @ts-ignore
      return (words[currentWord] === tf.value);
    }
}

const TextField: React.FC = () => (
  <div className={styles.TextField}>
    <textarea id="textArea" className={styles.TextArea} disabled={true}>
    </textarea><br/>
    <input className={styles.TextInput} id="textField" type="text"/>
  </div>
);

export {TextField, clearTF, setText, nextWord, checkWord, focus, isLastWord};
