//this object records the participant data

const Data = {
    //the participant's Prolific ID
    prolificId: [],
    //the answer to the comprehension question
    comprehension:[],
    //the participant's scores during the Training phase
    scores:[],
    //how difficult the participant found the game
    difficulty: [],
    //the main DV: the participant's answers to the causal questions
    responses:[],
    //the answers to the probability questions
    probability:[],
    //the answers to demographic questions
    demographics:[]
  };

export default Data;