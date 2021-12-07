const url = 'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/';
let questionsJson = fetchAPI();
let exercises;

async function fetchAPI () {
    
    let response = await fetch(url);

    if(response.ok) {
        
        let question = await response.json();

        exercises = {
            exercise_id: question.exercise.exercise_id,
            text: question.exercise.exercise_text,
            institution: question.exercise.institution,
            options: question.exercise.alternatives,
            choice: null
        }
        
        completeExercise();
    }
}

const completeExercise = () => {
    
    document.getElementById('institution').innerHTML += exercises.institution;

    document.getElementById('question-text').innerHTML += exercises.text;

    completeOptions();
}

const completeOptions = () => {

    output = ' ';

    for (let i = 0; i < exercises.options.length; i++){
        output +=
        `<li><p><input type="radio" name="alternative" id="${exercises.options[i].letter}" onclick="buttonValidate()"/><span class="option"><span class="value">${exercises.options[i].letter}.</span>${exercises.options[i].label}</span></p></li>`
    };

    document.getElementById('question-options').innerHTML += output;
}

async function answerQuestion () {
    
    let question = {
        exercise_id: exercises.exercise_id,
        choice: selectedOption()
    };

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(question)
    });

    console.log(question);
    
    let answer = await response.json();
    console.log (answer);

    if(answer.is_correct) {
        alert('uhu!');
    }
}

const selectedOption = () => {
    for (let i = 0; i < exercises.options.length; i++){
        let choice = exercises.options[i].letter

        if(document.getElementById(choice).checked){
            return choice
        }
    }
}

const buttonValidate = () => {
    document.getElementById('btn').removeAttribute('disabled');
}