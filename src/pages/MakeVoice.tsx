import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();
import Voice, { SpeechEndEvent, SpeechResultsEvent, SpeechStartEvent } from '@react-native-voice/voice';
import Tts from "react-native-tts";
import { useStore } from '../hooks/store';

export default function MakeVoice(): JSX.Element {
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [ttsStatus, setTtsStatus] = useState('initialized');
  const speechRate = 0.5
  const speechPitch = 1;
  const { responses } = useStore();

  const onSpeechStart = (e: SpeechStartEvent): void => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = (e: SpeechEndEvent): void => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
    setText(results[0]);
  };

  const readText = (value: string): void => {
    console.log('Responses', responses);
    const valueResponse = responses.find(item => item.ouvir.toLowerCase() === value.toLowerCase());
    if(valueResponse){
      Tts.speak(valueResponse.resposta);
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent): void => {
    console.log('onSpeechResults: ', e);
    const resultsText = e.value ? e.value : [];
    setResults(resultsText);
    setText(resultsText[0]);
    if(resultsText[0]){
      readText(resultsText[0]);
    }
  };

  useEffect(() => {
    function loadHome() {
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechEnd = onSpeechEnd;
      Voice.onSpeechResults = onSpeechResults;
      Tts.addEventListener("tts-start", () =>
        setTtsStatus('started')
      );
      Tts.addEventListener("tts-finish", () =>
        setTtsStatus("finished")
      );
      Tts.addEventListener("tts-cancel", () =>
        setTtsStatus("cancelled")
      );
      Tts.setDefaultRate(speechRate);
      Tts.setDefaultPitch(speechPitch);
    }
    loadHome()
  }, [])

  const _startRecognizing = async (): Promise<void> => {
    setStarted('')
    setResults([])
    setEnd('')

    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async (): Promise<void> => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async (): Promise<void> => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async (): Promise<void> => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }

    setStarted('')
    setResults([])
    setEnd('')
    setText('')
  };

  return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bem vindo ao VozPerso!</Text>
        <Text style={styles.instructions}>
          Aperte para começar a falar.
        </Text>
        <Text style={styles.stat}>{`Started: ${started}`}</Text>
        <Text style={styles.stat}>Resultados</Text>
        {results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${end}`}</Text>
        <Text>Texto a comentar: {text}</Text>
        <TouchableOpacity onPress={_startRecognizing}
          style={started === end ? styles.button : [styles.button, styles.buttonActive]}>
          <Icon name="mic" color={ started === end ? '#bbbbff' : 'red'} size={50} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAction} onPress={_stopRecognizing}>
          <Text style={styles.action}>Parar sincronização</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAction} onPress={_cancelRecognizing}>
          <Text style={styles.action}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAction} onPress={_destroyRecognizer}>
          <Text style={styles.action}>Destruir</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 35,
    borderColor: 'gray',
    borderWidth: 2
  },
  buttonActive: {
    backgroundColor: 'black',
    borderColor: 'red'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonAction: {
    height: 38,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccccff',
    marginVertical: 3,
    borderRadius: 7
  },
  action: {
    textAlign: 'center',
    color: '#226666',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

