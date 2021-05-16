import React from 'react';
import './bookdetail.css'
import {NumComponent} from '../numadjust/numadjust'



class BookDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={load:false};
        let href=window.location.href;
        let book_id="";
        for(let i=href.length-1;href[i]>='0'&&href[i]<='9';i--)
            book_id+=href[i];
        book_id=book_id.split("").reverse().join("");

        fetch("http://localhost:8080/bookdetail?book-id="+book_id)
            .then(response => response.json())
            .then(bookData => {
                let bookDetail=[];
                bookData[0].map(function (content,idx)
                    {
                        bookDetail.push(content)
                    }
                )
                console.log(bookDetail);
                this.setState({
                    data:bookDetail,
                    total:bookDetail[4],
                    load:true
                })
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }


    numChange=(e)=>{
        this.setState({total:this.state.data[4]*e});
        }


    render=()=> {
        if(!this.state.load)
            return (
                <div/>
            )
        else
        return (
            <div id="book-detail-main">
                <div id="book-detail-bookimage_out">
                    <img src={this.state.data[7]} id="book-detail-bookimg"/>
                </div>
                <div id="book-detail-book_info">
                    <h2>{this.state.data[1]}</h2>
                    <p className="nobr">作者：</p>
                    <span href="#">{this.state.data[2]}</span><br/>
                    <p className="nobr">出版社：</p>
                    <span href="#">{this.state.data[3]}</span><br/>
                    <h2 id="book-detail-price">¥{this.state.data[4].toFixed(2)}</h2>
                    <p id="book-detail-content">{this.state.data[8]}
                    </p>
                    <NumComponent style={{display:'inline-block'}} initval={1} numChange={this.numChange}/>
                    <h2 style={{display:'inline'}} id="book-detail-total" >¥{this.state.total.toFixed(2)}</h2>
                    <button style={{display:"inline-block"}} className="book-detail-tocart">加入购物车</button>
                </div>
            </div>
        );
    }

}



export default BookDetail;
export {BookDetail}