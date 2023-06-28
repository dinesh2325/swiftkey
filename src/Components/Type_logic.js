import { useState, useEffect, useRef } from "react";       //imported for focus on input
import { generate } from 'random-words';                  //random-words is npm package ....generate()... generate random word

import { useSpeechSynthesis } from 'react-speech-kit';    //libarary for producing sound

import Type from './Type.css';
import index from '../index.css'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import axios from "axios";
import Profile from "../Profile/Profile";





const NUMB_OF_WORDS = 150;                                //max word in paragraph


const Type_logic = () => {

  const [me, setMe] = useState("");


  const { userid } = useParams();

  const navigate = useNavigate();

  const goToProfile = () => {
    if (userid != "")
      navigate("/Profile/" + userid);
  }

  //for timer custmization
  const [TimerChanger, setTimeChanger] = useState(60);

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
          if (pre === 0) {
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
    else {
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

  function getwordClass(wordIdx) {
    if (wordIdx === currWordIndex) return "worddd";
  }

  const findname = () => {
    axios.get(`http://localhost:9002/${userid}`) //yeh link me jo store hai isme mil jaygei
      .then(response => {
        setMe(response.data);

        console.log("i m here")
      })
      .catch(error => {
        console.log(error);
      });
  }

  const mywpm = () => {
    try {
      axios.post(`http://localhost:9002/updateProfile/${userid}`, { Correct })
        .then(res => {
          console.log("updated");
          console.log(res.data);
        })
        .catch(e => {
          alert("oops")
        })
    }
    catch (error) {
      console.log(error);
    }
  }




  return (
    <>



      {/* these will  work for only for logged user not for guest */}
      {userid && (findname()) && ({ me })}





      <>
      
          {/*TimerChanger is initialy 60 and that can be changed with select target,,,,
after setting TimerChanger value we assign it to cuntdouwn,,,,,,,,,,,,,
 jo settimeinterval se decrease ho to jata hai */}
 <div className="flex item justify-center">
          {/* timer_custmizer */}
          <div className="mt-16 mr-72 w-49">
           
            <select className=" h-8 w-28 font-semibold bg-gradient-to-r from-yellow-300 to-purple-500 hover:from-pink-500 hover:to-red-500 focus:from-pink-500 focus:to-red-500 rounded"name="Timer" id="Timer" onClick={(event) => {
              setTimeChanger(event.target.value)
              //value of counter get updated through Timer dropdown
              if (status != "started") {
                setCountDown(event.target.value);
              }
            }
            }> <option value="60">SetTimer</option>
              <option value="60">  1 Minutes</option>
              <option value="120"> 2 Minutes</option>
              <option value="180"> 3 Minutes</option>
              <option value="300"> 5 Minutes </option>
            </select>
          </div>


          {/*timer component*/}
           <div className="mt-9 ml-40 mr-40">
            <h2 className="box-content  p-4 border-2 rounded-lg ... px-2 py-2 text-gray-100 text-3xl">
              {countDown}</h2>
          </div>

            {/* profile button */}
          <div className="h-5 mt-16  ml-72">{userid && (<Button variant="contained" color="success" className='bg-gradient-to-r from-yellow-300 to-purple-500 hover:from-pink-500 hover:to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-bold py-2 px-4 rounded' onClick={goToProfile}>Profile</Button>)}
          </div>

        </div>




        {/* paragraph  */}
        <div className="flex justify-center ... mt-12">
          <div className="paragraph border-spacing-y-64 box-border h-auto w-10/12 p-4 border-2 rounded-2xl ...  ">
            {words.map((word, i) => (                                  //assign i to every word of words array(random generated)
              <>
                <span className="font-serif text-2xl font-medium tracking-normal " key={i}>
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

            className=" h-15  placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 lg:text-lg sans-serif font-medium  font-samibold tracking-normal mt-7 mr-5" placeholder="Write here" />
        </label>








        {/* contest start button */}
        <div className=" flex items-center h-12 ml-5 mr-5 text-xl w-28 mt-6 bg-gradient-to-r from-yellow-300 to-purple-500 hover:from-pink-500 hover:to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-bold py-2 px-9 rounded">
          <button onClick={start}>start</button>
        </div>


        {/* contest stop button */}
        <div className=" flex items-center h-12 text-xl w-28 mt-6 bg-gradient-to-r from-yellow-300 to-purple-500 hover:from-pink-500 hover:to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-bold py-2 px-9 rounded">

          <button onClick={() => {
            setstatus("finish");
            { start() }
            setCountDown(1);
          }}>stop</button>
        </div>

      </div>





      {/* wpm and accuracy will be shown if contest is ended status ...finish.. */}
      {status === "finish" && (
        <div className=" flex justify-center ...">

          <div className=" text-purple-600 mr-20 mt-10  text-2xl font-medium tracking-normal">WPM : {Correct}</div>

          <div className="text-purple-600 ml-20 mt-10  text-2xl font-medium tracking-normal" >Accuracy : {Math.round((Correct / (Correct + Incorrect)) * 100)}%</div>


          {/* for saving wpm of the logged user in db */}
          {userid && (mywpm())}

        </div>
      )}

    </>
  );
}

export default Type_logic;