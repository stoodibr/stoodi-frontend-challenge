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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAsk().then((res) => {
      if (res) {
        setAsk(res.exercise);
        setIsLoading(false);
      }
    })
  }, []);


  return (
    <form id="principal" onSubmit={(e) => e.preventDefault()} >
      {isLoading && <span>Carregando...</span>}
      {!isLoading &&
        <div>
          <h2>{ask.institution}</h2>
          <div dangerouslySetInnerHTML={{ __html: ask.exercise_text }} />
          <Provider>
            <RadioButtonGroup alt={ask.alternatives} />
            <Panel exercise_id={ask.exercise_id} />
          </Provider>
        </div>
      }
    </form >
  );
}

export default Principal;