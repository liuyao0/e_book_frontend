import React from "react";
import {GrayLine, Header} from "../component/indexcomponent/indexcomponent";
import {BookDetail} from "../component/bookdetail/bookdetail";
import {Leftcolumn} from "../component/leftcolumn/leftcolumn";
import {getLoginInf} from "../../App";
import {ThemeLine} from "../../App";
import {server_ip}  from '../../App'

class BookDetailView extends React.Component{
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
                <div id={"wrapper"}>
                    <Header user_name={this.state.user_name}/>
                    <ThemeLine/>
                    <GrayLine/>
                    <BookDetail user_name={this.state.user_name}/>
                    <GrayLine/>
                    <Leftcolumn/>
                </div>
            </div>
        );
    }

}

export {BookDetailView};
