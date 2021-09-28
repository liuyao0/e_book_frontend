import React from "react";
import {Copyright, GrayLine, Header} from "../component/indexcomponent/indexcomponent";
import {Cart} from "../component/cart/cart";
import {Leftcolumn} from "../component/leftcolumn/leftcolumn";
import {getLoginInf} from "../../App";
import {ThemeLine} from "../../App";
import {server_ip}  from '../../App'

class CartView extends React.Component{
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
                <div style={
                    {
                        background: 'white',
                        width: '1200px',
                        margin: '0 auto'
                    }}>
                    <Header drawSearchBar={false}  user_name={this.state.user_name}/>
                    <ThemeLine/>
                    <GrayLine/>
                    <Cart user_name={this.state.user_name}/>
                    <GrayLine/>
                </div>
                <Leftcolumn/>
                <Copyright/>
            </div>
        );
    }
}

export {CartView}
