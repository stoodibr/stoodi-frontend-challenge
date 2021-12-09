import './index.css';
import { useContext } from 'react';
import { Context } from '../Context';

/**
 * @name Principal
 * 
 * @author: Daniela Ferreira Feitosa
 * Github: https://github.com/ni-ela
 * 
 * @abstract Group the radios buttons from form
 */
function RadioButtonGroup({ alt }) {
    const { choice, getColor, updateChoice } = useContext(Context);

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
                        onChange={() => updateChoice(alternative.letter)}
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