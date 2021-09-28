import React from "react";
import {server_ip}  from '../../../App'

let ws;
class ChatForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            messages:[],
            nickname:null,
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
        messages.push(e.data);
        this.setState({
            messages:messages
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
    renderChatForm=()=>{
        return(
            <div>
                <div
                    ref={div=>this.messagesRef=div}
                    style={{
                        width:"100%",
                        height:"600px",
                        border:"1px solid #ccc",
                        overflow:"scroll",
                        padding:"8px"
                    }}
                >
                    {this.getMessageContent()}
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
