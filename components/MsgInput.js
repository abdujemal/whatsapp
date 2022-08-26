import { IconButton } from "@material-ui/core";
import { FaceRounded, Send } from "@material-ui/icons";
import { addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import app from "../utils/firebase";


function MsgInput({uid, chatId}) {
    console.log(uid)
    
    const [chat, setChat] = useState("")

    const sendMessge = ()=>{
        

        const db = getFirestore(app)

        addDoc(collection(db, "Messeges"), {
            chatId: chatId,
            senderId: uid,
            timeStamp: serverTimestamp(),
            text: chat,
            seen: false,
        })

        updateDoc(doc(db, "Users", uid), {
            lastSeen: serverTimestamp()
        })

        setChat("")
    };

    return (
        <Main>
            <IconButton>
                <FaceRounded/>
            </IconButton>
            <InputContainer>
                <MyInput value={chat} onChange={(e)=>setChat(e.target.value)}/>
                <IconButton onClick={()=>sendMessge()}>
                    <Send/>
                </IconButton>
            </InputContainer>
        </Main>
        
    )
}

export default MsgInput

const Main = styled.div`
    padding: 10px;
    display: flex;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const InputContainer = styled.div`
    border-radius: 15px;
    background-color: whitesmoke;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MyInput = styled.input`
    width: 100%;
    padding: 5px;
    outline-width: 0px;
    border: none;    
    background-color: whitesmoke;
`;
