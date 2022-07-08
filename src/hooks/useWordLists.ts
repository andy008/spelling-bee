import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { analytics } from "ionicons/icons";

const LIST_STORAGE = 'lists';

export function useLists():any {


    console.log('Use Lists!');

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
                }
                ],
                completed: false,
                completedDate: null
            }
        ]
    } 
    
    const [wordLists, setWordLists] = useState<Lists>(wordListsDefault);

    useEffect(() => {
        console.log('Use effect ran');  
        getList();
    },[]);
   
  
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
        wordLists
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

