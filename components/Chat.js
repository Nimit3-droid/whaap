import styled from "styled-components"
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar} from "@material-ui/core"
import getRecipientEmail from "../utils/getRecipientEmail"
import {db, auth} from "../firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";

function Chat({id,users}) {
    const router =useRouter();
    const [user]=useAuthState(auth);
    const [recipientSnapshot]=useCollection(db.collection("users").where("email","==",getRecipientEmail(users,user)))

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    
    const recipient=recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail=getRecipientEmail(users,user)
    return (
        <Container onClick={enterChat}>
            {recipient?(
                <UserAvatar src={recipient?.photoURL} />
            ):(
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            
            <p>{recipientEmail.split("@")[0].charAt(0).toUpperCase() + recipientEmail.split("@")[0].slice(1)}</p>
        </Container>
    )
}

export default Chat

const Container=styled.div`
    display:flex;
    align-items:center;
    cursor:center;
    padding:15px;
    word-break:break-word;
    border-bottom:1px solid #4f5152;
    color:white;
    
    :hover{
        background-color:#2a2e38;
        cursor:pointer;
    }
`;
const UserAvatar=styled(Avatar)`
    margin:5px;
    margin-right:15px;
`;