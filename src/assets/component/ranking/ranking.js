import React, {forwardRef} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {NewDatePickers} from "../datepicker/datepickers";

class BookRanking extends React.Component{

    constructor(props) {
        super(props);
    }


    lastValue=0;
    currentRanking=1;
    renderRanking=(value,idx)=>{
        if(this.lastValue===value)
            return this.currentRanking;
        this.lastValue=value;
        this.currentRanking=idx+1;
        return this.currentRanking;
    }


    render=()=>{
        return(
            <div
                style={{
                   margin:'10px'
                }}>
                <div style={
                    {textAlign:'center',
                     width:'100%',
                     fontSize:'18px'}
                }>热销榜</div>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >排名</TableCell>
                                <TableCell align="right">书名</TableCell>
                                <TableCell align="right">ISBN</TableCell>
                                <TableCell align="right">作者</TableCell>
                                <TableCell align="right">出版社</TableCell>
                                <TableCell align="right">销量</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.bookData.map((row,idx) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {this.renderRanking(row[4],idx)}
                                    </TableCell>
                                    <TableCell>{row[0]}</TableCell>
                                    <TableCell align="right">{row[1]}</TableCell>
                                    <TableCell align="right">{row[2]}</TableCell>
                                    <TableCell align="right">{row[3]}</TableCell>
                                    <TableCell align="right">{row[4]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            );
    }
}

class UserRanking extends React.Component{
    constructor(props) {
        super(props);

    }
    lastValue=0;
    currentRanking=1;
    renderRanking=(value,idx)=>{
        if(this.lastValue===value)
            return this.currentRanking;
        this.lastValue=value;
        this.currentRanking=idx+1;
        return this.currentRanking;
    }

    render=()=>{
        return(
            <div
                style={{
                    margin:'10px'
                }}>
                <div style={
                    {textAlign:'center',
                        width:'100%',
                        fontSize:'18px'}
                }>消费榜</div>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >排名</TableCell>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="right">用户名</TableCell>
                                <TableCell align="right">消费额</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.userData.map((row,idx) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {this.renderRanking(row[2],idx)}
                                    </TableCell>
                                    <TableCell align="right">{row[0]}</TableCell>
                                    <TableCell align="right">{row[1]}</TableCell>
                                    <TableCell align="right">{row[2]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>)
    }

}

class Ranking extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookData:[],
            userData:[]
        }
    }
    BeginDateRef=React.createRef();
    EndDateRef=React.createRef();
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
                bookData:[],
                userData:[]
            })
            return;
        }
        let bookData=[],userData=[];
        fetch("http://localhost:8080/getSalesRanking?begin_time="+BeginDate.getTime().toString()+"&end_time="+EndDate.getTime().toString()).then(response => response.json())
            .then(data => {
                bookData=data;
                }
            ).then(()=>{
                this.setState({
                    bookData:bookData
                })
            }
        );

        fetch("http://localhost:8080/getConsumeRanking?begin_time="+BeginDate.getTime().toString()+"&end_time="+EndDate.getTime().toString()).then(response => response.json())
            .then(data => {
                    userData=data;
                }
            ).then(()=>{
                this.setState({
                    userData:userData
                })
            }
        );
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

    render=()=> {
        return(
            <div>
                {this.renderHeader()}
                <div style={{width:'100%'}}>

                    <BookRanking bookData={this.state.bookData}/>

                    <UserRanking userData={this.state.userData}/>
                </div>

            </div>

        )
    }
}

export {Ranking};