import axios from 'axios';

export default async function answerQuestion({ questionId, questionChoice }) {
  const result = axios
    .post('https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/', {
      exercise_id: questionId,
      choice: questionChoice,
    })
    .then((res) => res.data);
  return result;
}
