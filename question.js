let url = 'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/';
let question_json = fetchUrl()
let current_exercise;

async function fetchUrl()
{
    let response = await fetch(url)
    if(response.ok)
    {
        let json = await response.json()
        current_exercise = {
            exercise_id: json.exercise.exercise_id, 
            question_text: json.exercise.exercise_text, 
            institution: json.exercise.institution, 
            alternatives: json.exercise.alternatives,
            choice: null
        }
        fillQuestion()
    }
}

function fillQuestion()
{
    document.getElementById("question-text").innerHTML = current_exercise.question_text
    document.getElementById("question-institution").innerHTML = current_exercise.institution
    
    fillAlternatives(current_exercise.alternatives)
}

function fillAlternatives(alternatives)
{
    for(let i=0; i < alternatives.length; i++)
    {
        document.getElementById('alt-' + alternatives[i].letter + '-label').firstChild.textContent = alternatives[i].letter + '.'
        document.getElementById('alt-' + alternatives[i].letter + '-label').firstChild.nextSibling.textContent = alternatives[i].label
    }
}

function toggleButton()
{
    document.getElementById("verify-answer").removeAttribute('disabled')
}

async function verifyAnswer()
{
    let exercise = {
        exercise_id: current_exercise.exercise_id,
        choice: getSelectedAlternative()
    };
    
    let response = await fetch('https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(exercise)
    });
    
    let result = await response.json();
    
    if(result.is_correct)
    {
        changeLayoutRight(exercise.choice)
    }
    else
    {
        changeLayoutWrong(exercise.choice)
    }
}

function getSelectedAlternative()
{
    if(document.getElementById('alt-a').checked)
    {
        return 'a'
    }
    else if(document.getElementById('alt-b').checked)
    {
        return 'b'
    }
    else if(document.getElementById('alt-c').checked)
    {
        return 'c'
    }
    else if(document.getElementById('alt-d').checked)
    {
        return 'd'
    }
}

function changeLayoutRight(alternative)
{
    let alternativeElement = document.getElementById('alt-'+alternative).parentElement
    let navigationDiv = document.getElementById('navigation')

    alternativeElement.classList.add('question-alternative-correct')
    alternativeElement.classList.remove('before-submit')
    alternativeElement.classList.add('after-submit-correct')

    navigationDiv.classList.add('question-alternative-correct')

    changeNavigationElements('next-question', function(event){}, 'Próximo')
}

function changeLayoutWrong(alternative)
{
    let alternativeElement = document.getElementById('alt-'+alternative).parentElement
    let navigationElement = document.getElementById('navigation')

    alternativeElement.classList.add('question-alternative-wrong')
    alternativeElement.classList.remove('before-submit')
    alternativeElement.classList.add('after-submit-wrong')

    navigationElement.classList.add('question-alternative-wrong')

    changeNavigationElements('redo-question', function(event) { redoQuestion() }, 'Refazer')
}

function changeNavigationElements(id, onclick, buttonText)
{
    let feedbackText = document.createElement('p')
    let newButton = document.createElement('button')
    let feedbackElement = document.getElementById('feedback-box')
    let verifyButton = document.getElementById('verify-answer')

    feedbackElement.classList.remove('single-button-nav')
    feedbackText.id = 'feedback-message'
    feedbackText.innerHTML = '<strong>Resposta incorreta</strong><br>Que tal tentar novamente?'
    newButton.id = id
    newButton.onclick = onclick
    newButton.innerHTML = buttonText
    verifyButton.remove()
    feedbackElement.appendChild(feedbackText)
    feedbackElement.appendChild(newButton)

    document.getElementsByName('alternative').forEach(alternative => { alternative.disabled = true;})
}

function redoQuestion()
{
    let alternativeElement = document.getElementById('alt-' + getSelectedAlternative()).parentElement
    let feedbackText = document.getElementById('feedback-message')
    let oldButton = document.getElementById('redo-question')
    let feedbackElement = document.getElementById('feedback-box')
    let navigationElement = document.getElementById('navigation')
    let newButton = document.createElement('button')

    feedbackText.remove()
    oldButton.remove()
    clearAlternatives()
    alternativeElement.classList.remove('question-alternative-wrong')
    alternativeElement.classList.remove('after-submit-wrong')
    navigationElement.classList.remove('question-alternative-wrong')
    
    feedbackElement.classList.add('single-button-nav')
    alternativeElement.classList.add('before-submit')

    newButton.id = 'verify-answer'
    newButton.onclick = function(event){ verifyAnswer() }
    newButton.innerHTML = 'Verificar resposta'
    newButton.setAttribute('disabled', true)
    feedbackElement.appendChild(newButton)
}

function clearAlternatives()
{
    document.getElementsByName('alternative').forEach(alternative => { alternative.disabled = false })
    document.getElementsByName('alternative').forEach(alternative => { alternative.checked = false })
}