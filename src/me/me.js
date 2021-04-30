import React from 'react';
import './me.css'

class MeAside extends React.Component{
    constructor(props) {
        super(props);
    }

    render=()=>{
        return (
            <div className={'me-aside'}>
                <p>Welcome,{this.props.username}</p>
                <div><a href="#">用户管理</a></div>
                <div><a href="#">书籍信息库</a></div>
            </div>
        );
    }
}

class Me extends React.Component{
    constructor(props) {
        super(props);
    }

    render=()=>{
        return (
            <div>
                <div style={{width:'90%',margin:'0 auto',position:"relative",border:"1px solid #000",height:'600px'}}>
                <MeAside username={this.props.username}/>
                </div>
            </div>
    );

    }

}

export {Me};