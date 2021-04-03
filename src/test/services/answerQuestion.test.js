test('Enviar resposta e verificar retorno da propriedade is_correct', () => {
  const answer = { exercise_id: 3473, choice: 'a' };

  expect(answerQuestion(answer)).toHaveProperty('is_correct');
});

test('Enviar resposta incorreta e receber false', () => {
  const answer = { exercise_id: 3473, choice: 'a' };

  expect(answerQuestion(answer)).toHaveProperty('is_correct', false);
});

test('Enviar resposta correta e receber true', () => {
  const answer = { exercise_id: 3473, choice: 'b' };

  expect(answerQuestion(answer)).toHaveProperty('is_correct', true);
});
