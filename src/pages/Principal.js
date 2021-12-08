import './principal.css';
import { useEffect, useState } from 'react';
import { getAsk } from '../services/requests';

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
      getAsk().then((res)=>{
        console.log(res);
          if(res){
            setAsk(res.exercise);
          }
      })
  }, []);
  return (
    <div id="principal">
      hi
      {ask.exercise_text}
    </div >
  );
}

export default Principal;