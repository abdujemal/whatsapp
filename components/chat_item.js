import { Avatar } from "@material-ui/core";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import app from "../utils/firebase";
import Link from 'next/link'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";


function ChatItem({id, users}) {
  const [user] = useAuthState(getAuth(app))

  const db = getFirestore(app);

  const recipientEmail = users.filter(email => email != user.email)[0];

  const [imgUrl, setImgUrl] = useState("");

  getDoc(doc(db, "Users", recipientEmail)).then((doc)=>{
    if(doc.exists()){
       setImgUrl(doc.data().photoUrl)
    }
  });


  return (
    <Link href={"/"+id+`?uid=${user.uid}&email=${user.email}`}>
      <Container>
        {
          imgUrl ?
          <Avatar src={imgUrl}/>
        :
        <Avatar>{recipientEmail[0]}</Avatar>         
       
        }
        <Email>{recipientEmail}</Email>
      </Container>
    </Link>
    
  )
}

export default ChatItem

const Container = styled.div`
 display: flex;
 align-items:center;
 padding: 15px;
 flex:1;
 :hover{
    background-color: whitesmoke;
    cursor: pointer;
 };

`;
const Email = styled.p`
    margin-left: 10px;
    word-break: break-word;
`;