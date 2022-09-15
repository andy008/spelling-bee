import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
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
  IonListHeader,
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
  IonChip,
  IonAvatar,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { listCircleOutline, addCircleOutline, closeCircleOutline, downloadSharp, contractOutline, checkmarkCircleOutline } from 'ionicons/icons';
//import ExploreContainer from '../components/ExploreContainer';
import EasySpeech from "easy-speech";
import { UserContext } from '../helpers/context';
import { useLists } from "../services/useWordLists";
import { audioService } from "../services/audio";
import "./Tab2.css";
import { list } from "ionicons/icons";

//  better form handling https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/
//  react hook form https://stackblitz.com/edit/ionic-react-hook-form-cit9zr?file=src%2FApp.tsx 


function addList() {
  console.log("addlist");
}

//  Global State
const initialState = { 
  user: {
    id: 0,
    name: '',
    score: 0,
    drills: 0,
    correct: 0,
    incorrect: 0,
    avatar: '',    
  },
  app: {} 
};

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

  const { user, setUser } = useContext(UserContext);
 
  // services
  const { wordLists, defaultEmptyList } = useLists();
  const { audio, speak } = audioService();

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const modalList = useRef<HTMLIonModalElement>(null);

  // state
  const [text, setText] = useState<string>();
  const [number, setNumber] = useState<number>();

  const [listsCollection, setLists] = useState(wordLists);
  const [showModal, setShowModal] = useState(false);
  const [currentWord, setCurrentWord] = useState(undefined);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordList, setWordList] = useState(undefined);
  const [retryCount, setRetryCount] = useState(0);
  const [utterance, setUtterance] = useState('');
  const [newWordListEdit, setNewList] = useState(defaultEmptyList);
  const [newWord, setNewWord] = useState({word:'',exampleSentence:''});
  const [step, setStep] = useState(0);

  let newWordList = defaultEmptyList;


  //  select list

  useEffect(() => {
    console.log('list selected');
    console.log('List:' + JSON.stringify(wordList));  
    if(typeof wordList !== 'undefined') {
      setUtterance("Okay, let's get started.");
      setCurrentWordIndex(1);   
    }
  },[wordList]);  

  //  manage flow

  useEffect(() => {
    if(typeof wordList !== 'undefined') {

      if (currentWordIndex <= wordList.words.length) {
        setShowModal(true);
        modal.current.present();
        console.log('next word');
        setCurrentWord(wordList.words[currentWordIndex-1]);
        const utterance = "Spell, " + wordList.words[currentWordIndex-1].word + ". " + wordList.words[currentWordIndex-1].exampleSentence;
        setUtterance(utterance);

      } else {
        setUtterance("You have finished the drill!");
        modal.current.dismiss();
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
    audio();
    speak(utterance);
    let voices = EasySpeech.voices();
    EasySpeech.speak({
      text: utterance,
      //voice: voices[2], //EasySpeech.voices[2], //myLangVoice, // optional, will use a default or fallback
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
      //modal.current.dismiss(); 
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

  function dismissDrill(){
    modal.current?.dismiss();
    let sayDimiss = "Let's come back to that later."
    setUtterance(sayDimiss);
    // finish
    setWordList(undefined);
    setCurrentWord(undefined);
    setCurrentWordIndex(0);    
  }

  function addList(){
    newWordList = JSON.parse(JSON.stringify(defaultEmptyList));
    console.log(JSON.stringify(newWordList));
    //setNewList(defaultEmptyList);
    modalList.current.present();
    setStep(1);
    setUtterance("Let's make a new word list.");
  }

  function cancelList(){

  }

  function saveList(){
    console.log(JSON.stringify(newWordList));
    setNewList(newWordList);
    console.log('Word list:' + JSON.stringify(newWordListEdit));
  }

  function editList(){

  }

  function saveWord(){
    let newStateArray = newWordListEdit;
    newStateArray.words.push(newWord);
    setNewList(newStateArray);
    setNewWord({word: '', exampleSentence: ''});
  }

  function storeList(){
    let newStateArray = listsCollection;
    newStateArray.lists.push(newWordList);
    setLists(newStateArray);
    modalList.current.dismiss();
    setNewList(defaultEmptyList);
    localStorage.setItem('lists', JSON.stringify(listsCollection));
    setStep(0);
  }


  /*
  function onChangeNewWord(event){  
    console.log('onChangeNewWord:');
    console.log('Event: ' + JSON.stringify(event));
    const formState = event.detail.name
    //const value = event.target.type === 'checkbox' ? event.target.checked : event.detail.value!

    console.log('Changing:' + formState + ' to ' + event.detail.value!);
    
    setText(event.detail.value!);

    setNewWord(curr => {
       return{
           ...curr,
           [formState]: event.detail.value!
       }
   })

  }
  */


  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle color="tertiary">Spelling World</IonTitle>
          {user.name &&
            <IonChip slot="end">
              <IonAvatar  class="user-avatar">
                <img src={user.avatar} /> 
              </IonAvatar>  
              <IonLabel>{user.name}</IonLabel> 
            </IonChip> 
          }     
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList class="ion-margin">
          <IonListHeader color="tertiary">Spelling Lists</IonListHeader>
          {listsCollection.lists.map((list: any) => (
            <IonItemSliding key={list.id} class="ion-padding">
              <IonItem>
                <IonIcon icon={checkmarkCircleOutline} color="warning" slot="end" />
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
          <IonFabButton onClick={() => {addList()}}>
            <IonIcon icon={addCircleOutline}></IonIcon>
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
              <IonTitle>Spelling Drill : Word {currentWordIndex}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismissDrill()}>
                  <IonIcon slot="start" icon={closeCircleOutline} />
                </IonButton>
              </IonButtons>                 
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

        <IonModal
          ref={modalList}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
          initialBreakpoint={0.8} breakpoints={[0, 0.8, 0.8, 0.8]}
        >
          <IonHeader>
            <IonToolbar>

              <IonTitle>Create List</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => cancelList()}>
                  <IonIcon slot="start" icon={closeCircleOutline} />
                </IonButton>
              </IonButtons>              
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {step == 1 &&
            <div>
              <IonListHeader color="tertiary">Details</IonListHeader>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput value={newWordList?.name} onIonChange={e => newWordList.name = e.detail.value} type="text" />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Description (optional)</IonLabel>
                <IonInput value={newWordList.description} onIonChange={e => newWordList.description = e.detail.value} type="text"  />
              </IonItem>     
              <IonItem>
                <IonLabel position="stacked">School Year</IonLabel>
                <IonSelect value={newWordList.year} onIonChange={e => newWordList.year = e.detail.value}>
                  <IonSelectOption value="0">Kindergarten</IonSelectOption>
                  <IonSelectOption value="1">Year 1</IonSelectOption>
                  <IonSelectOption value="2">Year 2</IonSelectOption>
                  <IonSelectOption value="3">Year 3</IonSelectOption>
                  <IonSelectOption value="4">Year 4</IonSelectOption>
                  <IonSelectOption value="5">Year 5</IonSelectOption>
                  <IonSelectOption value="6">Year 6</IonSelectOption>
                </IonSelect>
              </IonItem> 
              <IonItem>
                <IonLabel position="stacked">Difficult</IonLabel>
                <IonSelect value={newWordList.difficulty} onIonChange={e => newWordList.difficulty = e.detail.value}>
                  <IonSelectOption value="easy">Easy</IonSelectOption>
                  <IonSelectOption value="medium">Medium</IonSelectOption>
                  <IonSelectOption value="hard">Hard</IonSelectOption>
                </IonSelect>
              </IonItem>  
            </div>
            }
            {step == 2 && 
            <div>
              <IonListHeader color="tertiary">Words</IonListHeader>
              <IonItem>
                <IonLabel position="stacked">Word</IonLabel>
                <IonInput value={newWord.word} onIonChange={e => newWord.word = e.detail.value} type="text"  />
              </IonItem>   
              <IonItem>
                <IonLabel position="stacked">Sentence example</IonLabel>
                <IonInput value={newWord.exampleSentence} onIonChange={e => newWord.exampleSentence = e.detail.value} type="text"  />
              </IonItem>                
              <IonGrid>
                <IonRow class="ion-no-padding">
                  <IonCol class="ion-no-padding">
                  </IonCol>
                  <IonCol class="ion-no-padding">
                    <IonButton class="ion-float-right primary" strong={true} onClick={() => saveWord()}>
                      Add Another
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>     
            </div>       
            }
            <IonGrid>
              <IonRow class="ion-no-padding">
                <IonCol class="ion-no-padding">
                  <IonButton class="ion-float-left secondary" strong={true} onClick={() => cancelList()}>
                    Cancel
                  </IonButton>
                </IonCol>
                {step == 1 && 
                <IonCol class="ion-no-padding">
                  <IonButton class="ion-float-right primary" strong={true} onClick={() => 
                    {
                      saveList();
                      setStep(2); 
                    }}>
                    Next
                  </IonButton>
                </IonCol>
                } 
                {step == 2 && 
                <IonCol class="ion-no-padding">
                  <IonButton class="ion-float-right primary" strong={true} onClick={() => {
                      saveWord();
                      saveList();
                      storeList();
                    }}>
                    Finished
                  </IonButton>
                </IonCol>
                }                 
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
