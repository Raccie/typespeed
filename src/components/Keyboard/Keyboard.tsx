import React, {useEffect} from 'react';
import styles from './Keyboard.module.css';

const letters = [
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["y", "x", "c", "v", "b", "n", "m", ",", "."]]

let isResultScreen = false;

const Key = (props: {letter:string})=>{
  return (
      <div id={props.letter} className={styles.key}>
        <span>{props.letter.toUpperCase()}</span>
      </div>
  )
}

function letterDOWN(l:string){
  if(!isResultScreen) {
    let key = document.getElementById(l);
    // @ts-ignore
    if (key !== null) {
      key.style.setProperty('background-color', 'green');
    }
  }
}

function letterUP(l:string) {
  if (!isResultScreen) {
    let key = document.getElementById(l);
    // @ts-ignore
    if (key !== null) {
      key.style.setProperty('background-color', 'grey');
    }
  }
}

function getHex(i:number){
  if(i.toString(16).length === 1)
    return '0'+i.toString(16)
  else
    return i.toString(16)
}
function setColor(l:string, r:number, g:number, b:number){
  let key = document.getElementById(l);

  // @ts-ignore
  if(key !== null)
    key.style.setProperty('background-color', `#${getHex(255)}${getHex(255-r)}${getHex(255-r)}` );

}

const Keyboard = (props: {map?:Map<String, Number>, isResult?:boolean}) => {
  if(props.isResult === undefined)
    isResultScreen = false;
  else
    isResultScreen = props.isResult;

  // Generate keys for keyboard
  let topRow: JSX.Element[] = []
  for (let l of letters[0]) topRow.push(<Key letter={l}/>);
  let homeRow: JSX.Element[] = []
  for (let l of letters[1]) homeRow.push(<Key letter={l}/>);
  let bottomRow: JSX.Element[] = []
  for (let l of letters[2]) bottomRow.push(<Key letter={l}/>);

  useEffect(() => {
    // if prop map is defined, set the colors of each key
    if(props.map !== undefined){
      props.map.forEach((value, key) => {
        // @ts-ignore
        setColor(key, Math.min(Math.floor(value*255/500), 255), 0, 0)
      })
    }
  });

  return (
      <div className={styles.Keyboard}>
        <div className={styles.topRow}>
          {topRow}
        </div>
        <div className={styles.homeRow}>
          {homeRow}
        </div>
        <div className={styles.bottomRow}>
          {bottomRow}
        </div>
      </div>
  )
};

export {Keyboard, letterDOWN, letterUP};
