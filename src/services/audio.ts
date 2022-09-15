import { Axios } from 'axios';
import { TextToSpeechClient, ISynthesizeSpeechRequest } from '@google-cloud/text-to-speech'

const axios = new Axios({});
const speechClient = new TextToSpeechClient();

export function audioService():any {

   

    const audio = async (): Promise<String> => {

        console.log('Init audio service')  

        //  play
        const play = function play(url){
            //Sound.url(url);
            //Sound.playFromPosition(0);
            console.log('Play audio');
        }        

        //  export
        const methods: any = {
            play
        }
        return methods;   
    }

    const play = function play(){
        //Sound.playFromPosition(0);
        console.log('Play audio');
        return;
    }    

    const speak = (message: string, language: string) => {

        //  speech set up
        const config = {
            voiceIndex: 4,
            rate: '1.1',
            pitch: '0.4',
            volume: 1
        };       
        let voiceLabelsStr = 'AU Male,US Male,GB Male,GB Female,US Female,AU Female';
        let genderStr = 'MALE,MALE,MALE,FEMALE,FEMALE,FEMALE';
        let voicesStr = 'en-AU-Wavenet-B,en-US-Standard-D,en-GB-Wavenet-B,en-GB-Wavenet-A,en-US-Wavenet-F,en-AU-Wavenet-A';
        let voices = voicesStr.split(',');
        let gender = genderStr.split(',');
        let voiceLabels = voiceLabelsStr.split(',');            

        console.log(JSON.stringify(config));
      
        //message.replace(/<[^>]*>?/gm, '');
        const request:ISynthesizeSpeechRequest = {
            input: {
                text: message
            },
            audioConfig: {
                audioEncoding: 'MP3',
                //pitch: config.pitch,
                //speakingRate: config.rate,
            },   
            voice: {
                languageCode: 'en-US',
                //name: voices[0], 
                ssmlGender: gender[0]
            }
        };
        //localStorage.setItem('apiKey', environment.prod.google.apiKey);
        let res = undefined;
        console.log('hey google, speak'+JSON.stringify(request));

        speechClient.synthesizeSpeech(request).then(data => {
        //axios.post('https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + 'AIzaSyBczMHS3ykiLW2e5MsOOVYq2iK3H4uJZe0', req).then(data => {
            //this.values.audioPlaying = true
            //audio.playStream('data:audio/mp3;base64,' + data['audioContent'])
            //console.log('data:'+JSON.stringify(data));
        })  
     
      }    

    const methods:any = {
        speak,
        audio,
        play
    };

    return methods;

}

/*

url (string): The url of the sound to play.
playStatus (Sound.status.{PLAYING,STOPPED,PAUSED}): The current sound playing status. Change it in successive renders to play, stop, pause and resume the sound.
playFromPosition (number): Seeks to the position specified by this prop, any time it changes. After that, the sound will continue playing (or not, if the playStatus is not PLAYING). Use this prop to seek to different positions in the sound, but not use it as a controlled component. You should use either this prop or position, but not both.
position (number): The current position the sound is at. Use this to make the component a controlled component, meaning that you must update this prop on every onPlaying callback. You should use either this prop or playFromPosition, but not both.
volume (number): The current sound's volume. A value between 0 and 100.
playbackRate (number): Number affecting sound playback. A value between 0.5 and 4 of normal rate (1).
autoLoad (boolean): If the sound should start loading automatically (defaults to false).
loop (boolean): If the sound should continue playing in a loop (defaults to false).
muted (boolean): Mutes the sound without affecting volume setting (defaults to false).
onError (function): Function that gets called when the sound fails to load, or fails during load or playback. It receives the arguments errorCode and description with details about the error.
onLoading (function): Function that gets called while the sound is loading. It receives an object with properties bytesLoaded, bytesTotal and duration.
onLoad (function): Function that gets called after the sound has finished loading. It receives an object with property loaded, a boolean set to true if the sound has finished loading successfully.
onPlaying (function): Function that gets called while the sound is playing. It receives an object with properties position and duration.
onPause (function): Function that gets called when the sound is paused. It receives an object with properties position and duration.
onResume (function): Function that gets called while the sound is resumed playing. It receives an object with properties position and duration.
onStop (function): Function that gets called while the sound playback is stopped. It receives an object with properties position and duration.
onFinishedPlaying (function): Function that gets called when the sound finishes playing (reached end of sound). It receives no parameters.
onBufferChange (function): Function that gets called when the sound buffering status changes. It receives a single boolean representing the buffer state.

*/