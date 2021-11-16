import React from 'react';
import './cart.css'
import {NumComponent} from '../numadjust/numadjust'
import {frontend_ip, server_ip,server_cal_ip} from '../../../App'
const cartHeaders=['书名','作者','出版社','单价','数量','总价','操作'];


class Cart extends React.Component{
    constructor(props) {
        super(props);
        let user_id=props.user_id;
        this.state={load:false};

        fetch("https://"+server_ip+"/cart",{
            credentials: 'include'
        })
            .then(response => response.json())
            .then(cartData => {
                this.calculateTotal(cartData);
                this.setState({
                        cartData: cartData,
                        total:0,
                        load:true
                    }
                )

            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    _strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    calculateTotal=(cartData)=>{
        let map=new Map();
        cartData.map((row)=>{
            let price=row[6];
            let num=row[7];
            if(map.has(price))
                map.set(price,map.get(price)+num);
            else
                map.set(price,num);
        });

        fetch("http://"+server_cal_ip+"/calculateTotal",{
            method:'POST',
            body:JSON.stringify(this._strMapToObj(map))
        }).then(response=>response.json()).then(data=>{
            this.setState({total:data[0]})
        })
    }

    cartToOrder=()=>{
        fetch("https://"+server_ip+"/carttoorder",{
            credentials: 'include'
        }).then(response => response.text())
            .then(res=> {
                if(res.length===0)
                {
                    alert("服务器已接收订单！!")
                    window.location.href="https://"+frontend_ip+"/me";
                }
                else
                    alert(res)
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    numChange=(e,idx)=>{
        fetch("https://"+server_ip+"/cartchange?book_id="+this.state.cartData[idx][0].toString()+"&num="+e.toString(),{
            credentials: 'include'
        });
        let newData=this.state.cartData;
        newData[idx][7]=e;


        // let total=0;
        // newData.map(function (row,i){
        //     total+=row[6]*row[7];
        // });
        // this.setState({
        //     cartData:newData,
        //     total:total
        // })

        this.setState({
            cartData:newData,
        })
        this.calculateTotal(newData);
    }

    handleDelete=(e)=>
    {
        fetch("https://"+server_ip+"/cartdel?book_id="+this.state.cartData[e.target.dataset.idx][0].toString(),{
            credentials: 'include'
        });
        let newdata=this.state.cartData;
        let total=0;
        newdata.splice(e.target.dataset.idx,1);
        newdata.map(function (row,i){
            total+=row[6]*row[7];
        });
        this.setState({cartData: newdata,
            //total:total
        });
        this.calculateTotal(newdata);
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
                                    <td className={'book-delete-td'}><button key={rowidx} onClick={this.handleDelete} data-idx={rowidx} className={"book-delete"}>移除</button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                        <div className={"allbook-total"}>合计:¥{this.state.total.toFixed(2)}</div>
                        <div style={{width:'100%',height:'55px'}}><a onClick={this.cartToOrder} className={"pay-button"}>下单</a></div>
                </div>
            </div>
        );
    }
}

export default Cart;
export {Cart}
