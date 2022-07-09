import { createContext, useState } from 'react';

type UserProviderResult = ReturnType<typeof UserProvider>;
const UserContext = createContext<UserProviderResult>({
    user: {
        id: 1,
        name: '',
        score: 0,
        drills: 0,
        correct: 0,
        incorrect: 0,
        avatar: '',
    },
    setUser: () => {},
});

export default UserContext



export function UserProvider({children}){
    const [user, setUser] = useState({});

    return(
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    );
}