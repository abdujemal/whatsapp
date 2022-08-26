import { initializeApp, getApps, getApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBXiy3TjSupjdTp_DHbsfSpuqsH-rgRk6Q",
  authDomain: "whatsapp-1b71a.firebaseapp.com",
  projectId: "whatsapp-1b71a",
  storageBucket: "whatsapp-1b71a.appspot.com",
  messagingSenderId: "370659017017",
  appId: "1:370659017017:web:67ec2e7fc7c0c7cfa4e8e8",
  measurementId: "G-F062P2FEFY"
};
const app = getApps.length ? getApps[0] : initializeApp(firebaseConfig)

console.log(app.options.authDomain);

export default app