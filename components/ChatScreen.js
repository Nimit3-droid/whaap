import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {db,auth} from "../firebase";
import {useRouter} from "next/router";
import {Avatar} from "@material-ui/core";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState,useRef} from "react";
import firebase from "firebase"
import getRecipientEmail from "../utils/getRecipientEmail";
import Message from "./Message";
import TimeAgo from "timeago-react"


function ChatScreen({chat,messages}) {
    const [user] =useAuthState(auth);
    const [input,setInput]=useState("");
    const endOfMessagesRef=useRef(null);
    const router =useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==',getRecipientEmail(chat.users,user)));
    const showMessages=()=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message => (
                <Message 
                    key={message.id} 
                    user={message.data().user}
                    message={{...message.data(),
                            timestamp:message.data().timestamp?.toDate().getTime(),
                            }}/>
            ));
        }else{
            return JSON.parse(messages).map(message=>(
                <Message 
                    key={message.id} 
                    user={message.user}
                    message={message}/>
            ));
        }
    };
    const scrollToBottom =()=>{
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: "start",
        })
    }
    const sendMessage=(e)=>{
        e.preventDefault();

        db.collection('users').doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        },{merge:true});

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        });
        setInput("");
        scrollToBottom();
    };
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail=getRecipientEmail(chat.users,user);
    return (
        <Container>
          <Header>
              {recipient?(
                  <Avatar src={recipient?.photoURL} />
              ):(
                <Avatar>{recipientEmail[0]}</Avatar>
                )}
            <HeaderInformation>
                <h3>{recipientEmail.split("@")[0].charAt(0).toUpperCase() + recipientEmail.split("@")[0].slice(1)}</h3>
                {recipientSnapshot?(
                 <p>Lastseen ... {' '}
                 {recipient?.lastSeen?.toDate()?(
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                 ): "offLine"}
                    </p>
                ):(
                    <p>Loading </p>
                )}
            </HeaderInformation>
          </Header>

          <MessageContainer>
            {showMessages()}
            <EndOfMessage ref = {endOfMessagesRef} />
          </MessageContainer>

          <InputContainer>
            <Input value={input} onChange={e=>setInput(e.target.value)  }placeholder="Type a Message ..."/>
            <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send</button>
          </InputContainer>
        </Container>
    )
}

export default ChatScreen;
const Container = styled.div`

`;
const Header=styled.div`
    position:sticky;
    background-color: #131c21;
    z-index:100;
    top:0;
    display:flex;
    padding:11px;
    height:80px;
    align-items:center;
    border-bottom:1px solid #4f5152;
    color:white;
`;
const HeaderInformation=styled.div`
    margin-left:15px;
    flex:1;
    >h3{
        margin-bottom:3px;
    }
    >p{
        font-size:14px;
        color:gray;
    }

`;
// const HeaderIcons=styled.div``;
const MessageContainer=styled.div`
    padding:30px;
    background-color:#12191d;
    min-height:90vh;
`;
const EndOfMessage=styled.div`
    margin-bottom:50px;
`;
const InputContainer=styled.form`
    display:flex;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:#1e2428;
    z-index:100;
`;
const Input=styled.input`
    flex:1;
    outline:0;
    border:none;
    border-radius:10px;
    background-color:#33383b;
    padding:20px;
    margin-left:15px;
    margin-right:15px;
    color:white;
`;
