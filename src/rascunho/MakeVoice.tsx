import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useStore from '../hooks/store';
import Voice, { SpeechEndEvent, SpeechResultsEvent, SpeechStartEvent } from '@react-native-voice/voice';
import Tts from "react-native-tts";

type Props = {
    text: string;
}
type State = {
  end: string;
  started: string;
  results: string[];
  text: string,
  ttsStatus: string,
  selectedVoice: string,
  speechRate: number,
  speechPitch: number,
};

class MakeVoice extends Component<Props, State> {
  state = {
    end: '',
    started: '',
    results: [],
    text: '',
    
    ttsStatus: "initialized",
    selectedVoice: 'pt-BR-language',
    speechRate: 0.5,
    speechPitch: 1,
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechResults = this.onSpeechResults;
    Tts.addEventListener("tts-start", () =>
       this.setState({ ttsStatus: "started" })
     );
     Tts.addEventListener("tts-finish", () =>
       this.setState({ ttsStatus: "finished" })
     );
     Tts.addEventListener("tts-cancel", () =>
       this.setState({ ttsStatus: "cancelled" })
     );
     Tts.setDefaultRate(this.state.speechRate);
     Tts.setDefaultPitch(this.state.speechPitch);
  }

  componentWillUnmount(): void {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: SpeechStartEvent): void => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechEnd = (e: SpeechEndEvent): void => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
      text: this.state.results[0],
    });
  };

  onSpeechResults = (e: SpeechResultsEvent): void => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value ? e.value : [''],
      text: e.value ? e.value[0] : '',
    });
    this.readText(this.state.text);
  };

  readText = (value: string): void => {
    Tts.speak(value);
  };

  _startRecognizing = async (): Promise<void> => {
    this.setState({
      started: '',
      results: [],
      end: '',
    });

    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async (): Promise<void> => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async (): Promise<void> => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async (): Promise<void> => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      started: '',
      results: [],
      end: '',
    });
  };

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bem vindo ao React Native Voice!</Text>
        <Text style={styles.instructions}>
          Aperte para começar a falar.
        </Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>Resultados</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <Text>Texto a comentar: {this.state.text}</Text>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Icon name="mic" color='red' size={30} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Para sincronização</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancelar</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroir</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default MakeVoice;
