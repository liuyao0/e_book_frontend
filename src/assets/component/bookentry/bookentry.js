import React from "react";

class BookEntry extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookData:[]
        }

        fetch("http://localhost:8080/")
            .then(response => response.json())
            .then(bookData => {
                let href = decodeURI(window.location.href);
                let i = href.indexOf("=");
                if (i < 0) {
                    this.setState({
                        bookData: bookData
                    });
                    return;
                }
                let name=href.substr(i+1,href.length-i+1);
                bookData=bookData.filter((row)=>{
                    if(row[1].indexOf(name)<0)
                        return false;
                    else
                        return true;
                })
                this.setState({
                    bookData:bookData
                })
            })
    }
// 0:id 1:name 2:author 3:press 4:price 5:isbn 6:inventory 7:image 8:description
    render=()=> {
        return(
            <table  style={{borderCollapse: 'collapse',
                marginTop: '10px',
                marginBottom: '10px',
                width: '90%',
                backgroundColor: '#fdfdfd',
                boxShadow: '0 0 5px #00b4b4',
                margin:'auto'}}>
                <tbody>
                {this.state.bookData.map((row,idx)=>{
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
        )
    }
}

export {BookEntry}