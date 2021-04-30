import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './css/style.css';
import './assets/iconfont/iconfont.css';
import {DisplayinturnComponent} from './displayinturn/dispalyinturn'
import  {Leftcolumn} from './leftcolumn/leftcolumn'
import {Cart} from './cart/cart'
import {Excel} from './excel/excel'
import {Login} from './login/login'
import {BookDetail} from './bookdetail/bookdetail'
import {Order} from './order/order'
import {Me} from './me/me'
const data = [
    ["夏至未至","郭敬明","湖南文艺出版社",36.8,'9787540475741',2,'./img/bookimg/101.jpg'],
    ["深入理解计算机系统", "Randal E.Byrant","机械工业出版社",139,'9787111544937',200,'./img/bookimg/102.jpg'],
    ["他改变了中国","罗伯特·劳伦斯","上海译文出版社",38,'9787532736553',1,'./img/bookimg/103.jpg'],
    ["深入理解Java虚拟机","周志明","机械工业出版社",129,'9787111641247',20,'./img/bookimg/104.png'],
    ["数据结构 C++语言版","邓俊辉","清华大学出版社",39,'9787302330646',12,'./img/bookimg/105.jpg'],
];

const headers=["书名","作者","出版社","售价","ISBN","库存"];

const bookDetail=['[原书第三版]深入理解计算机系统','Randal E.Bryant','机械工业出版社',139];

const DisplayObject ={
    "interval": 1000,
    "number": 5,
    "boxStyle": "content",
    "imgWidth": 480,
    "imgHeight": 300};
const imgUrl=['./img/index/big1_1.png',
    './img/index/big1_2.png',
    './img/index/big1_3.png',
    './img/index/big1_4.png',
    './img/index/big1_5.png'];

class SearchBar extends React.Component{
  render() {
    return (
        <div id="header-middle">
            <div id="search-holder">
                <span><i className="iconfont icon-sousuo"/></span>
                <input type="text" placeholder="深入理解计算机系统..." name="" id="search-input" defaultValue=""/>
                <a href={"/search"} id="search-button">搜索</a>

            </div>
        </div>
    );
  }
}

class Logo extends React.Component{
    render(){
    return(
        <div id="logo-holder">
            <img src="./img/logo.png"/>
            <a href="/">e-book</a>
        </div>
    );
    }
}

