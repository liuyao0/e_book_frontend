import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Select from "@material-ui/core/Select";
import TableContainer from "@material-ui/core/TableContainer";
import React from "react";
import {makeStyles,withStyles} from "@material-ui/core/styles";
import './bookmanager.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const classes=makeStyles({
    table: {
        minWidth: 650,
    },
});

class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            book_id:props.book_id,
            name:"",
            isbn:"",
            author:"",
            press:"",
            price:0,
            description:"",
            inventory:0,
            imgUrl:"",
            operateState:0,
        }
    }
    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
        if(nextProps.open!==this.state.open)
            this.setState({
                open:nextProps.open
            })

        if(nextProps.open&&nextProps.book_id!==this.state.book_id){
            this.setState({
                book_id:nextProps.book_id
            })

            if(nextProps.book_id!==-1){
                fetch("http://localhost:8080/bookdetail?book-id="+nextProps.book_id)
                    .then(response => response.json())
                    .then(bookData => {
                        let bookDetail=[];
                        bookData[0].map(function (content,idx)
                            {
                                bookDetail.push(content)
                            }
                        )
                        this.setState({
                            name:bookDetail[1],
                            isbn:bookDetail[2],
                            author:bookDetail[3],
                            press:bookDetail[4],
                            price:bookDetail[5],
                            description:bookDetail[6],
                            inventory:bookDetail[7],
                            imgUrl:bookDetail[8]
                        })
                    }).catch(function (ex) {
                    console.log('parsing failed', ex)
                })
            }
            else {
                this.setState({
                    book_id: -1,
                    name: "",
                    isbn: "",
                    author: "",
                    press: "",
                    price: 0,
                    description: "",
                    inventory: 0,
                    imgUrl: ""
                });
            }
        }

        if(nextProps.operateState!==this.state.operateState)
            this.setState({
                operateState:nextProps.operateState
            })
    }

    Cancel=()=>{
        this.props.handleCancel();
        this.setState({
            open:false
        })
    }

    Confirm=()=>{
        this.props.handleConfirm([
            this.state.book_id,
            this.state.name,
            this.state.isbn,
            this.state.author,
            this.state.press,
            this.state.price,
            this.state.description,
            this.state.inventory,
            this.state.imgUrl
        ],this.state.operateState);
        this.setState({
            open:false,
            operateState:0
        })
    }

    nameChange=(e)=>{
        this.setState({name:e.target.value})
    }
    isbnChange=(e)=>{
        this.setState({isbn:e.target.value})
    }
    authorChange=(e)=>{
        this.setState({author:e.target.value})
    }
    pressChange=(e)=>{
        this.setState({press:e.target.value})
    }
    priceChange=(e)=>{
        this.setState({price:e.target.value})
    }
    descriptionChange=(e)=>{
        this.setState({description:e.target.value})
    }
    inventoryChange=(e)=>{
        this.setState({inventory:e.target.value})
    }
    imgUrlChange=(e)=>{
        this.setState({imgUrl:e.target.value})
    }

    render = () => {
        return (
            <Dialog open={this.state.open} onClose={this.props.Cancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">书籍信息</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="书名"
                        variant="outlined"
                        fullWidth
                        value={this.state.name}
                        onChange={this.nameChange}
                    />
                    <TextField
                        margin="dense"
                        id="isbn"
                        label="ISBN"
                        variant="outlined"
                        value={this.state.isbn}
                        onChange={this.isbnChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="author"
                        label="作者"
                        type="text"
                        variant="outlined"
                        value={this.state.author}
                        onChange={this.authorChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="press"
                        label="出版社"
                        type="text"
                        variant="outlined"
                        value={this.state.press}
                        onChange={this.pressChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="价格"
                        type="text"
                        variant="outlined"
                        value={this.state.price.toString()}
                        onChange={this.priceChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="简介"
                        type="text"
                        variant="outlined"
                        value={this.state.description}
                        onChange={this.descriptionChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="inventory"
                        label="库存"
                        type="number"
                        variant="outlined"
                        value={this.state.inventory}
                        onChange={this.inventoryChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="imgUrl"
                        label="封面链接"
                        type="text"
                        variant="outlined"
                        value={this.state.imgUrl}
                        onChange={this.imgUrlChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.Cancel} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.Confirm} color="primary">
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

class BookManagerNoStyle extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            preSearchData:[],
            data:[],
            active:-1,
            onFilterByName:false,
            FilterName:"",
            operateState:0
        }

        fetch("http://localhost:8080/allBookInManager").then(response => response.json())
            .then(data => {
                this.setState({
                    data:data,
                    preSearchData:data
                })
            })
    }

    changeActive=(idx)=>{
        this.setState({
            active:(idx===this.state.active)?-1:idx
            })
    }

    changeFilterState=()=>{
        if(this.state.onFilterByName) {
            this.setState({
                active: -1,
                onFilterByName: false,
                data: this.state.preSearchData,
            })
        }else{
            this.setState({
                active:-1,
                onFilterByName:true,
            })
        }
    }

    DoFilterByName=()=>{
        let filterName=this.nameInput.value;
        let data=this.state.preSearchData;
        let newData=data.filter((row)=>{
                if(row[1].indexOf(filterName)!==-1)
                    return true;
            return false;
        })
        this.setState({
            data:newData,
            active:-1
        })
    }

    renderFilter=()=>{
        if(this.state.onFilterByName){
            return(
                <div>
                    <input placeholder={"书名..."} ref={input=>this.nameInput=input}/>
                    <button onClick={this.DoFilterByName}>确定</button>
                </div>
            )
        }
        else{
            return <div/>
        }
    }

    doAdd=()=>{
        this.setState({
            onFilterByName:false,
            operateState:1
        })
    }

    doChange=(bookRow)=>{
        if(this.state.active===-1)
            return;
        this.setState({
            onFilterByName:false,
            operateState:2
        })
    }

    //type
    //1:add
    //2:change
    doConfirm=(bookRow,type)=>{
        let newRow=[
            bookRow[0],
            bookRow[1],
            bookRow[2],
            bookRow[3],
            bookRow[4],
            bookRow[5],
            bookRow[7],
            bookRow[8]
        ];
        let infToService={
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "book_id":bookRow[0],
                "book_name":bookRow[1],
                "isbn":bookRow[2],
                "author":bookRow[3],
                "press":bookRow[4],
                "price":bookRow[5],
                "description":bookRow[6],
                "inventory":parseInt(bookRow[7],10),
                "imgUrl":bookRow[8]
            })
        }
        fetch("http://localhost:8080/changeBook",infToService).then(response=>response.text())
            .then(res=>{
                res=parseInt(res,10);
                newRow[0]=res;
                let newPreSearchData=this.state.preSearchData;
                if(type===1)
                {
                    newPreSearchData.push(newRow);
                    alert("添加成功！")
                }else{
                    let i=0;
                    newPreSearchData.map((row,idx)=>{
                        if(row[0]===res)
                            i=idx
                    })
                    newPreSearchData[i]=newRow
                    alert("修改成功！")
                }
                this.setState({
                    data:newPreSearchData,
                    preSearchData:newPreSearchData,
                    operateState:0
                })

            })
    }

    doCancel=()=>{
        this.setState({
            operateState:0
        })
    }

    doDel=()=>{
        let idx=this.state.active;
        if(idx===-1)
        {
            alert("请选择一行！")
            return;
        }
        fetch("http://localhost:8080//delbook?book-id="+this.state.data[idx][0]).then();
        let newData=this.state.data;
        let newPreSearchData=this.state.preSearchData;
        newPreSearchData=newPreSearchData.filter((row)=>{
            return (row[0]===newData[idx][0])
        })
        newData.splice(idx,1);
        this.setState({
            PreSearchData:newPreSearchData,
            data:newData
        })
    }


    renderOverLay=()=>{
        if(this.state.operateState===0)
            return <div/>
        return <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 4
        }}/>
    }
    renderOperate=()=>{
        return(
            <div>
                <button onClick={this.doAdd}>增加</button>
                <button onClick={this.doChange}>编辑</button>
                <button onClick={this.doDel}>删除</button>
            </div>
        )
    }

    renderTable=()=>{
        const {classes}=this.props;
        return(
            <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>书名</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell align="right">作者</TableCell>
                <TableCell align="right">出版社</TableCell>
                <TableCell align="right">价格</TableCell>
                <TableCell align="right">库存</TableCell>
                <TableCell align="center">图片</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {this.state.data.map((row,idx) => (
            <TableRow key={row.name}
                      className={this.state.active===idx?'bookManager-active':'bookManager-inactive'}
                      onClick={(e)=>{this.changeActive(idx)}}
            >
                <TableCell component="th" scope="row">
                    {row[1]}
                </TableCell>
                <TableCell align="right">{row[2]}</TableCell>
                <TableCell align="right">{row[3]}</TableCell>
                <TableCell align="right">{row[4]}</TableCell>
                <TableCell align="right">{row[5]}</TableCell>
                <TableCell align="right">{row[6]}</TableCell>
                <TableCell align="center">
                    <img src={row[7]}
                         style={{
                             maxWidth:'100px',
                             maxHeight:'150px'
                         }}
                    />
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
    </Table>
    </TableContainer>
        )
    }

    render=()=>{
        return(
        <div>
            <button onClick={this.changeFilterState}>按书名筛选</button>
            {this.renderFilter()}
            {this.renderOperate()}
            {this.renderTable()}
            <FormDialog open={this.state.operateState!==0}
                        handleConfirm={this.doConfirm}
                        handleCancel={this.doCancel}
                        book_id={this.state.operateState===2?this.state.data[this.state.active][0]:-1}
                        operateState={this.state.operateState}
            />
        </div>
        )
    }
}

const BookManager=withStyles(classes)(BookManagerNoStyle)
export {BookManager};