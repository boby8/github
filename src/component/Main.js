import React from "react";
import { useState } from "react";
import { app,database,storage } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { collection,addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";

const Main = () => {
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  const [data, setData] = useState({});
  const collectionRef = collection(database,"users")

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({ ...data, ...newInput });
  };
  //signup with email and password
  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

//login with email and passowrd
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //sign out 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        alert(err.message);
      });
  };

  //login with google. 
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function to create a table
  const createCollection =()=>{
    addDoc(collectionRef,{
        email:data.email,
        password:data.password
    })
    .then(()=>{
        alert("Data Added")
    })
    .catch((err)=>{
        console.log(err);
    })
  }
  //read data from firebase

  const getFirebaseData =()=>{
    getDocs(collectionRef).then((res)=>{
        console.log(res.docs.map((i)=>{
            return {...i.data(),id:i.id}
        }))
    })
  }


  // updateFirebaseData

  const updateFirebaseData=()=>{
    const docToUpdate  = doc(database,"users","aMwoQKfAFUngzMho7g8i");
    updateDoc(docToUpdate,{
        email:data.email,
        //password:data.password incase if you want to update one field at a time
    })
    .then(()=>{
        alert("Data updated")
    })
    .catch((err)=>{
        alert(err.message)
    })
  }
  // updateFirebaseData with new value

  const getArtists = async () => {
    const musicartArtistsRef = await getDocs(collection(database, 'users'),
    );
  console.log(musicartArtistsRef,"-------------")}
useEffect(()=>{
 getArtists()
},[])
  const updateWithNewFirebaseData=()=>{
    const docToUpdate  = doc(database,"users","7IccjvqbYnQ7OHS871q5");
    updateDoc(docToUpdate,{
        isUpdated:true,
    })
    .then(()=>{
        alert("Data updated")
    })
    .catch((err)=>{
        alert(err.message)
    })
  }

  //delete data from collection

  const deleteData =()=>{
    const docToDelete = doc(database,"users","aMwoQKfAFUngzMho7g8i");
    deleteDoc(docToDelete)
        
    .then(()=>{
        alert("Data deleted")
    })
    .catch((err)=>{
        alert(err.message)
    })
  }



  const getData=()=>{
     onSnapshot(collectionRef,(data)=>{
        console.log(data.docs.map((item)=>{
            return item.data();
        }));
    })
  }

  useEffect(()=>{
    getData();
  },[])
  return (
    <>
      <input
        name="email"
        placeholder="Email"
        onChange={(e) => handleInput(e)}
      />
      <input
        name="password"
        placeholder="Password"
        onChange={(e) => handleInput(e)}
      />
      <br />
      <button onClick={handleSubmit}>SignUp</button> <br />
      <button onClick={handleSignIn}>SignIn</button> <br />
      <button onClick={handleSignOut}>SignOut</button> <br />
      <button onClick={loginWithGoogle}>LoginwithGoogle</button> <br />
      <button onClick={createCollection}>CreateCollection</button> <br />
      <button onClick={getFirebaseData}>getFirebaseData</button> <br />
      <button onClick={updateFirebaseData}>Update firebase data</button> <br />
      <button onClick={deleteData}>delete firebase data</button> <br />
      <button onClick={updateWithNewFirebaseData}>Update fire with new val data</button> <br />

    </>
  );
};

export default Main;
