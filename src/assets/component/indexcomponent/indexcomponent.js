import React from "react";

import {DisplayinturnComponent} from '../displayinturn/dispalyinturn'

const DisplayObject ={
    "interval": 1000,
    "number": 5,
    "boxStyle": "content",
    "imgWidth": 480,
    "imgHeight": 300};

class IndexMain extends React.Component{
    render(){
        return(
            <div id={'indexmain'}>
                <MainImageBox/>
                <GrayLine/>
                <MainBookBox/>
            </div>
        );
    }
}

const imgUrl=['./img/index/big1_1.png',
    './img/index/big1_2.png',
    './img/index/big1_3.png',
    './img/index/big1_4.png',
    './img/index/big1_5.png'];

const data = [
    ["夏至未至","郭敬明","c",36.8,'9787540475741',2,'./img/bookimg/101.jpg'],
    ["深入理解计算机系统", "Randal E.Byrant","机械工业出版社",139,'9787111544937',200,'./img/bookimg/102.jpg'],
    ["他改变了中国","罗伯特·劳伦斯","上海译文出版社",38,'9787532736553',1,'./img/bookimg/103.jpg'],
    ["深入理解Java虚拟机","周志明","机械工业出版社",129,'9787111641247',20,'./img/bookimg/104.png'],
    ["数据结构 C++语言版","邓俊辉","清华大学出版社",39,'9787302330646',12,'./img/bookimg/105.jpg'],
];


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
    constructor(props) {
        super(props);let user_id=localStorage.getItem("user_id");
        let user_name=localStorage.getItem("user_name");
        if(user_name)
            this.state={
                user_name:user_name,
                user_id:user_id
            }
        else
            this.state={
                user_name:null,
                user_id:null
            }
    }
    render(){
        if(!this.state.user_name)
            return(
                <div id="header-right">
                    <a href="/login">登录</a>
                </div>
            )
        else
            return (
                <div id={"header-right"}>
                    你好,{this.state.user_name}！
                </div>
            )
    }
}

class Header extends React.Component {

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

class GrayLine extends React.Component{
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

export {Copyright,GrayLine,IndexMain,Header,Logo,SearchBar}