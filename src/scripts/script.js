let requestURL = 'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = () => {
    let exercises = request.response;
    
    let text = (exercises.exercise.exercise_text);
    let institution = (exercises.exercise.institution);
    let alternatives = (exercises.exercise.alternatives);

    console.log(text, institution, alternatives);

    console.log(alternatives.length);
    console.log(exercises.exercise.alternatives[0]);

    let output = ' ';

    for (let i = 0; i < alternatives.length; i++){
        output +=
        `<li><p><input type="radio" name="alternative" id="input" /><span class="option"><span class="value">${alternatives[i].letter}.</span>${alternatives[i].label}</span></p></li>`
    };

    console.log(output);

    document.getElementById('question-options').innerHTML += output;
    document.getElementById('question-text').innerHTML += text;
    document.getElementById('institution').innerHTML += institution;
}