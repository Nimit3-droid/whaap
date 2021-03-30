import styled from "styled-components"
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
function Login() {
const signIn=()=>{
    auth.signInWithPopup(provider).catch(alert);
};
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <Logincontainer>
                <Logo src="https://image.freepik.com/free-vector/chat-logo-design_93835-108.jpg"/>
                <Button onClick={signIn} varient="outlined">Sign in with Google!!!..</Button>
            </Logincontainer>
        </Container>
    )
}

export default Login;

const Container =styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color:#3366ff;
`;
const Logincontainer=styled.div`
    display:flex;
    flex-direction:column;
    padding:100px;
    align-items:center;
    background-color:white;
    border-radius:9px;
    box-shadow:0px 4px 14px -3px rgba(0,0,0,0.7);
`;
const Logo=styled.img`
    height:200px;
    width:200px;
    margin-button:50px;    
`;