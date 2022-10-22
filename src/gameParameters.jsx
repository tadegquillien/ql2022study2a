import { shuffle } from './convenienceFunctions';

//the validation code to be entered in prolific. It should range from 4000 to 8000
export const validationCode = Math.round(Math.random()*4000 + 4000);
//a list of IDs for all balls within an urn
export const circle_ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
//the colors used for the balls. Colors toward the end of the array earn more points
//export const color_palette = shuffle(["#FF0000", "#00FF00", "#0000FF"]);
export const color_palette = shuffle(["#FFFF00", "#FF00FF", "#00FFFF"]);
//export const color_palette = ["#F77B25", "#F5CC6E", "#F77B25", "#F81203"];


//controls whether the outcomes of the rounds played during the Training phase are
//predetermined (when mode="predetermined"), or randomly generated during the phase
// itself (when mode="probabilistic")
export const mode = "predetermined";
//a list with an ID for each urn
export const urn_ids = [1, 2, 3];
//a list with an ID for each trial of the Training phase
const trial_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//the letters that will label the urns
export const urn_letters = ['A', 'B', 'C']
//the proportion of colored balls in each urn
export const PROBS = [.05, .5, .95];
//the causal power of the colored balls in an urn (e.g. 4 is the number of points from a red ball)
export const colors = [1, 1, 1];


//this function takes as input an array with yes/no information on whether
//a colored ball was drawn from each urn, and outputs an array with the number
//of points given by each urn (so, for instance, if each urn gives 3 points, the input
//array [0,0,1,0,1] will yield [0,0,3,0,3])
const timesPower = (array) => {
    return (
        urn_ids.map((i) => {
            let color = colors[i - 1];
            let binary = array[i - 1];
            return (color * binary);
        })
    )
}

//the outcome of the game observed by the participant in the Test phase
//this is a list of the points that the fictional player got from each urn
export const actualWorld = timesPower([1,1,1]);



//the required minimum amount of points to win the game
//depending on the condition, this will be 6 or 8
export const threshold = 2;
export const condition = threshold === 1 ? "easy" : threshold === 2 ? "intermediate" : threshold === 3 ? "difficult" : NaN;

//the code below pseudo-randomly generates the outcome of the games played
//by the participant during the training phase. 
//each game is randomly determined, with the constraint that for each urn,
//the participant draws N colored balls in 10 rounds, where N is the number of
//colored balls in that urn. This procedure ensures that the sequences of draws that
//the participant is exposed to are not too unrepresentative of the probability distribution

//for each urn, generate and shuffle a sequence of draws, where a colored ball is drawn
//N times, with N = the number of colored balls in that urn

const firstUrn = Math.random() > .5 ? 1 : 0;
const thirdUrn = Math.random() > .5 ? 1 : 0;

const urnSequences = [
    
    shuffle([0,0,0,0,0,0,0,0,0,firstUrn]),
    shuffle([0,0,0,0,0,1,1,1,1,1]),
    shuffle([1,1,1,1,1,1,1,1,1,thirdUrn])
]

//convert the urn sequences above into an array that contains ten arrays,
//each containing one outcome of the game (i.e. a sequence of draws from each urn)
export const trainingGames = 
        trial_ids.map((ii)=> {
        return(timesPower(urn_ids.map((i)=>{
            return(urnSequences[i-1][ii-1])
        })
        ))
    }

    )
;
