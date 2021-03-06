import {Avatar, IconButton, Button} from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import {auth,db} from "../firebase";
import Chat from "../components/Chat"
function Sidebar() {
const [user]=useAuthState(auth);
const userChatRef=db.collection('chats').where('users','array-contains',user.email);
const [chatsSnapshot]=useCollection(userChatRef);
const createChat=()=>{
    const input=prompt('');

    if(!input)return null;
    if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !==user.email){
        //we need to add chat
        db.collection('chats').add({
            users:[user.email,input],
        });
    }
};

const chatAlreadyExists=(recipientEmail)=>
    !!chatsSnapshot?.docs.find((chat)=>chat.data().users.find((user)=>user===recipientEmail)?.length>0);


    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={()=>auth.signOut()}/>
                <div> {user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)}</div>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search Chat"/>
            </Search>
            <SidebarButton onClick={createChat}>New Chat</SidebarButton>
            {chatsSnapshot?.docs.map((chat)=>(
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ))
            }
        </Container>
    )
}

export default Sidebar;

const Container=styled.div`
    flex:0.45;
    border-right:1px solid #4f5152;
    background-color:#131c21;
    color:white;
    height:100vh;
    min-width:300px;
    max-width:300px;
    overflow:scroll;
    ::-webkit-scrollbar{
        display:none;
    }
    -ms-overflow-style:none;
    scrollbar-width:none;
`;
const Header=styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color:#131c21;
    z-index:1;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:80px;
    border-bottom:1px solid #4f5152;
    border-right:1px solid #4f5152;
`;
const UserAvatar=styled(Avatar)`
    margin : 10px;
    cursor:pointer;
    :hover{
        opacity:0.8;
    }
`;
// const IconsContainer=styled.div`
// color:white;`;
const Search=styled.div`
    display:flex;
    align-items:center;
    padding:5px;
    border-radius:2px;
`;
const SearchInput=styled.input`
    outline-width:0;
    color:white;
    background-color:#131c21;
    border:none;
    flex:1;
`;
const SidebarButton=styled(Button)`
    width:100%;
    
    background-color:#131c21;
    &&&{
        border-top: 1px solid #4f5152;
        border-bottom: 1px solid #4f5152;
        color:white;
    }
`;