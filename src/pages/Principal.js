import './principal.css';
import { useEffect, useState } from 'react';
import { getAsk } from '../services/requests';
import RadioButtonGroup from '../components/RadioButtonGroup';
import { Provider } from '../components/Context';
import Panel from '../components/Panel';

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

  useEffect(() => {
    getAsk().then((res) => {
      if (res) {
        setAsk(res.exercise);
      }
    })
  }, []);


  return (
        <form id="principal" onSubmit={(e) => e.preventDefault()} >
      <h2>{ask.institution}</h2>
      <div dangerouslySetInnerHTML={{ __html: ask.exercise_text }} />
      <Provider>
        <RadioButtonGroup alt={ ask.alternatives } />
        <Panel exercise_id={ ask.exercise_id }
        />
      </Provider>
    </form >
  );
}

export default Principal;