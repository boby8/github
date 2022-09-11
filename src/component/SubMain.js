import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { useState } from "react";
import { storage } from "../firebaseConfig";

const SubMain = () => {
  const [data, setData] = useState({});


  // upload file on filebase
  const handleSubmit = (e) => {
    console.log(data);
    const storageRef = ref(storage, `images/${data.name}`); //in order to store file inside a folder
    const storageReff = ref(storage, data.name);
    const uploadTask = uploadBytes(storageRef, data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          setData(e.target.files[0]);
        }}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>{" "}
    </>
  );
};

export default SubMain;
