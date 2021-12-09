import React, { useState, createContext } from 'react'
import { STATUS } from '../../config/enum';

export const Context = createContext();
export const Provider = ({ children }) => {
    const [isCorrect, setIsCorrect] = useState(null);
    const [choice, setChoice] = useState("");
    const [disable, setDisable] = useState(true);
    const [color, setColor] = useState("");
    const [buttonLabel, setButtonLabel] = useState("VERIFICAR RESPOSTA");

    const updateIsCorrect = (value) => {
        setIsCorrect(value);
        setButtonLabel(STATUS[value]);
        getColor(value);
    }

    const updateChoice = (value) => {
        setChoice(value);
        setDisable(false);
        setButtonLabel("VERIFICAR RESPOSTA");
        setColor(value);
        setIsCorrect(null);
    }

    const getColor = (value) => {
        if(isCorrect && value === choice){
            return true;
        } 
        
        if(isCorrect !== null && value === choice){
            return false;
        } 

        else return "";
    }

    const value = {
        choice,
        updateChoice,
        color,
        isCorrect,
        updateIsCorrect,
        disable,
        getColor,
        buttonLabel, 
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}