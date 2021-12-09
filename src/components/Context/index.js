import React, { useState, createContext } from 'react'
import { STATUS } from '../../config/enum';

export const Context = createContext();

/**
 * @name Provider
 * 
 * @author: Daniela Ferreira Feitosa
 * Github: https://github.com/ni-ela
 * 
 * @abstract To work with context to controll states from choice, disable, color, label and more
 */
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

    const toDefault = () => {
        setChoice(null);
        setButtonLabel("VERIFICAR RESPOSTA");
        setIsCorrect(null);
        setDisable(true);
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
        updateIsCorrect,
        isCorrect,
        getColor,
        disable,
        toDefault,
        buttonLabel 
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}