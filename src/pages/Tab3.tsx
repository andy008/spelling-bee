import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid,
  IonRow, IonFab, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonFabButton, IonAvatar, IonChip,
  IonIcon,
  IonCol, IonButton, IonLabel } from '@ionic/react';
  import { useState, useEffect, useRef, useContext } from "react";
import './Tab3.css';
import { UserContext } from '../helpers/context';

const Tab3: React.FC = () => {

  const { user, setUser } = useContext(UserContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen> 
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow class="ion-no-padding">
            <IonCol size="3"></IonCol>
            <IonCol size="6">
              <IonCard onClick={() => setUser(user)}>
                <img width={200} src={user.avatar} alt="Avatar" />
                <IonCardHeader>
                  <IonCardTitle><IonLabel color="warning">{user.name}</IonLabel></IonCardTitle>
                </IonCardHeader>
                <IonCardContent color="warning">
                  <p>Score:{user.score}</p>
                  <p>Drills:{user.drills}</p>
                  <p>Correct:{user.correct}</p>
                  <p>Incorrect:{user.incorrect}</p>                  
                </IonCardContent>
              </IonCard>      
            </IonCol>   
            <IonCol size="3"></IonCol>     
          </IonRow>
          <IonRow>
            <IonCol>

            </IonCol>
          </IonRow>
        </IonGrid>         
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
