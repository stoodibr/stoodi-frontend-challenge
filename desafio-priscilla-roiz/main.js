let question = document.getElementById('exercise_text');
let questionId = document.getElementById('exercise_id');
let alternatives = document.getElementById('alternatives');

const answerFeedbackContent = document.querySelector (".answer-content");
const resetButton = document.getElementById('answer-button')
const questionForm = document.getElementById("question_form");

function loadQuestion() {

	let choicesHtml;
	fetch("https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/", {method: 'GET'})
		.then((response) => response.json())

		.then((r) => {
			question.innerHTML = r.exercise.exercise_text;
			question.setAttribute('id', r.exercise.exercise_id);
			questionId.setAttribute('value', r.exercise.exercise_id);

			choicesHtml = r.exercise.alternatives.map(alternative => {
				let alternativeHTML = `<li> <label> <input name="choice" type=radio value="${alternative.letter}"> 
				<span class="answer-text"> ${alternative.letter}. ${alternative.label} </span> </label> </li>`
				return alternatives.innerHTML = alternativeHTML;

				
			})
		alternatives.innerHTML = choicesHtml.join('');
		resetChoices();
	})
}

async function checkAnswerJSON(form) {
	const response = await fetch("https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/", form);
	return await response.json();
}

questionForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const formData = new FormData(e.target);

	let postForm = {
		method: 'POST',
		body: JSON.stringify({
			'exercise_id': parseInt(formData.get('exercise_id')),
			'choice': formData.get('choice')
		})
	};
	
	checkAnswerJSON(postForm).then((body) => showAnswer(body.is_correct))
});

function showAnswer(isCorrect) {
	const msgs = {
		true : {
			header: 'Resposta correta',
			msg: 'Boa! Acertou em cheio.',
			class: 'alternative-correct'
		},
		false: {
			header: 'Resposta incorreta',
			msg: 'Que tal tentar novamente?',
			class: 'alternative-wrong'
		}
	}

	const answerFeedback = document.getElementById("answer-feedback")
	const answerFeedbackMsg = document.getElementById("answer-feedback-msg")
	const selectedChoice = document.querySelector('input[name="choice"]:checked').parentElement
	const selectedMsg = msgs[isCorrect]

	answerFeedback.innerHTML = selectedMsg.header
	answerFeedbackMsg.innerHTML = selectedMsg.msg
	
	answerFeedback.classList.add('answered')
	answerFeedbackMsg.classList.add('answered')
	answerFeedbackContent.classList.add(selectedMsg.class)
	selectedChoice.classList.add(selectedMsg.class)

	if (isCorrect == true){
		resetButton.value = 'Próxima';
		}else{
			resetButton.value = 'Refazer';
			questionForm.addEventListener('submit', location.reload.bind(location))
		}
	}

function resetChoices() {
	const choices = document.getElementsByName("choice")
	resetButton.setAttribute('disabled', true)
	
	choices.forEach((choice) => choice.addEventListener('click', function(e) {
		
		resetButton.removeAttribute('disabled', false)
		choices.forEach((c) => {
			c.parentElement.classList.remove("alternative-correct", 
			"submit-correct", "alternative-wrong", "submit-wrong" )
			answerFeedbackContent.classList.remove("alternative-wrong", "alternative-correct")
			
		})
	}))
} 

loadQuestion();
resetChoices();
