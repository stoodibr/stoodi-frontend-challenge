import axios from 'axios';

export default async function getQuestion() {
  const question = await axios
    .get('https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/')
    .then((res) => res.data);
  return question;
}
