import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid,
  IonRow, IonFab,
  IonFabButton,
  IonIcon,
  IonCol, IonButton } from '@ionic/react';
import { UserContext } from '../helpers/context';
import { personAddOutline } from "ionicons/icons";
import { useState, useEffect, useRef, useContext } from "react";
import { useLists } from "../hooks/useWordLists";
import './Tab2.css';

const Tab2: React.FC = () => {

  const { userList } = useLists();
  const { user, setUser } = useContext(UserContext);

  // select user
  useEffect(() => {
    console.log('user selected');
    if(typeof user !== 'undefined') {
      // load user profile     
      console.log('User:' + JSON.stringify(user));     
      // set profile in app state
      setUser(user);
    }
  },[user]); 

  function addUser(){
    //
  }

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>How are you going?</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow class="ion-no-padding">
            <IonHeader>
              Select user
            </IonHeader>
            {userList.map((user: any) => (
            <IonCol class="ion-no-padding" key={user.id}>
              <IonButton class="ion-float-left secondary" strong={true} onClick={() => setUser(user)}>
                {user.name}
              </IonButton>
            </IonCol>
            ))}
          </IonRow>
        </IonGrid>   
        {typeof user !== 'undefined' &&
        <IonGrid>
          <IonRow class="ion-no-padding">
            <IonHeader>
              {user.name}
            </IonHeader>
          </IonRow>
          <IonRow class="ion-no-padding">
            <IonCol class="ion-no-padding" key={user.id}>
              <img width={200} src={user.avatar} alt="Avatar" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p>Score:{user.score}</p>
              <p>Drills:{user.drills}</p>
              <p>Correct:{user.correct}</p>
              <p>Incorrect:{user.incorrect}</p>
            </IonCol>
          </IonRow>
        </IonGrid>    
        }      
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => addUser()}>
            <IonIcon icon={personAddOutline}></IonIcon>
          </IonFabButton>
        </IonFab>           
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
