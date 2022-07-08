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
import { camera, addCircle, close } from "ionicons/icons";
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
  let currentWord;

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
    speak("Okay, did you get it right?");
    console.log(currentWord);
    console.log(input.current?.value);
    if (currentWord.word == input.current?.value) {
      speak("Yes, correct!");
    } else {
      speak("No, incorrect! Try again.");
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
      currentWord = list.words[0];
      const utterance =
        "Okay, spell " +
        list.words[0].word +
        ". " +
        list.words[0].exampleSentence;
      // trigger a drill on this item here
      modal.current.present();
      speak(utterance);
      console.log(JSON.stringify(list));
    };
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
