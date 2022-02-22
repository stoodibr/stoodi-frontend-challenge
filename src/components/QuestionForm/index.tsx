import { Formik, Field, Form } from 'formik';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';

import styles from './styles.module.scss';

interface IExercise {
  exercise: {
    exercise_id: number;
    exercise_text: string;
    alternatives: IAlternatives[];
  };
}

interface IAlternatives {
  letter: string;
  label: string;
}

interface IFormSubmit {
  exercise_id: number;
  choice: string;
}

interface IResponse {
  data?: {
    is_correct?: boolean;
  };
}

interface IActionButton {
  type: 'button' | 'submit';
  label: string;
  status?: 'error' | 'success';
}

let inputSelected: HTMLFormElement | null = null;
let inputSelectedError: HTMLFormElement | null = null;

export function QuestionForm({ exercise }: IExercise) {
  const [loading, setLoading] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);
  const [replyReceived, setReplyReceived] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [actionButton, setActionButton] = useState<IActionButton>({
    label: 'Verificar Resposta',
    type: 'submit',
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      if (event.target) {
        setChoiceMade(true);

        if (inputSelected && inputSelected.labels.length >= 1) {
          inputSelected.labels[0].classList.remove(styles.selected);
        }

        inputSelected = event.target;

        inputSelected.labels[0].classList.add(styles.selected);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (values: IFormSubmit) => {
      setLoading(true);

      if (inputSelectedError && inputSelectedError.labels.length >= 1) {
        inputSelectedError.labels[0].classList.remove(styles.error);
      }

      try {
        const response: IResponse = await axios.post(
          'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/',
          values,
        );

        if (response?.data) {
          setReplyReceived(true);
        }

        if (response?.data?.is_correct) {
          setAnswerIsCorrect(response?.data?.is_correct);
          setActionButton({
            label: 'Próximo',
            type: 'button',
            status: 'success',
          });
          inputSelected?.labels[0].classList.add(styles.success);
        } else {
          inputSelected?.labels[0].classList.add(styles.error);
          inputSelectedError = inputSelected;
          setActionButton({
            ...actionButton,
            label: 'Refazer',
            status: 'error',
          });
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }

      setLoading(false);
    },
    [actionButton],
  );

  return (
    <>
      <Formik
        initialValues={{
          exercise_id: exercise.exercise_id,
          choice: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form onChange={handleChange} className={styles.formContent}>
          {exercise.alternatives.map(choice => {
            return (
              <label key={choice.letter}>
                {choice.letter}.{' '}
                <span className={styles.exerciseAnswer}>{choice.label}</span>
                <Field
                  type="radio"
                  id={choice.letter}
                  name="choice"
                  value={choice.letter}
                  disabled={answerIsCorrect}
                />
                <span className={styles.checkmark}></span>
              </label>
            );
          })}
          <div
            className={`${styles.buttonContent} ${
              actionButton.status && styles[actionButton.status]
            }`}
          >
            {replyReceived && answerIsCorrect && (
              <div>
                <strong>Resposta Correta</strong>
                <p>Boa! Acertou em cheio.</p>
              </div>
            )}

            {replyReceived && !answerIsCorrect && (
              <div>
                <strong>Resposta Incorreta</strong>
                <p>Que tal tentar novamente?</p>
              </div>
            )}

            {answerIsCorrect ? (
              <button type={actionButton.type}>{actionButton.label}</button>
            ) : (
              <button type={actionButton.type} disabled={!choiceMade}>
                {actionButton.label}
              </button>
            )}
          </div>
        </Form>
      </Formik>
      {loading && (
        <div className={styles.overlayContainer}>
          <SyncLoader
            color="#36d7b7"
            loading={loading}
            size="15px"
            margin="10px"
          />
        </div>
      )}
    </>
  );
}
