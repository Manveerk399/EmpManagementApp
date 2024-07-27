import {
  uploadBytes,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase/config";
import { Linking } from "react-native";


export const uploadfile = async (doctype,file,filename) => {

  console.log('uploading',file,doctype)

   const response = await fetch(file.uri)
   const blob = await response.blob()


   console.log('blob',blob)

   
    
    if (file == null) return;

    try{
        // Specify metadata including the MIME type
    
    const docRef = ref(storage, `${doctype}/${filename}`);
    const response = await uploadBytes(docRef,blob);

    return response.metadata.fullPath

    }catch(error){
      console.log(error)
    }

  };



export const downloadFile = async (path) => {
    try {
      const fileRef = ref(storage, path);
      const downloadUrl = await getDownloadURL(fileRef);

      console.log(downloadUrl)

      await Linking.openURL(downloadUrl)

      
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };