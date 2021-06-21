import React, {forwardRef} from 'react';
import './order.css'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {GrayLine} from "../indexcomponent/indexcomponent";
import {TextField} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const useStylesDate= makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function DatePickers(props,ref) {
    const classes = useStylesDate();

    return (
        <form className={classes.container} ref={ref} noValidate>
            <TextField
                id="date"
                label={props.label}
                type="date"
                defaultValue="2021-05-30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }
                }
            />
        </form>
    );
}

const NewDatePickers=forwardRef(DatePickers);

function OrderTable(props) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>书名</TableCell>
                        <TableCell align="right">作者</TableCell>
                        <TableCell align="right">出版社</TableCell>
                        <TableCell align="right">单价</TableCell>
                        <TableCell align="right">数量</TableCell>
                        <TableCell align="right">总价</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.orderData.map(
                        (row, idx) => {
                            return(
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row[0]}
                                    </TableCell>
                                    <TableCell align="right">{row[1]}</TableCell>
                                    <TableCell align="right">{row[2]}</TableCell>
                                    <TableCell align="right">{row[3].toFixed(2)}</TableCell>
                                    <TableCell align="right">{row[4]}</TableCell>
                                    <TableCell align="right">{row[5].toFixed(2)}</TableCell>
                                </TableRow>
                            )
                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            load:false,
            preSearchData:null
        };
        let user_id=props.user_id;
        if(user_id===null) return;

        if(this.props.showUserName)
        {
            fetch("http://localhost:8080/allOrder")
                .then(response => response.json())
                .then(orderData => {
                    this.setState({
                            data: orderData,
                            preSearchData:orderData,
                            load: true,
                        }
                    )
                }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
        }else{
            fetch("http://localhost:8080/orderInfo?user_id="+user_id.toString())
                .then(response => response.json())
                .then(orderData => {
                    this.setState({
                            data: orderData,
                            preSearchData:orderData,
                            load: true,
                        }
                    )
                }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
        }
    }

    FilterByName=()=>{
        if(this.state.onFilterByName)
            this.setState({
                    onFilterByName: false,
                    onFilterByDate: false,
                    data:this.state.preSearchData,
                }
            )
        else this.setState({
                onFilterByName:true,
                onFilterByDate:false,
            }
        )
    }

    FilterByDate=()=>{
        if(this.state.onFilterByDate)
            this.setState({
                    onFilterByName: false,
                    onFilterByDate: false,
                    data:this.state.preSearchData,
                }
            )
        else this.setState({
                onFilterByName:false,
                onFilterByDate:true,
            }
        )
    }

    DoFilterByName=()=>{
        let filterName=this.nameInput.value;
        let data=this.state.preSearchData;
        let newData=data.filter((data)=>{
            let flag=false;
            data[2].map((row,idx)=>{
                if(row[0].indexOf(filterName)!==-1)
                    flag=true;
            })
            return flag;
        })
        this.setState({
            data:newData
        })
    }

    DoFilterByDate=()=>{
        let BeginDate=this.BeginDateRef.current[0].valueAsDate;
        let EndDate=this.EndDateRef.current[0].valueAsDate;
        BeginDate.setHours(0);
        BeginDate.setMinutes(0);
        BeginDate.setSeconds(0);
        EndDate.setHours(23);
        EndDate.setMinutes(59);
        EndDate.setSeconds(59);
        if(EndDate<BeginDate)
        {
            alert("错误的时间区间！");
            return;
        }
        let data=this.state.preSearchData;
        let newData=data.filter((data)=>{
                let dateString=data[1].replace(/-/g,"/");
                let date=new Date(dateString);
                if(date>=BeginDate&&date<=EndDate)
                    return true;
                else
                    return false;
            }
        )
        this.setState(
            {
                data:newData
            }
        )
    }

    getTotal=(rows)=> {
        let total = 0;
        rows.map(
            (row, idx) => {
                total += row[5]
            });
        return total;
    }
    BeginDateRef=React.createRef();
    EndDateRef=React.createRef();

    renderHead=()=>{
        if(this.state.onFilterByName)
            return(
                <div>
                    <input placeholder={"书名..."} ref={input=>this.nameInput=input}/>
                    <button onClick={this.DoFilterByName}>确定</button>
                </div>
            )
        if(this.state.onFilterByDate)
            return(
                <div>
                    <NewDatePickers label={"起"} ref={this.BeginDateRef}/>
                    <NewDatePickers label={"止"} ref={this.EndDateRef}/>
                    <button onClick={this.DoFilterByDate}>确定</button>
                </div>
            )
    }
    static defaultProps = {
        showUserName: false
    }
    renderMain=()=>{
        let data=this.state.data;
        let rows=[];
        data.map((table,idx)=>{
            rows.push(
                <div>
                    <div>
                        订单编号：{table[0]}
                    </div>
                    <div>
                        下单时间：{table[1]}
                    </div>
                    {this.props.showUserName?
                        <div>
                            用户名：{table[3]}
                        </div>:''}
                    <OrderTable showUserName={this.props.showUserName} orderData={table[2]}/>
                    <div style={{textAlign:"right"}}>
                        合计：{this.getTotal(table[2]).toFixed(2)}
                    </div>
                    <GrayLine/>
                </div>
            )
        })
        return rows;
    }
    render=()=>{
        if(!this.state.load)
            return (<div/>)
        return (
            <div>
                <button onClick={this.FilterByName}>按书名筛选</button>
                <button onClick={this.FilterByDate}>按日期筛选</button>
                {this.renderHead()}
                {this.renderMain()}
            </div>

        );
    }

}

export {Order};
