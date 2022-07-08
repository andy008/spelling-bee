import React from 'react';
import { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonFab, IonFabButton, IonIcon  } from '@ionic/react';
import { camera, addCircle, close } from 'ionicons/icons';
//import ExploreContainer from '../components/ExploreContainer';
import { useLists } from '../hooks/useWordLists';
import './Tab1.css';
import { list } from 'ionicons/icons';

function addList(){
  console.log("addlist");
}

const Tab1: React.FC = () => {

  const { getList, wordLists } = useLists();
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
            {wordLists.lists.map((list:any) => (
              <IonItemSliding key={list.id}>
                <IonItem>
                  <IonLabel color="secondary">{list.name}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption onClick={() => {}}>Complete</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))};
          </IonList>     
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => addList()}>
              <IonIcon icon={addCircle}></IonIcon>
            </IonFabButton>
          </IonFab>             
        </IonContent>
      </IonPage>
  )
};

export default Tab1;
