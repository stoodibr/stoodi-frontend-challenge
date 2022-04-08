import React, { useEffect, useState } from 'react'
import './question.scss'
import { Center } from '../style'
import { apiRequest } from '../../services/config-https'
import { QuestionProps } from '../../interfaces/Question'

export const Question = () => {
    const [question, setQuestion] = useState<QuestionProps>();
    const [textBtn, setTextBtn] = useState('');
    const [answerResult, setAnswerResult] = useState('');
    const [answered, setAnswered] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loadingAwnser, setLoadingAwnser] = useState(false);
    const [optionSelected, setOptionSelected] = useState(false);
    const [chosenAnwser, setChosenAnwser] = useState('');
    const [disableOptions, setDisableOptions] = useState(false);
    const [statement, setStatement] = useState('');

    useEffect(() => {
        setAnswerResult('')
        setAnswered(false)
        setTextBtn('VERIFICAR RESPOSTA')
        setLoading(true)
        apiRequest.get(`dev/`)
            .then((response) => {
                const { data } = response;
                setQuestion(data)
                setLoading(false)
                let QuestionOriginal = data.exercise.exercise_text
                setStatement(QuestionOriginal.replace('<i>', '<br/> <i>'))
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            });
    }, [])

    const selectOption = () => {
        setOptionSelected(true)
    }

    const responseQuestion = async () => {
        setLoadingAwnser(true)
        if (answered === true) {
            window.location.reload()
        } else {
            await apiRequest.post(`dev/`, {
                "exercise_id": question?.exercise.exercise_id,
                "choice": chosenAnwser
            })
                .then((response) => {
                    const { data } = response;
                    if (data.is_correct === true) {
                        setDisableOptions(true)
                        setAnswerResult('correct')
                        setTextBtn('PRÓXIMO')
                        let opcaoEscolhida = document.querySelector(`#${chosenAnwser}`)
                        opcaoEscolhida?.classList.add('correctly');
                        setAnswered(true)
                        setLoadingAwnser(false)

                    } else {
                        setDisableOptions(true)
                        setAnswerResult('incorrect')
                        setTextBtn('REFAZER')
                        let opcaoEscolhida = document.querySelector(`#${chosenAnwser}`)
                        opcaoEscolhida?.classList.add('error')
                        setAnswered(true)
                        setLoadingAwnser(false)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            {loading ?
                <div id="loading">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

                :
                <>
                    <div id="question-area">
                        <Center>
                            <div>
                                <p style={{ textAlign: 'left' }}
                                    dangerouslySetInnerHTML={{ __html: statement }}
                                />
                            </div>

                        </Center>
                    </div>
                    <div id="alternatives">
                        <Center>
                            <article id='options'>
                                {question?.exercise.alternatives.map((object, key) => {
                                    return (
                                        <div className='option-area' id={`${object.letter}`} key={key}>
                                            <label>
                                                <input className="input-radio" disabled={disableOptions === true ? true : false} type="radio" value={object.letter} onChange={(e) => setChosenAnwser(object.letter)} onClick={(e) => selectOption()} name="light" />
                                                <span className="design"></span>
                                                <span className="text" id={`option${object.letter}`}>{object.letter}. {object.label}</span>
                                            </label>
                                        </div>
                                    )
                                })}

                            </article>
                        </Center>
                    </div>
                    <div id="response">
                        <div id="layout-size" className={answered === true ? answerResult === 'correct' ? 'correct-box' : 'incorrect-box' : ''}>
                            <div id="result-text" >
                                {loadingAwnser === true ?
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    : null}
                                {answered === true && loadingAwnser === false ?
                                    answerResult === 'correct' ?
                                        <>
                                            <p>Resposta correta</p>
                                            <p>Boa! Acertou em cheio.</p>
                                        </>
                                        :
                                        <>
                                            < p > Resposta incorreta</p>
                                            <p>Que tal tentar novamente?</p>
                                        </>
                                    : null}

                            </div>
                            <button type='button' disabled={optionSelected === true ? false : true} onClick={responseQuestion} id="btn-response">{textBtn}</button>
                        </div>
                    </div>
                </>
            }
        </>

    )
}