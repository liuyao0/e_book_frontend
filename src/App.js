import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './assets/component/css/style.css';
import './assets/iconfont/iconfont.css';
import {LoginView} from './assets/view/LoginView'
import {BookDetailView} from "./assets/view/BookDetailView";
import {BookInfoStoreView} from "./assets/view/BookInfoStoreView";
import {SearchView} from "./assets/view/SearchView";
import {MeView} from "./assets/view/MeView";
import {CartView} from "./assets/view/CartView";
import {OrderView} from "./assets/view/OrderView";
import {IndexView} from "./assets/view/IndexView";
import {ChatView} from "./assets/view/ChatView";

export const server_ip="localhost:8443";
export const server_cal_ip="localhost:8090";
export const frontend_ip="localhost:3000";

export function getLoginInf(that) {
    fetch("https://"+server_ip+"/getLoggedUsernameAndUserType",{
        credentials: 'include'
    })
        .then(response => response.text())
        .then(data => {
            if(data.length===0)
                that.setState({
                    user_name:"",
                    user_type:0,
                    checkLogin: true
                })
            else {
                data=data.split(",");
                that.setState({
                    user_name:data[0],
                    user_type:parseInt(data[1],10),
                    checkLogin: true
                })
            }
        }).catch(function (ex) {
        console.log('parsing failed', ex)
    })

}

export class ThemeLine extends React.Component{
    render() {
        return(
            <div style={{width:'100%',height:'2px',backgroundImage:'linear-gradient(-90deg,#39cccc,#00b4b4, #39cccc'}}/>
        );
    }
}

function doVisit()
{
    if(sessionStorage.getItem("visited"))
        return;
    sessionStorage.setItem("visited","true");
    fetch("https://"+server_ip+"/visit").then(response=>response.json())
        .then(()=>{

        })
}




function App(){
    doVisit();
    return(
         <Router>
            <Switch>
                <Route path={"/bookdetail"}><BookDetailView/></Route>
                <Route path={"/bookinfostore"}><BookInfoStoreView/></Route>
                <Route path={"/search"}><SearchView/></Route>
                <Route path={"/login"}><LoginView/></Route>
                <Route path={"/me"}><MeView/></Route>
                <Route path={"/cart"}><CartView/></Route>
                <Route path={"/chatroom"}><ChatView/></Route>
                <Route path={"/pay"}><OrderView/></Route>
                <Route path="/"><IndexView/></Route>
            </Switch>
         </Router>
    )
}
export default App;
