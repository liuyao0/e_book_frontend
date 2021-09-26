import './leftcolumn.css';
import React from 'react';
import './iconfont.css';
import DisplayinturnComponent from "../displayinturn/dispalyinturn";


class Leftcolumn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            display:false
        };
    }

    pullLeft=()=>{
        this.setState({
            display:true
        });
    }

    pushLeft=()=>{
        this.setState({
            display:false
        })
    }
    render=()=>{
        return(
            <div>
                <div onMouseLeave={this.pushLeft.bind(this)} className={["left-holder",this.state.display?'canbeseen':'cannotbeseen'].join(' ')}>
                    <div className="sep-line"/>
                    <div className="fun-holder">
                        <a href="/chatroom">聊天室</a>
                    </div>
                    <div className="sep-line"/>
                    <div className="fun-holder">
                        <a href="/cart">购物车</a>
                    </div>
                    <div className="sep-line"/>
                    <div className="fun-holder">
                        <a href="/me">个人中心</a>
                    </div>
                    <div className="sep-line"/>
                    <div className="fun-holder">
                        <a href="/bookinfostore">书籍信息库</a>
                    </div>

                </div>
            <div onMouseOver={this.pullLeft.bind(this)}  className={["icon-left",this.state.display?'cannotbeseen':'canbeseen'].join(' ')}>
                <i className="iconfont icon-right"></i>
            </div>
        </div>
        );
    }
}

export default Leftcolumn;
export {Leftcolumn}
