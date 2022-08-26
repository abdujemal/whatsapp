import {Avatar, Button, IconButton} from '@material-ui/core'
import styled from 'styled-components'
import {MoreVert, Chat, Search} from '@material-ui/icons';
import ChatItem from './chat_item';
import EmailValidator from 'email-validator'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import app from '../utils/firebase';
import {getFirestore, addDoc, collection, getDoc, query, doc, where, orderBy, getDocs} from 'firebase/firestore'
import { useState } from 'react';
import {Circle} from 'better-react-spinkit'


function Sidebar({chats}) {
  

  const [user] = useAuthState(getAuth(app));

  const [chatList, setChatList] = useState(chats)

  const db = getFirestore(app);

  getDocs(collection(db, "Chats")).then((querySnapshot)=>{
    let map = []
    querySnapshot.forEach((doc)=>{
      map = map.concat({id: doc.id, ...doc.data()});

    })
   setChatList(map)
   
  })


 
  const createMsg = ()=>{
    const input = prompt("Write An Email");


    if(!input) return;

    if(EmailValidator.validate(input) && 
    input != user.email ){ 
      addDoc(collection(db, "Chats"), {
        users: [user.email, input]
      });
    }


  }

  if(!user){
    return <Circle/>
  }

  return (
    <Main>
      <Header>
        <UserAvatar onClick={()=>getAuth(app).signOut()} src={user.photoURL}/>
        <IconContainer>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <MoreIcon/>
          </IconButton >
        </IconContainer>
        </Header>
        <NewMsgBtn onClick={()=>createMsg()}>Start New Chat</NewMsgBtn>
        <SearchBar>
          <SearchIcon/>
          <Input placeholder='Search in chats'/>
        </SearchBar>

        <ChatContainer >
          {
            chatList.map(chat=>(
              <ChatItem id={chat.id} users={chat.users}/>

            ))
          }
          
        </ChatContainer>



    </Main>
  )
}

export default Sidebar

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 2px solid whitesmoke;
  @media (min-width: 768px) {
        flex: 0.3
    }
`;

const Header = styled.div`
  padding: 15px;
  height: 80px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  border-bottom: 2px solid whitesmoke;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const UserAvatar = styled(Avatar)`
  :hover{
    cursor: pointer;
  };
 
`;

const IconContainer = styled.div`
color:grey;
`;

const ChatIcon = styled(Chat)`
  color: grey;
  margin-right: 5px;
`;

const MoreIcon = styled(MoreVert)`

`;

const SearchBar = styled.div`
  margin-left: 15px;
  display: flex ;
  padding-top: 15px;
`;

const SearchIcon = styled(Search)`

`;

const Input = styled.input`
  flex: 1;
  outline-width: 0px;
  border: none;
  color: grey;
  font-size: .76em;


`;
const ChatContainer = styled.div`
  flex: 1;
  margin-top: 15px;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width:none;
  
`;

const NewMsgBtn = styled(Button)`
 /* padding-left: auto !important;
 padding-right: auto !important; */
 padding: 15px !important;
 width: 100%;

`;
