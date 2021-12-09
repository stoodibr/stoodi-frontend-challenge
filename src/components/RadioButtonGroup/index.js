import './index.css';
import { useContext } from 'react';
import { Context } from '../Context';

function RadioButtonGroup({ alt }) {
    const { isCorrect, choice, getColor, updateChoice } = useContext(Context);

    return (
        <div id="group-radio" >
            {alt?.map((alternative) =>
                <div
                    key={alternative.letter}
                    id="radio-option"
                    className={`color-${getColor(alternative.letter)}`}>
                    <input
                        type="radio"
                        id={alternative.letter}
                        onChange={() => !isCorrect && updateChoice(alternative.letter)}
                        name="answer"
                        checked={choice === alternative.letter}
                        value={alternative.letter} />
                    <label
                        htmlFor="html">
                        {alternative.letter}. <font>{alternative.label}</font>
                    </label>
                </div>
            )}
        </div>
    );
}

export default RadioButtonGroup;