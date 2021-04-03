import getQuestion from '../../services/getQuestion';

test('Deve retornar a pergunta com as respostas', async () => {
  const questionData = await getQuestion();
  expect(questionData).toHaveProperty('exercise.exercise_id', 3473);
  expect(questionData).toHaveProperty(
    'exercise.exercise_text',
    '<p>Assinale a alternativa que apresenta a raiz da equação abaixo: <i>2x - 7 = 9</i></p>',
  );
  expect(questionData).toHaveProperty('exercise.institution', 'Stoodi');
});
