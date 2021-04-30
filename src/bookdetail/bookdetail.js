import React from 'react';
import './bookdetail.css'
import {NumComponent} from '../numadjust/numadjust'



class BookDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            total:this.props.bookDetail[3]
        }
    }

    numChange=(e)=>{
        this.setState({total:this.props.bookDetail[3]*e});
        }


    render=()=> {
        return (
            <div id="book-detail-main">
                <div id="book-detail-bookimage_out">
                    <img src={'/img/bookimg/102.jpg'} id="book-detail-bookimg"/>
                </div>
                <div id="book-detail-book_info">
                    <h2>{this.props.bookDetail[0]}</h2>
                    <p className="nobr">作者：</p>
                    <span href="#">{this.props.bookDetail[1]}</span><br/>
                    <p className="nobr">出版社：</p>
                    <span href="#">{this.props.bookDetail[2]}</span><br/>
                    <h2 id="book-detail-price">¥{this.props.bookDetail[3].toFixed(2)}</h2>
                    <p id="book-detail-content">简介：和第2版相比，本版内容上较大的变化是，从以IA32和x86-64为基础转变为完全以x86-64为基础。主要更新如下：
                        基于x86-64，大量地重写代码，首次介绍对处理浮点数据的程序的机器级支持。
                        处理器体系结构修改为支持64位字和操作的设计。
                        引入更多的功能单元和更复杂的控制逻辑，使基于程序数据流表示的程序性能模型预测更加可靠。
                        扩充关于用GOT和PLT创建与位置无关代码的讨论，描述了更加强大的链接技术（比如库打桩）。
                        增加了对信号处理程序更细致的描述，包括异步信号安全的函数等。
                        采用新函数，更新了与协议无关和线程安全的网络编程。
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