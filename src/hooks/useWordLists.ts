import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { analytics } from "ionicons/icons";

const LIST_STORAGE = 'lists';

export function useLists():any {


    console.log('Use Lists!');

    let userProfile 

    let UsersDefault = [
        {
            id: 1,
            name: 'Sasha',
            score: 68,
            drills: 14,
            correct: 73,
            incorrect: 7,
            avatar: 'https://randomuser.me/api/portraits/lego/0.jpg',

        },
        {
            id: 2,
            name: 'Edward',
            score: 82,
            drills: 18,
            correct: 92,
            incorrect: 16,
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',

        },     
        {
            id: 3,
            name: 'Dad',
            score: 92,
            drills: 108,
            correct: 66,
            incorrect: 2,
            avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',

        }              
    ]

    let wordListsDefault:Lists = {
        id: 1,
        name: 'Basic',
        owner: 1,
        lists: [
            {
                id: 1,
                createdDate: new Date(),
                year: 3,
                difficulty: 'basic',
                name: 'Basic',
                description: 'Basic words',
                words: [
                    {
                        id: 1,
                        word: 'beautiful',
                        exampleSentence: 'It was a beautiful day! Beautiful.',
                        tries: 0,
                        correct: 0,
                        wrong: 0,
                    },
                    {
                        id: 2,
                        word: 'sunshine',
                        exampleSentence: 'It is nice to be outside in the sunshine. Sunshine.',
                        tries: 0,
                        correct: 0,
                        wrong: 0,
                    },
                    {
                        id: 1,
                        word: 'supervise',
                        exampleSentence: 'The teacher needed to supervise the children.',
                        tries: 0,
                        correct: 0,
                        wrong: 0,
                    },
                    {
                        id: 1,
                        word: 'essence',
                        exampleSentence: 'The essence of true happiness is laughter.',
                        tries: 0,
                        correct: 0,
                        wrong: 0,
                    },
                    {
                        id: 1,
                        word: 'science',
                        exampleSentence: 'Finding good answers requires the process of science.',
                        tries: 0,
                        correct: 0,
                        wrong: 0,
                    },
                    {
                        id: 1,
                        word: 'amplify',
                        exampleSentence: 'To make the sound louder is to amplify the sound.',
                        tries: 0,
                        correct: 0,
                        wrong: 0,
                    },                                                                                
                ],
                completed: false,
                completedDate: null
            }
        ]
    } 
    
    const [wordLists, setWordLists] = useState<Lists>(wordListsDefault);
    const [userList, setUserList] = useState(UsersDefault);
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('Use effect ran');  
        getList();
    },[]);

    function setAppUserProfile(user){
        userProfile = user;
    }

    function getAppUserProfile(){
        return userProfile;
    }
   
  
    const loadSaved = async () => {
        //  get local storage
        const lists = localStorage.getItem('lists');
        if (lists) {

            const passedLists = JSON.parse(lists);
            console.log(JSON.stringify(passedLists));
            setWordLists(passedLists);
        } else {
            setWordLists(wordListsDefault);
        }
        //  get from server
        /*
        return fetch('http://localhost:3000/lists')
            .then(response => response.json())
            .then(responseJson => {
            return responseJson;
            })
            .catch(error => {
            console.error(error);
            });
        */
    };


    const newList = async (): Promise<List> => {

        const list:List = {
            id: 1,
            createdDate: new Date(),
            year: 2020,
            difficulty: 'basic',
            name: 'Basic',
            description: 'Basic words',
            words: [],
            completed: false,
            completedDate: null
        }

        // slide up a panel to edit?
        //setLists(list);
        return list;
    };

    const saveLists = async (list:List): Promise<List> => {
        console.log(JSON.stringify(list));
        return list;
    };

    const deleteList = async (list:List): Promise<String> => {
        console.log(JSON.stringify(list));
        return 'Success';
    }


    const services:any = {
        getList,
        newList,
        saveLists,
        deleteList,
        userList,
        wordLists,
        user,
        setUser
    };

    return services;


    function getList() {
        console.log('Getting list');
        const lists = localStorage.getItem('lists');
        if (lists) {
            console.log('Found in local storage');
            const passedLists = JSON.parse(lists);
            setWordLists(passedLists);
            return passedLists;
        } else {
            console.log('Using default');
            setWordLists(wordListsDefault);
            console.log('A:' + JSON.stringify(wordListsDefault));
            console.log('B:' + JSON.stringify(wordLists));
            return wordListsDefault;
        }
    }; 

    function saveList(list:List) {
        console.log('Saving list');
        localStorage.setItem('lists', JSON.stringify(list));
    }
}

type Nullable<T> = T | null;

export interface ListItem {
  id: number;
  word: string;
  exampleSentence: string;
  tries: number;
  correct: number;
  wrong: number;
}

export interface List {
  id: number;
  createdDate:  Date;
  year: number;
  difficulty: string;
  name: string;
  description: string;
  words: ListItem[]; 
  completed: boolean;
  completedDate: Nullable<Date>;
}

export interface Lists {
  id: number;
  name: string;
  owner: number;  
  lists: List[];
}

