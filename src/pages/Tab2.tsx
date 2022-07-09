import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonButtons,
  IonInput,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { camera, addCircle, close, downloadSharp, contractOutline } from "ionicons/icons";
//import ExploreContainer from '../components/ExploreContainer';
import EasySpeech from "easy-speech";
import { useLists, List } from "../hooks/useWordLists";
import "./Tab2.css";
import { list } from "ionicons/icons";
import { setMaxListeners } from "process";

function addList() {
  console.log("addlist");
}

let voices
EasySpeech.detect();
EasySpeech.init({ maxTimeout: 5000, interval: 250 })
  .then(() => {
    voices = EasySpeech.voices();
    const languages = new Set();  
    console.log(JSON.stringify(voices));
    console.debug("load complete")
  })
  .catch((e) => console.error(e));

const Tab1: React.FC = () => {

  console.log('Init Tab1');
  
  const { getList, wordLists } = useLists();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  // state
  const [showModal, setShowModal] = useState(false);
  const [currentWord, setCurrentWord] = useState(undefined);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordList, setWordList] = useState(undefined);
  const [retryCount, setRetryCount] = useState(0);
  const [utterance, setUtterance] = useState('');


  //select list
  useEffect(() => {
    console.log('list selected');
    console.log('List:' + JSON.stringify(wordList));  
    if(typeof wordList !== 'undefined') {
      setUtterance("Okay, let's get started.");
      setCurrentWordIndex(1);   
    }
  },[wordList]);  

  //manage flow
  useEffect(() => {
    if(typeof wordList !== 'undefined') {
      if (currentWordIndex < wordList.words.length) {
        console.log('next word');
        setShowModal(true);
        setCurrentWord(wordList.words[currentWordIndex-1]);
        const utterance = "Spell, " + wordList.words[currentWordIndex-1].word + ". " + wordList.words[currentWordIndex-1].exampleSentence;
        setUtterance(utterance);
      } else {
        setUtterance("You have finished the drill! Well done.");
        setShowModal(false);
        // finish
        setWordList(undefined);
        setCurrentWord(undefined);
        setCurrentWordIndex(0);
        return () => {
          // clean up
        }
      }         
    }
  },[currentWordIndex])

  //speech
  useEffect(() => {
    let voices = EasySpeech.voices();
    EasySpeech.speak({
      text: utterance,
      voice: voices[2], //EasySpeech.voices[2], //myLangVoice, // optional, will use a default or fallback
      pitch: 0.9,
      rate: 0.7,
      volume: 1,
      // there are more events, see the API for supported events
      //boundary: (e) => console.debug("boundary reached"),
    });
  },[utterance])

  //modal
  useEffect(() => {
    if(showModal){
      modal.current.present();
    } else { 
      modal.current.dismiss();
    }  
  },[showModal])

  function confirm() {
  
    let random = Math.floor(Math.random() * 8) + 1;
    switch(random){
      case 1:
        setUtterance("How did you go?");
        break;
      case 2:
        setUtterance("Did you get it right?");
        break;
      case 3:
        setUtterance("Okay, let's take a look?");
        break;
      case 4:
        setUtterance("I'm checking that one.");
        break;  
      case 5:
        setUtterance("Is it right?");
        break;
      case 6:
        setUtterance("Okay, let'see if it's right.");
        break;
      case 7:
        setUtterance("How did you go?");
        break;
      case 8:
        setUtterance("Alrighty, let's see if it's right.");
        break;                   
    }  
    console.log('Confirm:' + currentWord.word);

    if (currentWord.word === input.current?.value) {
      //random number between 1 and 8
      let random = Math.floor(Math.random() * 8) + 1;
      switch(random){
        case 1:
          setUtterance("Yes, well done!");
          break;
        case 2:
          setUtterance("Good one!");
          break;
        case 3:
          setUtterance("Yep, got it!");
          break;
        case 4:
          setUtterance("Fantastic!");
          break;  
        case 5:
          setUtterance("Nice going!");
          break;
        case 6:
          setUtterance("Correct!");
          break;
        case 7:
          setUtterance("Yes!");
          break;
        case 8:
          setUtterance("Okay!");
          break;                   
      }        
      input.current.value = '';
      setShowModal(false); 
      setRetryCount(0);
      setCurrentWordIndex(prevWordIndex => prevWordIndex + 1);
    } else {
      
      console.log('retryCount:' + retryCount);
      let retryPrompt
      if(retryCount<3){
        switch(retryCount){
          case 0:
            retryPrompt = "Incorrect. Keep trying!";
            break;          
          case 1:
            retryPrompt = "Try again!";
            break;
          case 2:
            retryPrompt = "One more time!";
            break;
        }    
        retryPrompt = retryPrompt + ' ' + currentWord.word 
        setUtterance(retryPrompt) 
        setRetryCount((prevRetryCount => prevRetryCount + 1 ));
      } else {    
        setUtterance("Maybe next time!");
        setShowModal(false);
        console.log(input.current?.value);
        setRetryCount(0);
        setRetryCount(prevRetryCount => prevRetryCount++);
        setCurrentWordIndex(prevWordIndex => prevWordIndex + 1);
      }
    }
  }


  function repeat() {
    console.log('Repeat')
    setUtterance(currentWord.word + '. ' + currentWord.exampleSentence);
  }  

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      //setMessage(`Hello, ${ev.detail.data}!`);
    }
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Word Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Word Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {wordLists.lists.map((list: any) => (
            <IonItemSliding key={list.id}>
              <IonItem>
                <IonLabel onClick={() => setWordList(list)} color="secondary">
                  {list.name}
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption onClick={() => {}}>Complete</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
          ;
        </IonList>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => addList()}>
            <IonIcon icon={addCircle}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
          initialBreakpoint={0.3} breakpoints={[0, 0.3, 0.5, 0.7]}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Spelling Drill</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter word</IonLabel>
              <IonInput ref={input} type="text" placeholder="Type here" />
            </IonItem>
            <IonGrid>
              <IonRow class="ion-no-padding">
                <IonCol class="ion-no-padding">
                  <IonButton class="ion-float-left secondary" strong={true} onClick={() => repeat()}>
                    Repeat
                  </IonButton>
                </IonCol>
                <IonCol class="ion-no-padding">
                  <IonButton class="ion-float-right primary" strong={true} onClick={() => confirm()}>
                    Next
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
