import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const UserContext = createContext();

export function useAuth() {
  return useContext(UserContext);
}

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password).then((res) => console.log(res));
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then((res) => console.log(res));
  const signOut = () => auth.signOut();
  const getUser = () => auth.currentUser;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUser,
    getUser,
    login,
    signUp,
    signOut
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
