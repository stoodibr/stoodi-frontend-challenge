import URL from './server';

/**
 * @name checkAnswer
 * 
 * @param exercise_id identifier from exercise
 * @param choice name from exercise
 * 
 * @author: Daniela Ferreira Feitosa
 * Github: https://github.com/ni-ela
 * 
 * @abstract Check if the answer is correct
 */
export const checkAnswer = (exercise_id, choice) => {
    return fetch(URL + exercise_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: choice
    }).then(response => response.json())
        .catch(error => {
            throw error;
        });
};

/**
 * @name getAsk
 * 
 * @author: Daniela Ferreira Feitosa
 * Github: https://github.com/ni-ela
 * 
 * @abstract Get ask from API
 */
 export const getAsk = () => {
    return fetch(URL)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
};