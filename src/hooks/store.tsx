import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Response } from '../models/Response';

interface StoreData {
    loading: boolean,
    responses: Response[],
    register(value: Response): Promise<void>,
    update(value: Response, id: number): Promise<void>,
    remove(id: number): Promise<void>,
}

const StoreContext = createContext<StoreData>({} as StoreData);

interface PropsAuthProvider {
  children: React.ReactNode;
}

export function StoreProvider({ children }: PropsAuthProvider): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]); 

  useEffect(() => {
    async function loadStorageData() {
      setLoading(true);
      const responsesAsync = await AsyncStorage.getItem('@VozPerso:responses');

      if(responsesAsync) {
          setResponses(JSON.parse(responsesAsync));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function register(value: Response): Promise<void> {
    const values = responses
    value.id = responses.length
    values.push(value);
    setResponses([...values]);
    await AsyncStorage.setItem('@VozPerso:responses', JSON.stringify(values));
  }

  async function update(value: Response, id: number): Promise<void> {
    const responsesCopy = responses.map(item => {
      if(item.id === id){
        return {
          id,
          ouvir: value.ouvir,
          resposta: value.resposta
        }
      }
      return item;
    })
    setResponses([...responsesCopy])
    await AsyncStorage.setItem('@VozPerso:responses', JSON.stringify(responsesCopy));
  }

  async function remove(id: number): Promise<void> {
    const responsesCopy = responses;
    responsesCopy.splice(id, 1);
    setResponses([...responsesCopy]);
    await AsyncStorage.setItem('@VozPerso:responses', JSON.stringify(responsesCopy));
  }

  return (
    <StoreContext.Provider
      value={{
        loading,
        responses,
        register,
        update,
        remove
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreData {
  const context = useContext(StoreContext);
  return context;
}
