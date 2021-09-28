import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import {server_ip}  from '../../../App'


class UserTable extends React.Component{
    classes=makeStyles({
        table: {
            minWidth: 650,
        },
    });
    constructor(props) {
        super(props);
        this.state={userData:[]}
        fetch("http://"+server_ip+"/allUser").then(response => response.json())
            .then(userData => {
                userData.map((row)=>{
                    if(row[4]===true)
                        row[4]=1;
                    else
                        row[4]=0;
                })
                this.setState({
                    userData: userData
                })
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    handleChange=(e,idx)=>{
        let user_id=this.state.userData[idx][0];
        let value=e.target.value;
        let newData=this.state.userData;
        newData[idx][4]=value;
        this.setState({
            userData: newData
        })
        fetch("http://"+server_ip+"/setUserState?user_id="+user_id.toString()+"&state="+value.toString()).then(
            response => response.text()
        ).then(result=>{
            let res=parseInt(result,10);
            if(res===0)
                alert('修改成功！')
            else
                alert('修改失败！')
        });
    }
    render=()=>{
        return (
            <TableContainer component={Paper}>
                <Table className={this.classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>用户id</TableCell>
                            <TableCell align="right">用户名</TableCell>
                            <TableCell align="right">e-mail</TableCell>
                            <TableCell align="right">用户类型</TableCell>
                            <TableCell align="right">状态</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.userData.map((row,idx) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row[0]}
                                </TableCell>
                                <TableCell align="right">{row[1]}</TableCell>
                                <TableCell align="right">{row[2]}</TableCell>
                                <TableCell align="right">{row[3]===0?'管理员':'普通用户'}</TableCell>
                                <TableCell align="right">
                                    <Select
                                        native
                                        value={row[4]}
                                        key={idx.toString()}
                                        onChange={(e)=>{this.handleChange(e,idx)}}

                                    >
                                        <option aria-label="None" value="" />
                                        <option value={0}>正常</option>
                                        <option value={1}>禁用</option>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }


}
export default {UserTable};
export {UserTable};
