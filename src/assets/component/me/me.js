import React from 'react';
import './me.css'

class MeAside extends React.Component{
    constructor(props) {
        super(props);
    }

    render=()=>{
        return (
            <div className={'me-aside'}>
                <p>Welcome,{this.props.username}</p>
                <div><a href="#">用户管理</a></div>
                <div><a href="#">书籍信息库</a></div>
            </div>
        );
    }
}

class Me extends React.Component{
    constructor(props) {
        super(props);
    }

    render=()=>{
        return (
            <div>
                <div style={{width:'90%',margin:'0 auto',position:"relative",border:"1px solid #000",height:'600px'}}>
                {/*<MeAside username={this.props.username}/>*/}
                <Order user_id={1}/>
                </div>
            </div>
    );

    }

}
class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state={load:false};
        let href=window.location.href;
        let user_id="";
        for(let i=href.length-1;href[i]>='0'&&href[i]<='9';i--)
            user_id+=href[i];
        user_id=user_id.split("").reverse().join("");
        if(user_id=="") user_id="0";
        fetch("http://localhost:8080/orderInfo?user-id="+user_id.toString())
            .then(response => response.json())
            .then(orderData => {
                this.setState({
                        data: orderData,
                        load: true
                    }
                )
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    renderTable=()=>{
        console.log(this.state.data);
        let order_id=[];
        let rows=[];
        this.state.data.map((row, rowidx) => {
            if (row[0] !== order_id)
            {
                order_id=row[0];
                rows.push(<tr><th>订单编号：{row[0]}</th></tr>);
                rows.push(<tr><th>时间：{row[1]}</th></tr>);
            }

            rows.push(
                <tr>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                    <td>{row[5]}</td>
                    <td>{row[6]}</td>
                    <td>{row[7]}</td>
                </tr>
        );
        })

        return(
            <table>
                <thead>
                <tr>
                    <td>书名</td>
                    <td>作者</td>
                    <td>出版社</td>
                    <td>价格</td>
                    <td>数量</td>
                </tr>
                </thead>
                <tbody>
                 {rows}
                </tbody>
            </table>
        )
    }
    render=()=>{
        if(!this.state.load)
            return (<div/>)

        return (
            <div>
                {this.renderTable()}
            </div>
        );
    }

}

export {Me};