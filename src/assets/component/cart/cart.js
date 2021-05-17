import React from 'react';
import './cart.css'
import {NumComponent} from '../numadjust/numadjust'
const cartHeaders=['书名','作者','出版社','单价','数量','总价','操作'];


class Cart extends React.Component{
    constructor(props) {
        super(props);
        let user_id=props.user_id;
        this.state={load:false};

        fetch("http://localhost:8080/cart?user_id="+user_id.toString())
            .then(response => response.json())
            .then(cartData => {
                let total=0;
                cartData.map((row,idx)=>{
                    total+=row[6]*row[7];
                })
                this.setState({
                        cartData: cartData,
                        total:total,
                        load:true
                    }
                )


            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }


    numChange=(e,idx)=>{
        fetch("http://localhost:8080/cartchange?user_id="+this.props.user_id.toString()+"&book_id="+this.state.cartData[idx][0].toString()+"&num="+e.toString());
        console.log(idx);
        let newData=this.state.cartData;
        newData[idx][7]=e;
        let total=0;
        newData.map(function (row,i){
            total+=row[6]*row[7];
        });
        this.setState({
            cartData:newData,
            total:total
        })
    }

    handleDelete=(e)=>
    {
        let newdata=this.state.cartData;
        let total=0;
        newdata.splice(e.target.key,1);
        newdata.map(function (row,i){
            total+=row[6]*row[7];
        });
        this.setState({cartData: newdata,
            total:total});
    }

    render=()=> {
        if(!this.state.load) return (<div/>)
        return(
            <div>
                <div className={"cart"}><span>购物车</span></div>
                    <div className={"CartBooks"}>
                    <table className={"booklist"}>
                    <thead>
                        <tr className={"list-head"}>
                            {cartHeaders.map(function (title,idx){
                                return (<td data-row={idx}>{title}</td>);
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.cartData.map((row,rowidx)=>{
                            return(
                                <tr key={rowidx+1}>
                                    {
                                        row.map((cell, idx)=>{
                                            if(cartHeaders[idx]==='书名')
                                            {
                                                return <td key={(rowidx+1)*(idx+1)} className={"book-name-td"}><a href="#" className={"book-name"}>{row[3]}</a></td>;
                                            }
                                            else if(cartHeaders[idx]==='作者')
                                            {
                                                return <td key={(rowidx+1)*(idx+1)} className={"book-author-td"}><div className={"book-author"}>{row[4]}</div></td>;
                                            }
                                            else if(cartHeaders[idx]==='出版社')
                                            {
                                                return <td key={(rowidx+1)*(idx+1)} className={"book-press-td"}><div className={"book-press"}>{row[5]}</div></td>;
                                            }
                                            else if(cartHeaders[idx]==='单价')
                                            {
                                                    return <td key={(rowidx+1)*(idx+1)} className={"book-price-td"}><div className={"book-price"}>¥{row[6].toFixed(2)}</div></td>;
                                            }
                                            else if (cartHeaders[idx]==='数量')
                                            {
                                                return <td className={"book-num-td"}><NumComponent className={"num-adjust"} key={(rowidx+1)} idx={rowidx} numChange={this.numChange} type="number" initval={row[7]}/></td>;
                                            }
                                            else if(cartHeaders[idx]==='总价')
                                            {
                                                return <td key={(rowidx+1)*(idx+1)} className={"book-total-td"}><div className={"book-total"}>¥{(row[6]*row[7]).toFixed(2)}</div></td>;
                                            }
                                        })
                                    }
                                    <td className={'book-delete-td'}><button key={rowidx} onClick={this.handleDelete} className={"book-delete"}>移除</button></td>
                                </tr>
                            );
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