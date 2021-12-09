import './index.css';
import { useContext } from 'react';
import { Context } from '../Context';
import { checkAnswer } from '../../services/requests';

function Panel({ exercise_id }) {
    const { choice, updateIsCorrect, isCorrect, disable, buttonLabel } = useContext(Context);

    const handleSubmit = () => {
        checkAnswer(exercise_id, choice).then((res) => {
            updateIsCorrect(res.is_correct);
        });
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
                    type="submit">{buttonLabel}
                </button>
            </div>
            <hr className="diviser" />
        </div>
    );
}

export default Panel;