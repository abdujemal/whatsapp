import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert } from "@material-ui/icons";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import styled from "styled-components";
import MsgInput from "./MsgInput";
import MsgLayout from "./MsgLayout";
import app from "../utils/firebase";
import moment from "moment";

function MessegeBar({user, chatId, messeges, currentUser}) { 
    console.log(messeges)  

    return (
        <Main>
            <Header>
                {
                    currentUser.photoUrl ?
                    <Avatar src={currentUser.photoUrl}/>
                    :
                    <Avatar>{currentUser.email[0]}</Avatar>
                }
                
                <TextContainer>
                    <Email>{currentUser.email}</Email><br/>
                    <LastSeen>Last active:  { currentUser.lastSeen ? moment(currentUser.lastSeen): "UnAvailable"}</LastSeen>
                </TextContainer>
                <IconContainer>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </IconContainer>
            </Header>
            <MsgLayout messeges={messeges} user={user} id={chatId}/>
            <MsgInput chatId={chatId} uid={user.uid}/>    

        </Main>
    )
}

export default MessegeBar

const Main = styled.div`
    flex: 0.7;
    height: 100vh;
    background-color: rgba(0,255,0,.1);
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    padding: 15px;
    background-color: white;
    border-bottom: 2px solid whitesmoke;
    position: sticky;
    top: 0;
    z-index: 100;
`;

const TextContainer = styled.div`
    flex: 1;
    margin-left: 15px;
    margin-right: 15px;


`;

const Email = styled.p`
    display: inline;
    font-weight: 700;
    padding: 0px !important;
`;


const LastSeen = styled.p`
    display: inline;
    font-weight: 100;
    padding: 0px !important;
`;

const IconContainer = styled.div`
    display: flex;
`;


