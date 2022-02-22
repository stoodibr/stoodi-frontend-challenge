import type { GetStaticProps } from 'next';
import axios from 'axios';
import Head from 'next/head';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { QuestionForm } from '../components/QuestionForm';

import styles from '../styles/Home.module.scss';

interface IExercise {
  exercise: {
    exercise_id: number;
    exercise_text: string;
    institution: string;
    alternatives: IAlternatives[];
  };
}

interface IAlternatives {
  letter: string;
  label: string;
}

export default function Home(props: IExercise) {
  return (
    <>
      <Head>
        <title>Home | Stoodi Challenge</title>
      </Head>

      <Header />

      <main className={styles.contentContainer}>
        <section className={styles.exerciseContent}>
          <h1>{props.exercise.institution}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: props.exercise.exercise_text }}
          />
          <QuestionForm exercise={props.exercise} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let exercises;

  try {
    const response = await axios.get(
      'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/',
    );

    exercises = response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      exercises = {};
    }
  }

  return {
    props: exercises,
    revalidate: 60 * 60 * 8,
  };
};
