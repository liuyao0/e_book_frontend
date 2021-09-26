import React from "react";
import {GrayLine, Header} from "../component/indexcomponent/indexcomponent";
import {Orderplace} from "../component/orderplace/orderplace";
import {getLoginInf} from "../../App";
import {ThemeLine} from "../../App";

class OrderView extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            checkLogin:false
        }
        getLoginInf(this);

    }

    render=()=> {
        if(!this.state.checkLogin)
            return (<div/>)
        return (
            <div id="wrapper-holder">
                <div id="wrapper">
                    <Header drawSearchBar={false}/>
                    <ThemeLine/>
                    <GrayLine/>
                    <main style={{margin:'0 auto'}}>
                        <Orderplace user_name={this.state.user_name}/>
                    </main>
                    <GrayLine/>
                </div>
            </div>
        );
    }
}

export {OrderView}
