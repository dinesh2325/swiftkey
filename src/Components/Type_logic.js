import { useState, useEffect, useRef } from "react";       //imported for focus on input
import { generate } from 'random-words';                  //random-words is npm package ....generate()... generate random word

import { useSpeechSynthesis } from 'react-speech-kit';    //libarary for producing sound
        
import index from '../index.css';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import Profile from "../Profile/Profile";



const NUMB_OF_WORDS = 150;                                //max word in paragraph


const Type_logic = () => {
  const navigate = useNavigate();

  const goToProfile=()=>{
    navigate("/Profile");
  }
   
  //for timer custmization
  const [TimerChanger,setTimeChanger]=useState(60);
  
  const [words, setWords] = useState([]);                 //words is a array of paragraph with random word
  const [countDown, setCountDown] = useState(TimerChanger);     //state for timer
  const [currInput, setcurrInput] = useState("");            //currently entered char
  const [currWordIndex, setCurrWordsIndex] = useState(0);
  const [Correct, setCorrect] = useState(0);
  const [Incorrect, setIncorrect] = useState(0);
  const [status, setstatus] = useState("waiting");           //show contest status finish aur started
  const textInput = useRef(null);

  //for giving color to char while typing 
  const [currCharIndex, setcurrCharIndex] = useState(-1);    //current char of input 
  const [currChar, setCurrChar] = useState("");
 
  //for producing sound 
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();     


  useEffect(() => {
    setWords(generatewords())                              //jab refresh kiya jata hai to newword is produce
  }, []);

  useEffect(() => {                                        //input get focused whenever status is "started"
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);



  function generatewords() {                            //function generate random array of words
    return new Array(NUMB_OF_WORDS).fill(null).map(() => generate())
  }

   


  function start()                                    //triggered when start button clicked 
  {
    if (status === "finish") {
      setWords(generatewords());
      setCurrWordsIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setcurrCharIndex(-1);
      setCurrChar("");
    }

    if (status != "started") {                      //whenever test started countdown start then stop at 0
      setstatus("started");
      let interval = setInterval(() => {
        setCountDown((pre) => {
          if (pre === 0) 
          {
            clearInterval(interval);
            setcurrInput("");
            setstatus("finish");
            return TimerChanger;
          }
          else
            return pre - 1;
        })
      }, 1000);
    }

  }

  function handleKeyDown({ keyCode, key })                //triggered when input is given and it recognize the key 
  {
     
    if (keyCode === 32) {                                //if space bar is pressed
      speak({ text: value });                            //whenever space pressed word pronounced ;
      checkMatch();
      setcurrInput("");
      setCurrWordsIndex(currWordIndex + 1);
      setcurrCharIndex(-1);
    }
    else if (keyCode === 8) {                              //if back key press
      setcurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    }
    else
    {
      setcurrCharIndex(currCharIndex + 1);               //for other keypress event
      setCurrChar(key);
    }
  }




  function checkMatch()                                //triggered when space bar pressed
  {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) setCorrect(Correct + 1);
    else setIncorrect(Incorrect + 1);
  }

  function getCharClass(wordIdx, charIdx, char)        //assign color classess on the basis of wrong or right pressed word
  {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status != "finish") {
      
      if (char === currChar) {
        return "char_color_green ";                   //class for right char
      }
      else return "char_color_red ";                  //class for wrong char
    }
    else if (wordIdx === currCharIndex && currCharIndex >= words[currWordIndex].length) {
      return "char_color_red";
    }
    else return '';

  }
 
  function getwordClass(wordIdx){
    if(wordIdx===currWordIndex) return "worddd";
  }

  


  
  return (
    <>

<Button variant="contained" color="success" className='mx-10 flex justify-end' onClick={()=>goToProfile()}>Profile</Button>



{/*TimerChanger is initialy 60 and that can be changed with select target,,,,
after setting TimerChanger value we assign it to cuntdouwn,,,,,,,,,,,,,
 jo settimeinterval se decrease ho to jata hai */}

 {/* timer_custmizer */}
<label for="Timer">Time Duration:</label>
<select name="Timer" id="Timer"  onClick={(event)=>{
  setTimeChanger(event.target.value)

  //value of counter get updated through Timer dropdown
  if(status!="started"){
    setCountDown(event.target.value);
  }
  }
}>
  <option value="60"> 1 Minute</option>
  <option value="120">2 Minute</option>
  <option value="180">3 Minute</option>
  <option value="300">5 Minute</option>
</select>



          {/*timer component*/}
      <div className="flex justify-center ... mt-9 ">                               
        <h2 className="box-content  p-4 border-4 ... px-2 py-2 text-purple-600 text-xl">
  {countDown}</h2>
      </div>
    

    
         <>
         {/* paragraph  */}
         <div className="flex justify-center ... mt-12">
         <div className=" box-border h-auto w-10/12 p-4 border-4 ...  ">
            {words.map((word, i) => (                                  //assign i to every word of words array(random generated)
              <>
                <span className="italic ... text-2xl font-medium tracking-normal " key={i}>
                  <span className={getwordClass(i)}>
                    {word.split("").map((char, idx) => (                //split each word of words array and assign idx
                      <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                    ))}
                  </span>
                  <span> </span>
                </span>
              </>
            ))}
          </div>
         </div>
         </> 
     





         
      {/* input area componet */}
      <div className="flex justify-center ... mt-10">

        <label class="relative block w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
            ........</svg>
          </span>
          <input ref={textInput} disabled={status != "started"} type="text" onKeyDown={handleKeyDown} value={currInput} onChange={(e) => {
                 setcurrInput(e.target.value);
                 setValue(e.target.value);
                 } 
          }

           className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm italic ... text-2xl font-medium tracking-normal mt-7 mr-5" placeholder="Write here" />
        </label>








        {/* contest start button */}
        <div className="ml-5 w-49 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-6">
          <button onClick={start}>start</button>
        </div>


         {/* contest stop button */}
        <div className="ml-5 w-49 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-6">
          <button onClick={()=>{
              setstatus("finish");
             { start()}
             setCountDown(1);
          }}>stop</button>
        </div>

      </div>
 




      {/* wpm and accuracy will be shown if contest is ended status ...finish.. */}
      {status === "finish" && (
        <div className=" flex justify-center ...">
       
            <div className=" text-purple-600 mr-20 mt-10  text-2xl font-medium tracking-normal">WPM : {Correct}</div>

            <div className="text-purple-600 ml-20 mt-10  text-2xl font-medium tracking-normal" >Accuracy : {Math.round((Correct / (Correct + Incorrect)) * 100)}%</div>
      
        </div>
      )}



    </>
  );
}

export default Type_logic;
