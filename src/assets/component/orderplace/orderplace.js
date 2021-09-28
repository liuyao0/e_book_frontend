import React from 'react';
import './orderplace.css'
import {server_ip}  from '../../../App'

const orderHeaders=['书名','作者','出版社','单价','数量','总价']
class PersonalInfo extends React.Component
{
    constructor(props) {
        super(props);
    }

    render=()=>{
        return(
            <div style={{width:'90%', margin:'0 auto'}}>
                <div style={{marginTop:"5px",marginBottom:"5px"}}>
                    <span>收件人姓名：</span>
                    <input defaultValue={this.props.defaultUserInfo.receivename}/>
                </div>
                <div style={{marginTop:"5px",marginBottom:"5px"}}>
                    <span>收件人地址：</span>
                    <input defaultValue={this.props.defaultUserInfo.address}/>
                </div>
                <div style={{marginTop:"5px",marginBottom:"5px"}}>
                    <span>手机号：</span>
                    <input defaultValue={this.props.defaultUserInfo.tel}/>
                </div>
            </div>
        );
    }
}

class OrderMain extends React.Component{
    constructor(props) {
        super(props);
        let total=0;
        this.props.orderData.map(function (row,rowidx) {
            total+=row[3]*row[4];
        })
        this.state={total:total};
    }
    render=()=>{
        return(
            <div>

                <div className={"OrderBooks"}>
                <table className={"booklist"}>
                    <thead className={"list-head"}>
                        <tr className={"list-head"}>
                            {
                                orderHeaders.map(function (title){
                                    return(
                                        <td>{title}</td>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.orderData.map((row,rowidx)=>{
                        return(
                            <tr key={rowidx}>
                                {
                                    row.map((cell,idx)=>{
                                        if(orderHeaders[idx]==='书名')
                                        {
                                            return <td className={"book-name-td"}><div className={"book-name"}>{row[idx]}</div></td>;
                                        }
                                        else if(orderHeaders[idx]==='作者')
                                        {
                                            return <td className={"book-author-td"}><div className={"book-author"}>{row[idx]}</div></td>;
                                        }
                                        else if(orderHeaders[idx]==='出版社')
                                        {
                                            return <td className={"book-press-td"}><div className={"book-press"}>{row[idx]}</div></td>;
                                        }
                                        else if(orderHeaders[idx]==='单价')
                                        {
                                            return <td className={"book-price-td"}><div className={"book-price"}>¥{row[idx].toFixed(2)}</div></td>;
                                        }
                                        else if (orderHeaders[idx]==='数量')
                                        {
                                            return <td className={"book-num-td"}><div className={"book-name"}>{row[idx]}</div></td>;
                                        }
                                    })
                                   }
                                <td className={"book-total-td"}><div className={"book-total"}>¥{(row[3]*row[4]).toFixed(2)}</div></td>
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </table>
                </div>
                <div className={"allbook-total"}>合计:¥{this.state.total.toFixed(2)}</div>
                <div style={{width:'100%',height:'55px'}}><button className={"pay-button"}>支付</button></div>
            </div>

        );
    }


}

class Orderplace extends React.Component{
    constructor(props) {
        super(props);
    }
    render=()=> {
        return (
            <div style={{width:'90%',margin:'0 auto'}}>
                <div className="order-head"><span>订单信息确认</span></div>
                <PersonalInfo defaultUserInfo={this.props.defaultUserInfo}/>
                <OrderMain orderData={this.props.orderData}/>
            </div>
        );
    }
}

export default Orderplace;
export {Orderplace}
