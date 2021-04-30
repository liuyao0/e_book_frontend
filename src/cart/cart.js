import React from 'react';
import PropTypes from 'prop-types';
import './cart.css'
import {NumComponent} from '../numadjust/numadjust'
const cartHeaders=['书名','作者','出版社','单价','数量','总价','操作'];


class Cart extends React.Component{
    constructor(props) {
        super(props);

        let total=0;
        this.props.cartData.map(function (row,i){
            total+=row[3]*row[4];
        });
        this.state={cartData:this.props.cartData,total:total};
    }


    numChange=(e,idx)=>{
        let newdata=this.state.cartData;
        newdata[idx][4]=e;
        newdata[idx][5]=newdata[idx][4]*newdata[idx][3];
        let total=0;
        newdata.map(function (row,i){
            total+=row[3]*row[4];
        });
        this.setState({
            cartData:newdata,
            total:total
        })
    }
    handleDelete=(e)=>
    {
        let newdata=this.state.cartData;
        let total=0;
        newdata.splice(e.target.key,1);
        newdata.map(function (row,i){
            total+=row[3]*row[4];
        });
        this.setState({cartData: newdata,
            total:total});
    }

    render=()=> {
        return(
            <div>
                <div className={"cart"}><span>购物车</span></div>
                    <div className={"CartBooks"}>
                    <table className={"booklist"}>
                    <thead>
                        <tr className={"list-head"}>
                            {cartHeaders.map(function (title,idx){
                                return (<td key={idx}>{title}</td>);
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.cartData.map((row,rowidx)=>{
                            return(
                                <tr key={rowidx}>
                                    {
                                        row.map((cell, idx)=>{
                                            if(cartHeaders[idx]==='书名')
                                            {
                                                return <td className={"book-name-td"}><a href="#" className={"book-name"}>{row[idx]}</a></td>;
                                            }
                                            else if(cartHeaders[idx]==='作者')
                                            {
                                                return <td className={"book-author-td"}><div className={"book-author"}>{row[idx]}</div></td>;
                                            }
                                            else if(cartHeaders[idx]==='出版社')
                                            {
                                                return <td className={"book-press-td"}><div className={"book-press"}>{row[idx]}</div></td>;
                                            }
                                            else if (cartHeaders[idx]==='操作')
                                            {
                                                return <button>移除</button>
                                            }
                                            else if(cartHeaders[idx]==='单价')
                                            {
                                                    return <td className={"book-price-td"}><div className={"book-price"}>¥{row[idx].toFixed(2)}</div></td>;
                                            }
                                            else if (cartHeaders[idx]==='数量')
                                            {
                                                return <td className={"book-num-td"}><NumComponent className={"num-adjust"} idx={rowidx} numChange={this.numChange} type="number" initval={row[idx]}/></td>;
                                            }
                                            else if(cartHeaders[idx]==='总价')
                                            {
                                                return <td className={"book-total-td"}><div className={"book-total"}>¥{row[idx].toFixed(2)}</div></td>;
                                            }
                                        })
                                    }
                                    <td className={'book-delete-td'}><button key={rowidx} onClick={this.handleDelete} className={"book-delete"}>移除</button></td>
                                </tr>);
                        })
                    }
                    </tbody>
                </table>
                        <div className={"allbook-total"}>合计:¥{this.state.total.toFixed(2)}</div>
                        <div style={{width:'100%',height:'55px'}}><a href={"/pay"} className={"pay-button"}>结算</a></div>
                </div>
            </div>
        );
    }
}

export default Cart;
export {Cart}