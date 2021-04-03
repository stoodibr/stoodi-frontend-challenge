import answerQuestion from '../../services/answerQuestion';

test('Enviar resposta e verificar retorno da propriedade is_correct', async () => {
  const answer = { questionId: 3473, questionChoice: 'a' };

  expect(await answerQuestion(answer)).toHaveProperty('is_correct');
});

test('Enviar resposta incorreta e receber false', async () => {
  const answer = { questionId: 3473, questionChoice: 'a' };

  expect(await answerQuestion(answer)).toHaveProperty('is_correct', false);
});

test('Enviar resposta correta e receber true', async () => {
  const answer = { questionId: 3473, questionChoice: 'b' };

  expect(await answerQuestion(answer)).toHaveProperty('is_correct', true);
});
