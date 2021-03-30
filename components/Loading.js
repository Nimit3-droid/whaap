// import {CircleLoader} from "better-react-spinkit"
function Loading() {
    return (
        <center style={{display:"grid", placeItems:"center", height:"100vh"}}>
            <div>
                <img src="https://image.freepik.com/free-vector/chat-logo-design_93835-108.jpg" 
                alt="Loading..." 
                height={200} 
                style={{marginBottom:10}}/>
                {/* <CircleLoader color="#3366ff"/> */}
            </div>
        </center>
    )
}

export default Loading
