import styled from "styled-components";
import {auth} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import moment from 'moment';

function Message({user,message}) {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user == userLoggedIn.email?Sender:Reciever;

    return (
        <Container>
            <TypeOfMessage>{message.message}
            <Timestamp>
                {message.timestamp?moment(message.timestamp).format('LT'): '...'}
            </Timestamp>
            </TypeOfMessage>
            
        </Container>
    )
}

export default Message;
const Container=styled.div``;

const MessageElement = styled.p`
    width:fit-content;
    max-width:75vh;
    padding-left: 15px;    
    padding-right: 5px;    
    padding-top: 2px;    
    border-radius:8px;
    margin:10px;
    min-width:60px;
    position:relative;
    text-align:right;
    color:white;
`;
const Sender=styled(MessageElement)`
    margin-left:auto;
    background-color:#056162;
`;
const Reciever=styled(MessageElement)`
    
    text-align:left;
    background-color:#262d31;
`;
const Timestamp=styled.div`
    font-size:11px;
    margin-top:10px;
`;
