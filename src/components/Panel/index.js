import './index.css';
import { useContext, useState } from 'react';
import { Context } from '../Context';
import { checkAnswer } from '../../services/requests';

/**
 * @name Panel
 * 
 * @author: Daniela Ferreira Feitosa
 * Github: https://github.com/ni-ela
 * 
 * @abstract Content the foother form and the logical him
 */
function Panel({ exercise_id }) {
    const { toDefault, choice, updateIsCorrect, isCorrect, disable, buttonLabel } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);

        if (isCorrect === false) {
            toDefault();
        } else checkAnswer(exercise_id, choice).then((res) => {
            if (res) {
                updateIsCorrect(res.is_correct);
            }
        });
        
        setIsLoading(false);
    }

    return (
        <div>
            <hr className="diviser" />
            <div
                id="form-footer"
                className={`color-${isCorrect}`}>
                {isCorrect !== null &&
                    <p>
                        <b>
                            Resposta {!isCorrect && "in"}correta
                        </b>
                        {!isCorrect ? "Que tal tentar novamente?" : "Boa! Acertou em cheio."}
                    </p>
                }
                <button
                    id="form-button"
                    onClick={(e) => !isCorrect && handleSubmit(e)}
                    disabled={disable}
                    type="submit">
                    {isLoading && "Carregando..."}
                    {!isLoading && buttonLabel}
                </button>
            </div>
            <hr className="diviser" />
        </div>
    );
}

export default Panel;