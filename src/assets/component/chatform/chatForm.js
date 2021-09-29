import React from "react";
import {server_ip}  from '../../../App'

let ws;

class ChatForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            messages:[],
            nickname:null,
            onlineUsers:[]
        }
    }

    nickNameInputRef=React.createRef();
    messageInputRef=React.createRef();
    messagesRef=React.createRef();

    scrollToBottom=()=>{
        if (this.messagesRef) {
            const scrollHeight = this.messagesRef.scrollHeight;
            const height = this.messagesRef.clientHeight;
            const maxScrollTop = scrollHeight - height;
            this.messagesRef.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    confirmNickname=()=>{
        let nickname=this.nickNameInputRef.value;
        this.setState({
            nickname:nickname,
            messages:[]
        })
        ws=new WebSocket("ws://"+server_ip+"/chat/"+nickname);
        ws.onmessage=this.onMessage;


    }

    waitForConnection=(callback,interval)=>{
        if(ws.readyState===1){
            callback();
        } else {
            setTimeout(()=>{
                this.waitForConnection(callback,interval);
            },interval)
        }
    }

    sendMessage=(message)=>{
        this.waitForConnection(()=>{
            ws.send(message);
        })
    }

    onClickSendMessage=()=>{
        let message=this.messageInputRef.value;
        if(message.length===0)
            return;
        this.sendMessage(message);
        this.messageInputRef.value="";
    }

    onMessage=(e)=>{
        let messages=this.state.messages;
        let onlineUsers=this.state.onlineUsers;
        let data=JSON.parse(e.data);
        let message;
        if(data.type==="join")
        {
            message="["+data.username+"]加入了聊天室！";
            onlineUsers.push(data.username);
        }
        else if(data.type==="exit")
        {
            message = "[" + data.username + "]离开了聊天室！"
            let index=onlineUsers.indexOf(data.username);
            onlineUsers.splice(index,1);
        }
        else if(data.type==="message")
            message=data.message;
        else if(data.type==="update")
        {
            onlineUsers=[];

            let usernames=JSON.parse(data.usernames);
            console.log(usernames)
            usernames.map((username)=>{
                onlineUsers.push(username);
            })
        }
        messages.push(message);
        this.setState({
            messages:messages,
            onlineUsers:onlineUsers
        })
        this.scrollToBottom();
    }



    renderNicknameInput=()=>{
        return(
            <div>
                <div>
                    <span>请输入你加入聊天室的昵称：</span>
                    <input ref={input=>this.nickNameInputRef=input} type="text" id="nickname" placeholder="昵称"/>
                    <button onClick={this.confirmNickname}>确定</button>
                </div>
            </div>
        )
    }

    getMessageContent=()=> {
        let content=[];
        let message=this.state.messages;
        for(let i=0;i<message.length;i++)
            content.push(<div
                key={i}
                style={{
                    fontSize:"15px",
                }}
            >{message[i]}</div>)
        return content;
    }

    renderOnlineUsers=()=>{
        let content=[];
        let onlineUsers=this.state.onlineUsers;
        content.push(<div
            key={"hahaha"}
            style={{
                fontSize:"15px",
            }}
        >{"当前在线人数 " + onlineUsers.length}</div>);
        for(let i=0;i<onlineUsers.length;i++)
            content.push(<div
                style={{
                    fontSize:"15px",
                }}
            >
                {onlineUsers[i]}
            </div>)
        return content;
    }

    renderChatForm=()=>{
        return(
            <div>
                <div
                    style={{
                        width:"100%",
                        display:"flex"
                    }}
                >
                    <div
                        ref={div=>this.messagesRef=div}
                        style={{
                            width:"100%",
                            height:"600px",
                            border:"1px solid #ccc",
                            overflow:"scroll",
                            padding:"8px",
                            flexGrow:1
                        }}
                    >
                        {this.getMessageContent()}
                    </div>
                    <div
                        style={{
                            width:"200px",
                            height:"600px",
                            border:"1px solid #ccc",
                            overflow:"scroll",
                            padding:"8px"
                        }}
                    >
                        {this.renderOnlineUsers()}
                    </div>
                </div>
                <div
                    style={{
                        display:"flex"
                    }}
                >
                    <input
                        style={{
                            flexGrow:1
                        }}
                        ref={input=>this.messageInputRef=input} type="text" id={"message"} onKeyPress={(e)=>{ if(e.key==="Enter") this.onClickSendMessage()}} />
                    <button onClick={this.onClickSendMessage}>发送</button>
                </div>
            </div>
        )
    }

    render=()=>{
        if(!this.state.nickname)
            return(
                <div
                    style={{
                        width:"90%",
                        margin:"auto"
                    }}
                >
                    {this.renderNicknameInput()}
                </div>
            )
        else {
            return (
                <div
                    style={{
                        width:"90%",
                        margin:"auto"
                    }}
                >
                    {this.renderChatForm()}
                </div>
            )
        }
    }
}

export {ChatForm}
