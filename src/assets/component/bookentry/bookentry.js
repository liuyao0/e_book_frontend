import React from "react";
import {server_ip}  from '../../../App'

let entryPerPage=10;
const pageButtonStyle={width:'28px',height:'24px',textAlign:'center',marginLeft:'2px',marginRight:'2px'}
class BookEntry extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookData:[],
            pageNum:0,
            currentPage:0,
        }
        let href = decodeURI(window.location.href);
        let i = href.indexOf("=");
        let name=href.substr(i+1,href.length-i+1);
        let fetchUrl;
        if(i<0)
        {
            fetchUrl="https://"+server_ip+"/";
        }
        else
        {
            fetchUrl="https://"+server_ip+"/search?key="+name;
        }
        fetch(fetchUrl)
            .then(response => response.json())
            .then(bookData => {
                let pageNum=Math.round(bookData.length/entryPerPage);
                if(pageNum*entryPerPage<bookData.length)
                    pageNum++;

                    this.setState({
                        bookData: bookData,
                        pageNum:pageNum,
                        currentPage:1
                    });
            });
    }
    toFirstPage=()=>{
        this.setState({currentPage:1});
    }

    toNextPage=()=>{
        this.setState({currentPage:this.state.currentPage+1})
    }

    toFinalPage=()=>{
        this.setState({currentPage:this.state.pageNum})
    }

    toLastPage=()=>{
        this.setState({currentPage:this.state.currentPage-1})
    }
// 0:id 1:name 2:author 3:press 4:price 5:isbn 6:inventory 7:image 8:description
    renderPageController=()=>{
        if(this.state.bookData.length===0)
            return <div/>
        return(
            <div style={{width:'100%',marginTop:'10px'}}>
                <div style={{
                    fontSize:"12px",
                    margin:"auto",
                    width:'220px'
                }}>
                    <button onClick={this.toFirstPage} style={pageButtonStyle}>{"<<"}</button>
                    <button disabled={this.state.currentPage<=1} onClick={this.toLastPage} style={pageButtonStyle}>{"<"}</button>
                    <span>
                            第{this.state.currentPage}页，共{this.state.pageNum}页
                        </span>
                    <button disabled={this.state.currentPage>=this.state.pageNum} onClick={this.toNextPage} style={pageButtonStyle}>{">"}</button>
                    <button onClick={this.toFinalPage} style={pageButtonStyle}>{">>"}</button>
                </div>
            </div>
        )
    }
    render=()=> {
        return(
            <div>
                <table style={{borderCollapse: 'collapse',
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '90%',
                    backgroundColor: '#fdfdfd',
                    boxShadow: '0 0 5px #00b4b4',
                    margin:'auto'}}>
                    <tbody>
                    {this.state.bookData.slice(
                        (this.state.currentPage-1)*entryPerPage,
                        (this.state.currentPage*entryPerPage>this.state.bookData.length-1)?
                            this.state.bookData.length:
                            this.state.currentPage*entryPerPage
                    ).map((row,idx)=>{
                        return(
                            <tr style={{
                                width:'100%',
                                borderBottom:'1px solid #e5e5e5',
                                height:'140px'
                            }}>
                                <td
                                style={{
                                    width:'80px',
                                    paddingLeft:'20px'
                                }}>
                                    <div
                                        style={{
                                            width:'80px',
                                            height:'100px',
                                            border:'1px solid grey',
                                            margin:'auto',
                                            display: 'table-cell',
                                            verticalAlign: 'middle',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <img src={row[7]}
                                             style={{
                                                 maxWidth:'80px',
                                                 maxHeight:'100px',

                                             }}/>
                                    </div>
                                </td>
                                <td
                                    style={{
                                        width:'300px',
                                    }}
                                >
                                    <div
                                        style={{
                                            paddingLeft:'15px',
                                            width:'350px',
                                            height:'100px',
                                        }}
                                    >
                                        <a className={"search-list-name"} href={'/bookdetail?book-id='+row[0]}>
                                            {row[1]}
                                        </a>
                                        <p style={{

                                            fontSize:'14px'
                                        }}>
                                            {row[2]}
                                        </p>
                                        <p style={{
                                            color:'#888',
                                            fontSize:'12px'
                                        }}>
                                            {row[3]}
                                        </p>
                                    </div>
                                </td>
                                <td
                                    style={{
                                        width:'240px',
                                        verticalAlign:'top',
                                        textAlign:'left'
                                    }}
                                >
                                    <div style={{
                                        paddingTop:'20px',
                                        color: '#00b4b4',
                                        fontFamily: 'Arial',
                                        fontSize:'20px'
                                    }}>
                                        {"¥"+row[4].toFixed(2)}
                                    </div>
                                </td>
                                <td
                                    style={{
                                        width:'100px',
                                        verticalAlign:'top'
                                    }}>
                                    <div style={{
                                        paddingTop:'15px',
                                        color:'#888',
                                        fontSize:'12px'
                                    }}>
                                        {"库存："+row[6]}
                                        <div style={{
                                            color:'#888',
                                            fontSize:'12px'
                                        }}>
                                            {"ISBN:"+row[5]}
                                        </div>
                                    </div>
                                </td>
                                <td/>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {this.renderPageController()}
            </div>

        )
    }
}

export {BookEntry}
