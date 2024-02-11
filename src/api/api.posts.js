import { collection, getDocs, addDoc, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"; 
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import db from '../config/firebase'


const ApiPosts = {
  async GetById(id) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();      
      data.id = id;

      const image = await this.LoadImage(data);
      
      return {
        image,
        ...data,
      };
    }
      else
      return {};
  },

  async GetAll(loadImages = false) {
    let result = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot
      .forEach((doc) => {
        let post = {
          ...doc.data(),
          id: doc.id,
        }
        result.push(post)
      }
    );

    if (loadImages)
      for(let i = 0; i < result.length; i++)
        result[i].image = await this.LoadImage(result[i]);
    
    result.sort((a, b) => b.datetime - a.datetime);
    return result;
  },

  async Add(post) {
    try {
      let data = {
        category: post.category,
        title: post.title.trim(),
        author: post.author ? post.author : 'anonim',
        content: post.content.trim(),
        datetime: new Date().getTime(),
      }
      
      
      if (post.image)
        data.imagename = post.image.name;
      
      const doc = await addDoc(collection(db, "posts"), data)
      await this.UploadImage(doc.id, post.image);

      return true;
    } 
    catch (e) {
      alert('Add Post:', e);
      return false;
    }
  },

  async Update(id, post) {
    try {
      const docRef = doc(db, "posts", id)

      let data = {
        category: post.category,
        title: post.title.trim(),
        author: post.author ? post.author : 'anonim',
        content: post.content.trim(),
        datetime: new Date().getTime(),
      }

      if (post.image) {
        data.imagename = post.image.name;
        await this.UploadImage(id, post.image);
      }

      await setDoc(docRef, data);
      return true;
    } 
    catch(e) {
      alert('Update Post: ',e);
      return false;
    }
  },

  async Delete(id) {
    try {
      await deleteDoc(doc(db, "posts", id));
      await this.DeleteImage(id);

      return true;
    } 
    catch(e) {
      alert('Delete Post: ', e);
      return false;
    }
  },

  async LoadImage(post) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${post.id}/${post.imagename}`)
    const url = await getDownloadURL(storageRef).catch(() => null);
    
    return url;
  },

  async UploadImage(id, image) {
    console.log('ok');
    if (image == null) 
      return;
    this.DeleteImage(id);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${id}/${image.name}`);
    console.log(storageRef)
    const snapshot = await uploadBytes(storageRef, image);
    return snapshot;
  },
  
  async DeleteImage(post) {
    const storage = getStorage();
    const desertRef = ref(storage, `images/${post.id}/${post.imagename}`);

    deleteObject(desertRef).catch(e => null);
  }
}

export default ApiPosts;