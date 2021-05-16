import React from "react";
import ReactDOM from 'react-dom';
import render from 'react-dom';
import PropTypes from 'prop-types';
import './displayinturn.css'
class Displayinturn extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            activeIndex:1,
            offsetDistance:-this.props.imgWidth,
            pause:false,
            flag:false
        };
    }

    static defaultProps={
            interval:3000
    }

    propTypes={
        defaultActiveIndex:PropTypes.number,
        interval:PropTypes.number,
        number:PropTypes.number,
        imgWidth:PropTypes.number.isRequired,
        imgHeight:PropTypes.number.isRequired
    };


    componentDidMount=()=>{
        this.autoplay();
    }

    componentWillUnmount=()=>{
        clearTimeout(this.timeOuter);
        clearInterval(this.timer);
    }

    autoplay=()=>{
        this.timeOuter=setTimeout(this.playRight,this.props.interval);
    }

    mouseHandle=(e)=>{
        if(e.type=='mouseover'){
            this.setState({pause:true});
        }else if(e.type=='mouseleave'){
            this.setState({pause:false});
            this.timeOuter=setTimeout(this.playRight,this.props.interval);
        }
    }

    checkDots=(index)=>{
        var activeIndex;
        if(this.state.activeIndex==this.props.number+1){
            activeIndex=1;
        }else if(this.state.activeIndex===0){
            activeIndex=this.props.number;
        }else {
            activeIndex=this.state.activeIndex;
        }
        return index+1===activeIndex?'dots active':'dots';
    }

    dotsHover=(index)=>{
        clearInterval(this.timer);
        this.setState({activeIndex:index+1});
        this.position();
    }

    playRight=(indexIn)=>{
        if(this.state.flag){
            var index=indexIn?indexIn:this.state.activeIndex+1;
            this.setState({activeIndex:index});
            this.position();
        }
    }



    playLeft=(indexIn)=>{
        if(this.state.flag){
            var index=indexIn?indexIn:this.state.activeIndex-1;
            this.setState({activeIndex:index});
            this.position();
        }
    }

    position=()=> {
        this.setState({flag:false});
        this.timer=setInterval(function(){
            var boxDistance=this.props.imgWidth;
            var offsetDistance=this.state.offsetDistance;
            if(Math.abs(offsetDistance-(-boxDistance*this.state.activeIndex)) <= 0.09){
                offsetDistance = -boxDistance*this.state.activeIndex;
                clearInterval(this.timer);
                this.setState({flag:true});
                if(this.state.activeIndex > this.props.number){
                    offsetDistance = -boxDistance;
                    this.setState({activeIndex : 1});
                }else if(this.state.activeIndex === 0){
                    offsetDistance = -boxDistance*this.props.number;
                    this.setState({activeIndex : this.props.number});
                }
                this.setState({offsetDistance:offsetDistance});
                if(!this.state.pause){
                    this.autoplay();
                }
            }else{
                offsetDistance = offsetDistance-(boxDistance*this.state.activeIndex-Math.abs(offsetDistance))/30;
                this.setState({offsetDistance:offsetDistance});
            }
        }.bind(this),10);
    }

    directionHandle=()=> {
        return {
            left: this.state.offsetDistance + 'px',
            width: this.props.imgWidth * (this.props.number + 2),
            height: this.props.imgHeight
        };
    }
    left=()=> {
        var oldIndex=this.state.activeIndex;
        this.playLeft(oldIndex-1);
    }

    right=()=>{
        var oldIndex=this.state.activeIndex;
        this.playLeft(oldIndex+1);
    }

    render=()=>{
    var that=this;
    return (
        <div className={this.props.boxStyle} style={{width:this.props.imgWidth, height:this.props.imgHeight}} onMouseOver={this.mouseHandle} onMouseLeave={this.mouseHandle}>
        <span className="leftIcon" onClick={this.left}></span>
        <span className="rightIcon" onClick={this.right}></span>
        <div className="dots-wrap">
            {
                React.Children.map(this.props.children,function(elem,index){
                    return (<span className={that.checkDots(index)} onMouseOver={that.dotsHover.bind(that,index)}></span>);
                })
            }
        </div>
            <ul className={"Displayinturnul"} style={this.directionHandle()}>
            {this.props.children[this.props.number-1]}
            {this.props.children}
            {this.props.children[0]}
        </ul>
        </div>
);
    }
};




class DisplayinturnComponent extends React.Component{
    constructor(props){
        super(props)
    }

    propsTypes={
        DisplayinturnObject :PropTypes.object.isRequired,
        imgUrl :PropTypes.array.isRequired,
    }

    render=()=>{
        return (
            <Displayinturn interval={this.props.DisplayinturnObject.interval}
                           number={this.props.DisplayinturnObject.number}
                           imgWidth={this.props.DisplayinturnObject.imgWidth}
                           imgHeight={this.props.DisplayinturnObject.imgHeight}
                           boxStyle={this.props.boxStyle}>
                {
                    this.props.imgArray.map(function(item,index){
                        return <li key={index} className={"Displayinturnli"} >
                            <img className={"Displayinturnimg"}  width={this.props.DisplayinturnObject.imgWidth} height={this.props.DisplayinturnObject.imgHeight} src={item}/></li>;
                    }.bind(this))
                }
            </Displayinturn>
        );
    }
}



export default DisplayinturnComponent;
export {DisplayinturnComponent}