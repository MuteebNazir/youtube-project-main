


const ChatMessage = ({name,message}) => {


    return (
        <div className="chat-container">
            
            <div className="chat-message-wrapper">
                <div className="chat-image-container">
                    <img
                        src="https://yt3.ggpht.com/ytc/AIdro_meLtS1C8gl1i7ctdw977aqXq65ZlRYz3nJcpNHxhajLNpRpb2AVHlBghoDuIef2xu6gQ=s48-c-k-c0x00ffffff-no-rj"
                        alt="profile"
                    />
                </div>
                <div className="chat-text-block">
                    <span className="chat-username">{name}</span>
                    <span className="chat-message">
                        {message}
                    </span>
                </div>
            </div>



        </div>
    );
};

export default ChatMessage;
