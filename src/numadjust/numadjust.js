import React from 'react';
import Cart from "../cart/cart";

class NumComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={value:this.props.initval};

    }
    increaseNum=()=>{
        let val=this.state.value;
        this.setState({value:this.state.value+1});
        this.props.numChange(val+1,this.props.idx);

    }

    decreaseNum=()=>{
        let val=this.state.value;
        this.setState({value:this.state.value-1<1?1:this.state.value-1})
        this.props.numChange(val-1<1?1:val-1,this.props.idx);
    }

    render=() =>{

        return(
            <div style={{display:"inline-block"}}>
                <button onClick={this.decreaseNum}>-</button>
                <input style={{width:'20px',textAlign:'center'}} value={this.state.value}/>
                <button onClick={this.increaseNum}>+</button>
            </div>
        );

    }
}


export default NumComponent ;
export {NumComponent}