import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid,
  IonRow, IonFab, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonFabButton, IonAvatar, IonChip,
  IonIcon,
  IonCol, IonButton, IonLabel } from '@ionic/react';
import { UserContext } from '../helpers/context';
import { personAddOutline } from "ionicons/icons";
import { useState, useEffect, useRef, useContext } from "react";
import { useLists } from "../services/useWordLists";
import './Tab2.css';

const Tab2: React.FC = () => {

  const { userList } = useLists();
  const { user, setUser } = useContext(UserContext);

  // select user
  useEffect(() => {
    console.log('user selected');
    if(typeof user !== 'undefined') {
      setUser(user);
    }
  },[user]); 

  function addUser(){
    //

  }
  
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
        <IonGrid>
          <IonRow class="ion-no-padding" >
            {userList.map((user: any) => (
            <IonCol size="6" key={user.id}>  
              <IonCard onClick={() => setUser(user)}>
                <img width={200} src={user.avatar} alt="Avatar" />
                <IonCardHeader>
                  <IonCardTitle><IonLabel color="warning">{user.name}</IonLabel></IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>              
            ))}
          </IonRow>
        </IonGrid>      
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
