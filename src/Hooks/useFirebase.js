import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase-init";

initializeAuthentication();

const useFirebase = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [formMsg, setFormMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const createDataUser = (newUser) => {
    fetch("https://desolate-wave-42377.herokuapp.com/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.acknowledged);
      });
  };

  const googleSignIn = (history, location) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const person = result.user;
        const dataUser = {
          name: person.displayName,
          email: person.email,
        };
        createDataUser(dataUser);
        setUser(person);
        history.push(location);
      })
      .catch((error) => setFormMsg(error.message));
  };

  const createNewUser = (email, password, username) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        }).then(() => {
          setIsLoading(false);
          setFormMsg("Account created. Please Login!");
        });
      })
      .catch((error) => {
        setFormMsg(error.message);
      });
  };

  const emailLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = (history) => {
    signOut(auth)
      .then(() => {
        history.push("/");
        setUser({});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    createNewUser,
    emailLogin,
    user,
    setUser,
    formMsg,
    setFormMsg,
    isLoading,
    setIsLoading,
    googleSignIn,
    loading,
    setLoading,
    handleLogout,
    createDataUser,
  };
};

export default useFirebase;
