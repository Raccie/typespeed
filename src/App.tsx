import React from 'react';
import './App.css';
import {Keyboard, letterDOWN, letterUP} from "./components/Keyboard/Keyboard";
import {TextField, clearTF, setText, checkWord, nextWord, focus, isLastWord} from "./components/TextField/TextField";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import texts from './text.json';

let keyMap = new Map<String, Number[]>();
let timeStamp = 0;

function getRandomText(){
  return texts.texts[Math.floor(Math.random()*texts.texts.length)]
}

onkeydown = ev => {
  letterDOWN(ev.key)

  let delta = new Date().getTime() - timeStamp;
  timeStamp = new Date().getTime();
  let key = ev.key.toLowerCase();
  switch (key){
    case ';':
      key = ',';
      break;
    case ':':
      key = '.';
      break;
  }
  const arr = keyMap.get(key);
  if(arr !== undefined)
    arr.push(delta);

  if (ev.key === ' ')
    if (checkWord() === true) {
      setTimeout(clearTF, 1);
      nextWord();
      if (isLastWord){
        localStorage.setItem('keyMap', JSON.stringify(Array.from(keyMap)))
        window.location.href = '/results';
      }
    }

}
onkeyup = ev => {
  letterUP(ev.key)
}

const startGame = () => {
  timeStamp = new Date().getTime();
  setText(getRandomText());
  focus();
}

function getAverageMap(inputMap: Map<unknown, unknown> | null) {
  let map = new Map<String, Number>();
  inputMap?.forEach((value, key)=>{
    const _key = key as String;
    const _val = value as Number[];
    let sum = 0;

    // @ts-ignore
    _val.forEach((element) => sum+=element)
    map.set(_key, sum/_val.length);
    if(isNaN(map.get(_key) as number)) map.set(_key, 0);
  })
  return map;
}

function App() {
  let defMap: Map<String, Number> = new Map<String, Number>();
  let results: any[] = [];
  if(window.location.href.endsWith('results')) {
    let str = localStorage.getItem('keyMap');
    const resultMap = str !== null ? new Map(JSON.parse(str)) : null;
    defMap = getAverageMap(resultMap);
  }

  defMap.forEach((value, key)=>{
    if(value !== 0)
      results.push(<span className="result"><span>{key}:  </span>{value}ms<br/></span>);
  });
  console.log(results)

  keyMap.set('a', []);
  keyMap.set('b', []);
  keyMap.set('c', []);
  keyMap.set('d', []);
  keyMap.set('e', []);
  keyMap.set('f', []);
  keyMap.set('g', []);
  keyMap.set('h', []);
  keyMap.set('i', []);
  keyMap.set('j', []);
  keyMap.set('k', []);
  keyMap.set('l', []);
  keyMap.set('m', []);
  keyMap.set('n', []);
  keyMap.set('o', []);
  keyMap.set('p', []);
  keyMap.set('q', []);
  keyMap.set('r', []);
  keyMap.set('s', []);
  keyMap.set('t', []);
  keyMap.set('u', []);
  keyMap.set('v', []);
  keyMap.set('w', []);
  keyMap.set('x', []);
  keyMap.set('y', []);
  keyMap.set('z', []);
  keyMap.set('ä', []);
  keyMap.set('ö', []);
  keyMap.set('ü', []);
  keyMap.set('.', []);
  keyMap.set(',', []);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/results">
            <Keyboard isResult={true} map={defMap} />
            <div className="result-container">
              {results}
            </div>

          </Route>
          <Route path="/">
            <TextField/>
            <button onClick={startGame}>Start</button>
            <br/><br/>
            <Keyboard/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
