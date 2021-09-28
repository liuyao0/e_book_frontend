import React from "react";
import {Copyright, GrayLine, Header} from "../component/indexcomponent/indexcomponent";
import {Excel} from "../component/excel/excel";
import {Leftcolumn} from "../component/leftcolumn/leftcolumn";
import {getLoginInf} from "../../App";
import {ThemeLine} from "../../App";
import {server_ip}  from '../../App'

const headers=["书名","作者","出版社","售价","ISBN","库存"];

class BookInfoStoreView extends React.Component{
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
                <div id="wrapper-holder">
                    <div id="wrapper">
                        <Header user_name={this.state.user_name} drawSearchBar={false}/>
                        <ThemeLine/>
                        <GrayLine/>
                        <div className="bookinfostore-head"><span>书籍信息库</span></div>
                        <main id={"indexmain"}>
                            <Excel headers={headers} initialData={[]} canEdit={true}/>
                        </main>
                        <GrayLine/>
                    </div>
                    <Leftcolumn/>
                </div>
                <Copyright/>
            </div>
        );
    }
}

export {BookInfoStoreView}
