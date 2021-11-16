import React from 'react';
import {NewDatePickers} from "../datepicker/datepickers";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {server_ip}  from '../../../App'

class OrdinaryStatistics extends React.Component{
    BeginDateRef=React.createRef();
    EndDateRef=React.createRef();

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }

    }

    renderHeader=()=>{
        return(
            <div>
                <NewDatePickers label={"起"} ref={this.BeginDateRef}/>
                <NewDatePickers label={"止"} ref={this.EndDateRef}/>
                <button style={{margin:'5px'}} onClick={this.handleClick}>确定</button>
            </div>
        )
    }

    handleClick=()=>{
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
            this.setState({
                data:[]
            })
            return;
        }
        let bookData=[],userData=[];
        fetch("https://"+server_ip+"/getConsumeBook?begin_time="+BeginDate.getTime().toString()+
            "&end_time="+EndDate.getTime().toString(),{
             credentials:"include"
            }
        )
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data:data
                })
            });
    }


    render=()=> {
        if(this.state.data.length===0)
            return this.renderHeader();
        let data=this.state.data;
        let total=parseFloat(data[data.length-1]);
        data.splice(data.length-1,1);
        return(
            <div>
                {this.renderHeader()}
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>书名</TableCell>
                                <TableCell align="right">ISBN</TableCell>
                                <TableCell align="right">作者</TableCell>
                                <TableCell align="right">出版社</TableCell>
                                <TableCell align="right">单价</TableCell>
                                <TableCell align="right">数量</TableCell>
                                <TableCell align="right">总价</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map((row,idx) => (
                                <TableRow>
                                    <TableCell>{row[0]}</TableCell>
                                    <TableCell align="right">{row[1]}</TableCell>
                                    <TableCell align="right">{row[2]}</TableCell>
                                    <TableCell align="right">{row[3]}</TableCell>
                                    <TableCell align="right">{parseFloat(row[4]).toFixed(2)}</TableCell>
                                    <TableCell align="right">{row[5]}</TableCell>
                                    <TableCell align="right">{parseFloat(row[6]).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell>合计</TableCell>
                                <TableCell align="right">{total.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export {OrdinaryStatistics};
