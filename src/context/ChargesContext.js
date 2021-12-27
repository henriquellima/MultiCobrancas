import { createContext } from 'react';
import useChargesProvider from '../hooks/useChargesProvider';

export const ChargesContext = createContext({});

export default function ChargesProvider( props ) {
  return (
    <ChargesContext.Provider value={useChargesProvider()}>
      {props.children}
    </ChargesContext.Provider>
  )
}