import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, Query, where } from "firebase/firestore";
import  Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import MessegeBar from "../components/MessegeBar";
import Sidebar from "../components/sidebar";
import app from "../utils/firebase";
import {onAuthStateChanged} from 'firebase/auth'

 
export async function getServerSideProps(context){

    const id = context.params.id;

    const {uid, email} = context.query; 
 
    const db = getFirestore(app);
  
    let chats = [];

    let messeges = [];

    let currentUser = {};
  
    var chatSnapshot = await getDocs(collection(db, "Chats"))
      
    chatSnapshot.forEach((doc)=>{
      chats = chats.concat({id: doc.id, ...doc.data()});
  
    })

    console.log(uid+", "+email)
  
    var q = query(collection(db, "Messeges"), where("chatId", "==", id))
    var messegeSnapshot = await getDocs(q);

    messegeSnapshot.forEach((doc)=>{
      var date = new Date(doc.data().timeStamp.seconds);
        messeges = messeges.concat({id: doc.id, amISender: doc.data().senderId == uid, ...doc.data(), timeStamp: date.getHours()+":"+date.getMinutes()})
    })

    var currentChat = chats.find(chat => chat.id == id);
    console.log(currentChat);

    var currentEmail = currentChat.users.find(per => per != email);
    console.log(currentEmail)

    var q = query(collection(db, "Users"), where("email","==",currentEmail))

    var qSnap = await getDocs(q);

    currentUser = {...qSnap.docs[0]?.data(), email:currentEmail}

    return {
      props: {
        chats: chats,
        chatId: id,
        messeges: messeges,
        currentUser: currentUser
      }
    }
  }

function Messeges({chats, chatId, messeges, currentUser}) {
    const [user] = useAuthState(getAuth(app))

    if(user){
        console.log()
        return (
            <div>
              <Head>
                <title>WhatsApp Clone</title>
                <meta name="description" content="Generated by Me" />
                <link rel="icon" href="/favicon.ico" />
              </Head>
        
              <Main>
                <Sidebar chats={chats}/>
                <MessegeBar user={user} chatId={chatId} messeges={messeges} currentUser={currentUser}/>
              </Main>
        
        
                
            </div>  
          )
    }
}

export default Messeges

const Main = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
