import './principal.css';
import { useEffect, useState } from 'react';
import { checkAnswer, getAsk } from '../services/requests';

/**
 * @name Principal
 * 
 * @author: Daniela Ferreira Feitosa
 * Github: https://github.com/ni-ela
 * 
 * @abstract Group the form page
 */
function Principal() {
  const [ask, setAsk] = useState("");
  const [choice, setChoice] = useState("");
  const [is_correct, setIsCorrect] = useState(0);
  const [disabled, setDisable] = useState(true);

  useEffect(() => {
    getAsk().then((res) => {
      if (res) {
        setAsk(res.exercise);
      }
    })
  }, []);

  function saveChoice(choice) {
    setDisable(false);
    setIsCorrect(0);
    setChoice(choice);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (is_correct === 2) {
      setIsCorrect(0);
      setChoice(null);
    } else {

      checkAnswer(ask.exercise_id, choice).then((res) => {
        setIsCorrect(res.is_correct ? 1 : 2);
      })
    }
  }

  function handleColor(option) {
    if (option === choice) {
      switch (is_correct) {
        case 1:
          return "correct";
        case 2:
          return "wrong";
        default:
          return "normal";
      }

    } else return "";
  }

  function handleButtonLabel() {
    switch (is_correct) {
      case 0:
        return "VERIFICAR RESPOSTA";
      case 1:
        return "PRÓXIMO";
      case 2:
        return "REFAZER";
      default:
        return "";
    }
  }

  return (
    <form id="principal" onSubmit={(e) => handleSubmit(e)}>
      <h2>{ask.institution}</h2>
      <div dangerouslySetInnerHTML={{ __html: ask.exercise_text }}>
      </div>
      <div id="group-radio" >
        {ask.alternatives?.map((alternative) =>
          <div key={alternative?.letter} id="radio-option" className={handleColor(alternative.letter)}>
            <input type="radio" id={alternative.letter} placeholder={alternative.letter + "" + alternative.label} onChange={() => saveChoice(alternative.letter)} name="answer" checked={choice === alternative.letter} value={alternative.letter} />
            <label htmlFor="html"> {alternative.letter}. <font>{alternative.label}</font></label>
          </div>
        )}
      </div>

      <hr className="diviser"/>
      <div id="form-footer"  className={is_correct === 1 ? "correct" : is_correct === 2? "wrong" : ""} >
        {is_correct !== 0 &&
          <div>
            {is_correct === 1 ?
              <p>
                <b>
                  Resposta correta
                </b>
                Boa! Acertou em cheio.
              </p>
              :
              <p>
                <b>
                  Resposta incorreta
                </b>
                Que tal tentar novamente?
              </p>
            }
          </div>
        }
        <button id="form-button" disabled={disabled} type="submit">{handleButtonLabel()}</button>

      </div>
        <hr className="diviser" />
    </form >
  );
}

export default Principal;