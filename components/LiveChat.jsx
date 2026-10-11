
import { BsChevronDown } from "react-icons/bs";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { TfiClose } from "react-icons/tfi";
import ChatMessage from "./ChatMessage";
import { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../utils/chatSlice";
import messages, { generateRandomMessage, generateRandomNames } from "../utils/helper";
import { CiHeart } from "react-icons/ci";
import { GoSmiley } from "react-icons/go";
import { VscSend } from "react-icons/vsc";


const LiveChat = () => {



    const dispatch = useDispatch();

    const chatMessage = useSelector(store => store.chat.messages);

    const [liveMessage,setLiveMessage] = useState("");

    useEffect(() => {
       const i = setInterval(() => {

        dispatch(addMessages( {
            name: generateRandomNames(),
            message:  generateRandomMessage(),
        }))

        },1500)

    return () => clearInterval(i);

    },[])

   

    return(
        <div className="live-chat-container">
            <div className="live-chat-wrap">

            
            <div className="header-live-chat">
                <div className="header-left" >
                    <p>Live chat</p>
                    <BsChevronDown color="black"/>
                </div>
                <div className="header-right">
                    <HiOutlineDotsVertical  size={20}/>
                    <TfiClose size={22} />
                </div>            
            </div>
                <div >
                    <div className="chat-box">
                    {
                        chatMessage.map((c,i) =>   <ChatMessage  key={i} name={c.name} message={c.message} />)
                       
                    }
                    </div>
                    <form  className="chat-input-button-container" onSubmit={(e) => {
                        e.preventDefault();
                        console.log(liveMessage)
                        dispatch(
                            addMessages({
                                name:'Suchi', 
                                message: liveMessage,
                            })
                        )
                    }}>
                        <div className="input-smile-container">
                             <input placeholder="Chat..."  value={liveMessage}  onChange={(e) => setLiveMessage(e.target.value)} />  
                             <GoSmiley size={24} className="smiley" />
                        </div>
                       
                        <div className="chat-dollar">
                          <VscSend  size={23}/>
                        </div>

                        <div className="chat-love">
                            <CiHeart size={30}/>
                        </div>

                      

                    </form>
                 
                   
                </div>
            </div>
        </div>
    )
}


export default LiveChat;