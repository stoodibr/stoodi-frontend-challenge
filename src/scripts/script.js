const url = 'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/';
let questionsJson = fetchAPI();
let exercises;
let button = document.getElementById('btn');
let answer_position;

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
        `<li id="alternativa-${exercises.options[i].letter}"><p><input type="radio" name="alternative" id="${exercises.options[i].letter}" onclick="buttonValidate()" class="before-check"/><span class="option"><span class="value">${exercises.options[i].letter}.</span>${exercises.options[i].label}</span></p></li>`
    };

    document.getElementById('question-options').innerHTML += output;
    button.innerHTML = 'Verificar questão';
}

button.onclick = () => {
    if (button.innerText == "REFAZER") {
        clear();
        button.classList.remove('button-validate');
        button.disabled = true;
    } else if (button.innerText == "PRÓXIMO") {
        button.disabled = true;
    } else {
        answerQuestion();
    }
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
    
    answer_position = `alternativa-${question.choice}`;
    let answer = await response.json();

    if (answer.is_correct) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
}

const selectedOption = () => {
    for (let i = 0; i < exercises.options.length; i++) {
        let choice = exercises.options[i].letter;

        if(document.getElementById(choice).checked) {
            return choice
        }
    }
}

const buttonValidate = () => {
    document.getElementsByName("alternative").forEach(element => {
        if (!element.checked) {
            button.classList.add('button-validate');
            button.removeAttribute('disabled');
        }
    }) 
}

const rightAnswer = () => {

    document.getElementById('feedback').innerHTML = 'Resposta correta';
    document.getElementById('message').innerHTML = 'Boa! Acertou em cheio.';

    document.getElementById('answer').classList.add('answer-right');
    document.getElementById(answer_position).classList.add('certo');    
    document.getElementById(answer_position).classList.add('answer-right'); 

    document.getElementsByName('alternative').forEach(alternative => {
        if(alternative.checked == false) {
            alternative.disabled = true;
        } 
    });

    button.innerHTML = 'Próximo';   
}

const wrongAnswer = () => {

    document.getElementById('feedback').innerHTML = 'Resposta incorreta';
    document.getElementById('message').innerHTML = 'Que tal tentar novamente?';

    document.getElementById('answer').classList.add('answer-wrong');
    document.getElementById(answer_position).classList.add('answer-wrong');
    document.getElementById(answer_position).classList.add('errado');

    document.getElementsByName('alternative').forEach(alternative => {
        if(alternative.checked == false) {
            alternative.disabled = true;
        } 
    });

    button.innerHTML = 'Refazer';
}

function clear () {

            document.getElementsByName('alternative')
            .forEach(alternative => { 
                alternative.checked = false;
                alternative.disabled = false;   

                document.getElementById('answer').classList.remove('answer-wrong');
                document.getElementById(answer_position).classList.remove('answer-wrong');
                document.getElementById(answer_position).classList.remove('errado');
                
                document.getElementById('feedback').innerHTML = '';
                document.getElementById('message').innerHTML = '';
                button.innerHTML = 'Verificar questão';
            });
}
