import React from "react";
import {Copyright, GrayLine, Header} from "../component/indexcomponent/indexcomponent";
import {BookEntry} from "../component/bookentry/bookentry";
import {Leftcolumn} from "../component/leftcolumn/leftcolumn";
import {getLoginInf} from "../../App";
import {ThemeLine} from "../../App";

class SearchView extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            checkLogin:false
        }
        getLoginInf(this);
    }
    render=()=>{
        if(!this.state.checkLogin)
            return (<div/>)
        return(
            <div>
                <div id="wrapper-holder">
                    <div id="wrapper">
                        <Header user_name={this.state.user_name}/>
                        <ThemeLine/>
                        <GrayLine/>
                        <main id={"indexmain"}>
                            {/*<Excel headers={headers} initialData={[]} canEdit={false}/>*/}
                            {<BookEntry/>}
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

export {SearchView}