class HeaderRight extends React.Component{
    render(){
        return(
            <div id="header-right">
                <a href="/login">登录</a>
            </div>
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }




    render = () => {
        if (this.props.drawSearchBar) {
            return (
                <div id={'header-holder'}>
                    <header>
                        <Logo/>
                        <SearchBar/>
                        <HeaderRight/>
                    </header>
                </div>
            );
        } else {
            return (
                <div id={'header-holder'}>
                    <header>
                        <Logo/>
                        <HeaderRight/>
                    </header>
                </div>
            );
        }
    }
}
Header.defaultProps={
        drawSearchBar: true
};
class WrapperIndex extends  React.Component{
    render() {
        return(
            <div>
                <div id={'wrapper-holder'}>
                    <div id={'wrapper'}>
                        <Header/>
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

class IndexMain extends React.Component{
    render(){
        return(
          <div id={'indexmain'}>
              <MainImageBox/>
              <Grayline/>
              <MainBookBox/>
          </div>
        );
    }
}

class MainImageBox extends React.Component{
    render(){
        return(
            <div className={'main-img-box'}>
                <DisplayinturnComponent boxStyle={'main-img'} DisplayinturnObject={DisplayObject} imgArray={imgUrl}/>
                <MainImage url={"./img/index/big2.png"}/>
            </div>
            );
    }
}

class MainImage extends React.Component{
    render() {
        return(
            <div className="main-img">
                <img src={this.props.url}/>
            </div>
        );
    }
}

class MainBookBox extends React.Component{
    render() {
        return(
            <div class={'main-book-box'}>
                <SingleBook bookdata={data[0]}/>
                <SingleBook bookdata={data[1]}/>
                <SingleBook bookdata={data[2]}/>
                <SingleBook bookdata={data[3]}/>
                <SingleBook bookdata={data[4]}/>
            </div>
        );
    }
}

class SingleBook extends React.Component{
    render() {
        return(
            <div className="single-book">
                <div className="bottom-book-img">
                    <img src={this.props.bookdata[6]}/>
                </div>
                <div className="text-holder"><a href="/bookdetail" className="bottom-book-name">{this.props.bookdata[0]}</a></div>
                <div className="text-holder"><span href="" className="bottom-book-author">{this.props.bookdata[1]}</span></div>
                <p className="bottom-book-price">{'¥'+this.props.bookdata[3].toFixed(2)}</p>
            </div>
    );
    }
}

class Grayline extends React.Component{
    render(){
        return(
            <div style={{paddingBottom:'10px',paddingTop:'10px',width:'100%',height:'1px'}}>
                <div className="gray-line"></div>
            </div>

        );
    }
}

class Copyright extends React.Component{
    render(){
        return(
            <div id="copyright">Copyright © 2021 E-book All Rights Reserved.</div>
        );
    }
}



class WrapperBookDetail extends React.Component{
    constructor(props) {
        super(props);
    }
    render=()=> {
        return (
            <div id="wrapper-holder">
                <div id={"wrapper"}>
                    <Header/>
                    <ThemeLine/>
                    <Grayline/>
                    <BookDetail bookDetail={bookDetail}/>
                    <Grayline/>
                    <Leftcolumn/>
                </div>
            </div>
        );
    }

}
class WrapperSearch extends React.Component{
    render(){
        return(
            <div>
                <div id="wrapper-holder">
                    <div id="wrapper">
                        <Header/>
                        <ThemeLine/>
                        <Grayline/>
                        <main id={"indexmain"}>
                            <Excel headers={headers} initialData={data} canEdit={false}/>
                        </main>
                        <Grayline/>
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
    }

    render=()=> {
        return(
            <div>
                <div id="wrapper-holder">
                    <div id="wrapper">
                        <Header drawSearchBar={false}/>
                        <ThemeLine/>
                        <Grayline/>
                        <div className="bookinfostore-head"><span>书籍信息库</span></div>
                        <main id={"indexmain"}>
                            <Excel  headers={headers} initialData={data} canEdit={true}/>
                        </main>
                        <Grayline/>
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
    }

    render() {
        return(
            <div>
                <div style={
                {
                    background: 'white',
                    width: '1200px',
                    margin: '0 auto'
                }}>
                    <Header drawSearchBar={false}></Header>
                    <ThemeLine/>
                    <Grayline/>
                    <Cart cartData={this.props.cartData}/>
                    <Grayline/>
                </div>
                <Leftcolumn></Leftcolumn>
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

    }

    render() {
        return (
            <div id="wrapper-holder">
                <div id="wrapper">
                    <Header drawSearchBar={false}/>
                    <ThemeLine/>
                    <Grayline/>
                    <main style={{margin:'0 auto'}}>
                        <Order orderData={orderData} defaultUserInfo={defaultUserInfo}/>
                    </main>
                    <Grayline/>
                </div>
            </div>
        );
    }
}
class WrapperMe extends React.Component{
    constructor(props) {
        super(props);
    }

    render=()=> {
        return (
            <div>
                <div id="wrapper-holder">
                    <div id="wrapper">
                        <Header drawSearchBar={false}/>
                        <ThemeLine/>
                        <Grayline/>
                        <div className="bookinfostore-head"><span>个人中心</span></div>
                        <main id={"indexmain"}>
                            <Me userName={this.props.username}/>
                        </main>
                        <Grayline/>
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
                <Route path={"/login"}><Login/></Route>
                <Route path={"/me"}><WrapperMe username={"ly"}/></Route>
                <Route path={"/bookinfostore"}><WrapperBookInfoStore/></Route>
                <Route path={"/bookdetail"}><WrapperBookDetail/></Route>
                <Route path={"/cart"}><WrapperCart cartData={cartData}/></Route>
                <Route path={"/search"}><WrapperSearch/></Route>
                <Route path={"/pay"}><WrapperOrder/></Route>
                <Route path="/"><WrapperIndex/></Route>
            </Switch>
         </Router>
    )
}
export default App;
