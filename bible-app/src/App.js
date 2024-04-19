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

  const [bible] = useState([
    { book:"Genesis",   chapters:50 },
    { book:"Exodus",    chapters:40},
    { book:"Leviticus", chapters:27},
    { book:"Numbers",   chapters:36},
    { book:"Deuteronomy", chapters:34},
    { book:"Joshua",      chapters:24},
    { book:"Judges", chapters:21},
    { book:"Ruth",   chapters:4},
    { book:"1 Samuel", chapters:31},
    { book:"2 Samuel", chapters:24},
    { book:"1 Kings", chapters:22},
    { book:"2 Kings", chapters:25},
    { book:"1 Chronicles", chapters:29},
    { book:"2 Chronicles", chapters:36},
    { book:"Ezra", chapters:10},
    { book:"Nehemiah", chapters:13},
    { book:"Esther", chapters:10},
    { book:"Job",    chapters:42},
    { book:"Psalms", chapters:150},
    { book:"Proverbs", chapters:31},
    { book:"Ecclesiastes", chapters:12},
    { book:"Song of Solomon", chapters:8},
    { book:"Isaiah", chapters:66},
    { book:"Jeremiah", chapters:52},
    { book:"Lamentations", chapters:5},
    { book:"Ezekiel", chapters:48},
    { book:"Daniel", chapters:12},
    { book:"Hosea", chapters:14},
    { book:"Joel", chapters:3},
    { book:"Amos", chapters:9},
    { book:"Obadiah", chapters:1},
    { book:"Jonah", chapters:4},
    { book:"Micah", chapters:7},
    { book:"Nahum", chapters:3},
    { book:"Habakkuk", chapters:3},
    { book:"Zephaniah", chapters:3},
    { book:"Haggai", chapters:2},
    { book:"Zechariah", chapters:14},
    { book:"Malachi", chapters:4},
    { book: "Matthew", chapters:28 },
    { book: "Mark", chapters:16 },
    { book: "Luke", chapters:24 },
    { book: "John", chapters:21 },
    { book: "Acts", chapters:28 },
    { book: "Romans", chapters:16 },
    { book: "1 Corinthians", chapters:16 },
    { book: "2 Corinthians", chapters:13 },
    { book: "Galatians", chapters:6 },
    { book: "Ephesians", chapters:6 },
    { book: "Philippians", chapters:4 },
    { book: "Colossians", chapters:4 },
    { book: "1 Thessalonians", chapters:5 },
    { book: "2 Thessalonians", chapters:3 },
    { book: "1 Timothy", chapters:6 },
    { book: "2 Timothy", chapters:4 },
    { book: "Titus", chapters:3 },
    { book: "Philemon", chapters:1 },
    { book: "Hebrews", chapters:13 },
    { book: "James", chapters:5 },
    { book: "1 Peter", chapters:5 },
    { book: "2 Peter", chapters:3 },
    { book: "1 John", chapters:5 },
    { book: "2 John", chapters:1 },
    { book: "3 John", chapters:1 },
    { book: "Jude", chapters:1 },
    { book: "Revelation", chapters:22 }
  ])


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
    let i = 0;
    // All Books in the bible
    if (searchFilter == 1) i = Math.floor(Math.random()*65 + 1); 
    // Old Testament Books
    if (searchFilter == 2) i = Math.floor(Math.random()*38 + 1); 
    // New Testament Books
    if (searchFilter == 3) i = Math.floor(Math.random()*26 + 38); 
   
    let Biblebook = bible[i]
    let chapter = Math.floor(Math.random()*Biblebook.chapters + 1)
    let verse   = ( chapter === 117 ? 2 : Math.floor(Math.random()*8 + 1))


    const res  = await fetch(`https://bible-api.com/${Biblebook.book} ${chapter}:${verse}?translation=kjv`) 
    const data = await res.json();
    const newScripture = {
      book_name : data.verses[0].book_name,
      chapter   : data.verses[0].chapter,
      verse     : data.verses[0].verse,
      text      : data.verses[0].text
    }

    setCurrentVerse(newScripture);
  }
  const generateAnswer = async (e) =>{
    e.preventDefault();
    const userAnswer = await window.prompt ("Type Your Answer Here...");
    // Compare user input to Bible Verse book name
    setRightAnswer((userAnswer.trim().toLocaleLowerCase() === currentVerse.book_name.trim().toLocaleLowerCase()))
    // alert(userAnswer)
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
