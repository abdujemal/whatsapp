import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { useState } from "react"
import styled from "styled-components"
import app from "../utils/firebase"
import MessegeItem from './MessegeItem'


function MsgLayout({messeges, user, id}) {
  const [messegeList, setMessegeList] = useState(messeges)
  
  const db = getFirestore(app)


    
  var q =query(collection(db, "Messeges"), where("chatId", "==", id))
  getDocs(q).then((messegeSnapshot)=>{
      let map = [];
      messegeSnapshot.forEach((doc)=>{
          var date = new Date(doc.data().timeStamp?.seconds);
          map = messeges.concat({id: doc.id, amISender: doc.data().senderId != user.uid, ...doc.data(), timeStamp: date.getHours()+":"+date.getMinutes()})
         
      })
      
      setMessegeList(map)
  });

  
  return (
    <Main>
      {

        messegeList
        .map(msg => (
        
          <MessegeItem text={msg.text} time={msg.timeStamp} amIASender={msg.amISender}/>
        ))
      } 
      </Main>
  )
}


export default MsgLayout

const Main = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width:none;
  
`;