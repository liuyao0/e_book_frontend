import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './assets/component/css/style.css';
import './assets/iconfont/iconfont.css';
import {Copyright, GrayLine, Header, IndexMain} from "./assets/component/indexcomponent/indexcomponent";
import {Leftcolumn} from './assets/component/leftcolumn/leftcolumn'
import {Cart} from './assets/component/cart/cart'
import {Excel} from './assets/component/excel/excel'
import {Login} from './assets/component/login/login'
import {BookDetail} from './assets/component/bookdetail/bookdetail'
import {Orderplace} from './assets/component/orderplace/orderplace'
import {Me} from './assets/component/me/me'
import {BookEntry} from "./assets/component/bookentry/bookentry";

const headers=["书名","作者","出版社","售价","ISBN","库存"];


const data=[];


function getLoginInf(that) {
    fetch("http://localhost:8080/getLoggedUsernameAndUserType",{
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
    // if(user_name)
    //     that.state={
    //         user_name:user_name,
    //         user_id:parseInt(user_id,10),
    //         user_type:parseInt(user_type,10)
    //     }
    // else
    //     that.state={
    //         user_name:null,
    //         user_id:null,
    //         user_type:null
    //     }
}
class WrapperIndex extends  React.Component{
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
class ThemeLine extends React.Component{
    render() {
        return(
            <div style={{width:'100%',height:'2px',backgroundImage:'linear-gradient(-90deg,#39cccc,#00b4b4, #39cccc'}}/>
        );
    }
}


class WrapperBookDetail extends React.Component{
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

class WrapperSearch extends React.Component{
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

class WrapperBookInfoStore extends React.Component{
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
                            <Excel  headers={headers} initialData={data} canEdit={true}/>
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

let cartData = [
    ["深入理解计算机系统", "Randal E.Byrant","机械工业出版社",139,2,278],
    ["他改变了中国","罗伯特·劳伦斯","上海译文出版社",38,1,38]
];

class WrapperCart extends React.Component{
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

const defaultUserInfo={
    receivename:'陶中天',
    address:'上海市闵行区东川路800号',
    tel:'123'
};


let orderData = [
    ["深入理解计算机系统", "Randal E.Byrant","机械工业出版社",139,2],
    ["他改变了中国","罗伯特·劳伦斯","上海译文出版社",38,1]
];

class WrapperOrder extends React.Component
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
class WrapperMe extends React.Component{
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
function App(){
    return(
         <Router>
            <Switch>
                <Route path={"/bookdetail"}><WrapperBookDetail/></Route>
                <Route path={"/bookinfostore"}><WrapperBookInfoStore/></Route>
                <Route path={"/search"}><WrapperSearch/></Route>
                <Route path={"/login"}><Login/></Route>
                <Route path={"/me"}><WrapperMe username={"ly"}/></Route>
                <Route path={"/cart"}><WrapperCart cartData={cartData}/></Route>
                <Route path={"/pay"}><WrapperOrder/></Route>
                <Route path="/"><WrapperIndex/></Route>
            </Switch>
         </Router>
    )
}
export default App;
