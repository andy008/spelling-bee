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

function addList() {
  console.log("addlist");
}

EasySpeech.detect();
EasySpeech.init({ maxTimeout: 5000, interval: 250 })
  .then(() => console.debug("load complete"))
  .catch((e) => console.error(e));

const Tab1: React.FC = () => {
  const { getList, wordLists } = useLists();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  let wordList, currentWord, totalWords, currentWordIndex, retryCount;
  retryCount = 0;

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    // toggle modal
    toggleModal()    
    //modal.current?.dismiss(input.current?.value, "confirm");
    //random number between 1 and 8
    let random = Math.floor(Math.random() * 8) + 1;
    switch(random){
      case 1:
        speak("How did you go?");
        break;
      case 2:
        speak("Did you get it right?");
        break;
      case 3:
        speak("Okay, let's take a look?");
        break;
      case 4:
        speak("I'm checking that one.");
        break;  
      case 5:
        speak("Is it right?");
        break;
      case 6:
        speak("Okay, let'see if it's right.");
        break;
      case 7:
        speak("How did you go?");
        break;
      case 8:
        speak("Alrighty, let's see if it's right.");
        break;                   
    }  
    console.log(currentWord);
    console.log(input.current?.value);
    if (currentWord.word == input.current?.value) {
      //random number between 1 and 8
      let random = Math.floor(Math.random() * 8) + 1;
      switch(random){
        case 1:
          speak("Yes, well done!");
          break;
        case 2:
          speak("Alrighty then! You got it!");
          break;
        case 3:
          speak("Yep, got it!");
          break;
        case 4:
          speak("Fantastic!");
          break;  
        case 5:
          speak("Nice going!");
          break;
        case 6:
          speak("Oh, yeh!");
          break;
        case 7:
          speak("Yes!");
          break;
        case 8:
          speak("Okay!");
          break;                   
      }        
      controlDrill();
      retryCount = 0;
    } else {
      speak("No, incorrect!");
      retryCount++;
      console.log('retryCount:' + retryCount);
      if(retryCount<3){
        switch(retryCount){
          case 1:
            speak("Try again!");
            break;
          case 2:
            speak("One more time!");
            break;
        }     
        currentWordIndex--;
        controlDrill();
      }else{    
        speak("Maybe next time!");
        retryCount = 0;
        controlDrill();
      }
    }
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  function drill(list) {
    return (event: React.MouseEvent) => {
      console.log("drill");
      event.preventDefault();
      currentWordIndex = 0;
      totalWords = list.words.length;
      wordList = list.words
      controlDrill();
    };
  }

  function controlDrill(){
    if (currentWordIndex < totalWords) {
      currentWordIndex++;
      currentWord = wordList[currentWordIndex-1];
      doWord(currentWord);
    } else {
      speak("You have finished the drill! Well done.");
    }
  }

  function toggleModal(){
    console.log('Modal:' + modal.current.isOpen)
    if(modal.current.isOpen){
      modal.current.dismiss()
    } else { 
      modal.current.present();
    }
  }

  function doWord(item){
    // say word
    const utterance = 
    "Okay, spell " +
    item.word +
    ". " +
    item.exampleSentence;
    // trigger a drill on this item here
    currentWord = item;
    // toggle modal
    toggleModal()
    //  reset form
    //input?.current.value = "";
    //input.current?.focus();    
    speak(utterance);
  }

  function speak(utterance: string) {
    EasySpeech.speak({
      text: utterance,
      //voice: myLangVoice, // optional, will use a default or fallback
      pitch: 1,
      rate: 1,
      volume: 1,
      // there are more events, see the API for supported events
      boundary: (e) => console.debug("boundary reached"),
    });
  }

  function repeat() {
    speak(currentWord.word);
    speak(currentWord.exampleSentence);
  }

  //const wordListsObj = getList();
  //console.log('Word list A:' + JSON.stringify(wordListsObj));
  //const [wordListsA, setWordList] = useState<any>();
  //setWordList(wordListsObj);
  //console.log('Word list from function const:' + JSON.stringify(wordLists));

  //const [wordList, setPhotoToDelete] = useState<UserPhoto>();

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
                <IonLabel onClick={drill(list)} color="secondary">
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
                    Finished
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
