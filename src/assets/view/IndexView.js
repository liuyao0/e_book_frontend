import React from "react";
import {Copyright, Header, IndexMain} from "../component/indexcomponent/indexcomponent";
import {Leftcolumn} from "../component/leftcolumn/leftcolumn";
import {getLoginInf} from "../../App";
import {ThemeLine} from "../../App";
import {server_ip}  from '../../App'

class IndexView extends  React.Component{
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
        return(
            <div>
                <div id={'wrapper-holder'}>
                    <div id={'wrapper'}>
                        <Header user_name={this.state.user_name} user_type={this.state.user_type}/>
                        <ThemeLine/>
                        <IndexMain/>
                        <Leftcolumn/>
                    </div>

                </div>
                <Copyright/>
            </div>
        )
    }
}

export {IndexView}
