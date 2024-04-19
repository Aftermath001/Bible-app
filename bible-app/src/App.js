import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {useState} from 'react'

function App() {
  const [searchFilter, setSearrchFilter] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [rightAnswer, setRightAnswer] = useState(true)
  const [currentVerse, setCurrentVerse] = useState({
    book_name:"John",
    chapter:3,
    verse:16,
    text:"For God so loved the world, that He gave His one and only Son, that whoever believes in Him will not perish, but have eternal life"
  })



  const generateScripture = async (e) => {
    e.preventDefault();
    setShowResults(false)
    // CALL BIBLE API TO get random Verse
    setCurrentVerse({
      book_name:"",
      chapter:1,
      verse:1,
      text:"..."
    })
    //  Random Bible Verse

    var book = "John";
    var chapter = 3;
    var verse = 17;

    const res = await fetch(`https://bible-api.com/${book}${chapter}:${verse}?translation-kjv`);
    const data = await res.json();
    setCurrentVerse({
      book_name:data.verses[0].book_name,
      chapter:data.verses[0].chapter,
      verse:data.verses[0].verse,
      text:data.verses[0].text
    })
    console.log(data);
  }
  const generateAnswer = async (e) =>{
    e.preventDefault();
    const userAnswer = await window.prompt ("Type Your Answer Here...");
    // Compare user input to Bible Verse book name
    setRightAnswer((userAnswer.trim().toLocaleLowerCase() === currentVerse.book_name.trim().toLocaleLowerCase()))
    alert(userAnswer)
    setShowResults(true)

  }
  return (
    <div className="container">
      <h1>BIBLE TRIVIA </h1>
      <div className="card m-5">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{currentVerse.text}</p>
              <footer className="blockquote-footer">
                <cite>Book Name ?</cite>
              </footer>
            </blockquote>
          </div>
      </div>
      <form className="form-group">
        <div className="container">
          <div className="d-flex">
            <select value={searchFilter} onChange={(e)=> setSearrchFilter(e.target.value)}>
              <option value={1}>All Books</option>
              <option value={2}>Old Testament</option>
              <option value={3}>New Testament</option>

            </select>
            <button className="btn btn-primary" onClick={(e)=> generateScripture(e)}>Generate Bible Verse</button>
            <button className="btn btn-info" onClick={(e)=> generateAnswer(e)}>Answer</button>
          </div>
         
        </div>
      </form>
      {showResults && 
          <div className="row text-center mt-5">
            <h4> YOUR ANSWER: User Answer</h4>
            {rightAnswer ? <FontAwesomeIcon icon={faCheckCircle} className="fas fa-check-circle fa-5x text-success" />  : 
            <FontAwesomeIcon icon={faTimesCircle} className="fas fa-check-circle fa-5x text-danger" /> }
            
            <small><i> {currentVerse.book_name} {currentVerse.chapter} : {currentVerse.verse}</i></small>
          </div>

      }
      
    </div>
  );
}

export default App;
