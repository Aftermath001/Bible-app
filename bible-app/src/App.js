import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react'

function App() {
  
  return (
    <div className="container">
      <h1>BIBLE TRIVIA </h1>
      <div className="card m-5">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>SCRIPTURE TEXT from the Bible</p>
              <footer className="blockquote-footer">
                <cite>Book Name ?</cite>
              </footer>
            </blockquote>
          </div>
      </div>
      <form className="form-group">
        <div className="container">
          <div className="d-flex">
            <select>
              <option>All Books</option>
              <option>Old Testament</option>
              <option>New Testament</option>

            </select>
            <button className="btn btn-primary">Generate Bible Verse</button>
            <button className="btn btn-info">Answer</button>
          </div>
         
        </div>
      </form>

      <div className="row text-center mt-5">
        <h4> YOUR ANSWER: User Answer</h4>
        <FontAwesomeIcon icon={faCheckCircle} className="fas fa-check-circle fa-5x text-success" /> 
        <small><i> 1st John 5:5</i></small>
      </div>
    </div>
  );
}

export default App;
