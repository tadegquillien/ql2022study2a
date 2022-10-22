//manages the page for the probability understanding check
//this component is called 1+N times, where N is the number of
//colored balls that the fictitious player draws
//the first time is a simple instructions message
//all other N times, the participant is asked about the
//causal strength of one colored ball that was drawn

import React, { useState, useRef } from 'react';
import Likert from 'react-likert-scale';
import './CheckPhase.css';
import TestImage from './TestImage';
import Data from './Data';
import { likertChoicesTest } from './likertScale';
import { urn_letters } from './gameParameters';
import { buttonStyle } from './dimensions';

import {
    circle_ids, color_palette, mode, urn_ids, PROBS, colors, actualWorld,
    threshold
} from './gameParameters'



const ProbabilityCheck = (props) => {
    
    //keeps track of the participant's response to the causal question
    const [response, setResponse] = useState("unclicked");

   
    //the ID of the urn that the current question is about
    const urnID = props.check_ids[props.checkNumber - 1];
    //the letter displayed next to that urn
    const questionLetter = urn_letters[props.shuffledUrnIds.indexOf(urnID)];
    

    const handleChange = (e) => {
        setResponse(e.target.value);
    }
    //when the participant clicks on the likert scale, a button appears that allows one to go
    //to the next trial
    const nextTrialButton =  <button style={buttonStyle}
    onClick={() => handleClick()}>
        NEXT {'>'}{'>'}</button>;
    //when the participant clicks to go to the next page, 
    //record his response, and go to the next trial
    const handleClick = () => {
        Data.probability.push(
            {
                //the test number (e.g. 1 if this was the first question asked)
                trial: props.checkNumber,
                //the letter displayed next to the urn
                letter: questionLetter,
                //the participant's response (our main DV)
                response: response,
                //the urn ID (this is the one that matters most for data analysis)
                urnID: urnID
            }
        );
        console.log(Data);
        props.incrementCheck(props.checkNumber);      
    }
    
    
    
    //the question 
    const causalQuestion = <span className="causalQuestion">
       
        <h3 text-align="center">Imagine that a player randomly draws from box {questionLetter} 20 times.</h3>
        <h3 text-align="center">(After each time, he puts the ball back in the box.)</h3>
        <h3 text-align="center">On average, out of 20 draws, how many times would he get a colored ball?</h3>

        <input type="number" min="0" max="20" style={{fontSize:"25px"}}
        onChange={(e)=>handleChange(e)}></input>
        <br></br><br></br>
        <div>{nextTrialButton}</div>
        
        
        
        
    </span>

    const introductionStyle =  {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginLeft: "20vw",
            marginRight: "20vw",
            }
    
    //this text is displayed at the beginning of the phase, before the first trial
    const introduction = <div style={{backgroundColor: "lightgrey"}}>
        <div style={introductionStyle}>
        <h3>
            The next set of questions are about the game in general. <br></br>
            For each box, we will ask how likely it is to draw a colored ball. <br></br>
            (Keep in mind that there are 20 balls in total in each box.)
        </h3>
        <button style={buttonStyle}
    onClick={() => handleClick()}>
        click to continue</button>
        <br></br>
        </div>;
    </div>

    //if this is the beginning of the phase, display the introduction, otherwise
    //display the causal question
    const probe = props.checkNumber > 0 ? causalQuestion : introduction;
    
    //display the urns
    const img = <TestImage ballColorsList = {props.ballColorsList} phase={props.phase} 
    testNumber={props.checkNumber} test_ids={props.check_ids} shuffledUrnIds={props.shuffledUrnIds}/>;

    return (
        <span className="metaContainer">
            {probe}
            <span className="containerTest">
                <div className="scoreboardTest">
                    
                </div>
                <div className="urnsTest" >{img}</div>
                
            </span>
            
        </span>
        
        

    )

}


export default ProbabilityCheck;

