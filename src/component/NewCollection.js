import { addDoc,collection } from 'firebase/firestore';
import React,{useState} from 'react'
import { database, } from '../firebaseConfig';
const NewCollection = () => {
    

    const [data, setData] = useState({});
    const collectionRef = collection(database,"data") 

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({ ...data, ...newInput });
  };
  //function to create a table
  const createCollection =()=>{
    console.log("called")
    addDoc(collectionRef,{
        email:data.email,
        age:data.age,
        name:data.name
    })
    .then(()=>{
        alert("Data Added")
    })
    .catch((err)=>{
        console.log(err);
    })
  }
  return (
    <>
    <input
        name="email"
        placeholder="Email"
        onChange={(e) => handleInput(e)}
      />
      <input
        name="age"
        placeholder="Age"
        onChange={(e) => handleInput(e)}
      />
      <input
        name="name"
        placeholder="Name"
        onChange={(e) => handleInput(e)}
      />
      
      
      <button onClick={createCollection}>Create Collection</button>
    </>
  )
}

export default NewCollection
