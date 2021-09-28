import React from "react";
import {GrayLine, Header} from "../component/indexcomponent/indexcomponent";
import {Me} from "../component/me/me";
import {Leftcolumn} from "../component/leftcolumn/leftcolumn";
import {getLoginInf} from "../../App";
import {ThemeLine} from "../../App";
import {server_ip}  from '../../App'


class MeView extends React.Component{
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
            <div>
                <div id="wrapper-holder">
                    <div id="wrapper">
                        <Header drawSearchBar={false} user_name={this.state.user_name}/>
                        <ThemeLine/>
                        <GrayLine/>
                        <main id={"indexmain"}>
                            <Me user_name={this.state.user_name} user_type={this.state.user_type}/>
                        </main>
                        <GrayLine/>
                    </div>
                    <Leftcolumn/>
                </div>
            </div>
        );
    }
}

export {MeView};
