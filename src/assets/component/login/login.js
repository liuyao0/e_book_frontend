import React from "react"
import './login.css'
import loginLogo from './img/logo.png'
import loginBackground from './img/1.jpg'
import loginIcon from './img/2.png'
import Excel from "../excel/excel";


class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:""
        }
    }
    usernameChange=(e)=>
    {
        this.setState({
                username:e.target.value
            }
        )
    }
    passwordChange=(e)=>
    {
        this.setState({
                password:e.target.value
            }
        )
    }

    doLogin=()=>
    {
        let user_id=-2;
        let res=(async ()=>{
            try{
                let result=await fetch("http://localhost:8080/login?username="+this.state.username+"&password="+this.state.password);
                return result;
            }catch (e){
                console.log(e);
            }
        })();

        res.then(response => response.json()).then(data=>{
            user_id=parseInt(data,10);
        }).then(()=>{
            if(user_id===-1)
                alert("用户名或密码错误！");
            else
            {
                alert("登陆成功！");
                localStorage.setItem("user_id",user_id);
                localStorage.setItem("user_name",this.state.username);
                window.location.href="http://localhost:3000"
            }
        })

    }


    render=()=>{
        return(
            <div id="login-form">
                <div className="login-title" >登录</div>
                <div className="input-control">
                    <span className="icon-account" />
                    <input className="form-input" type="text" id="user" placeholder="用户名"
                           value = {this.state.username}
                           onChange={this.usernameChange}
                    />
                </div>
                <div className="input-control">
                    <span className="icon-password"/>
                    <input className="form-input" type="password" id="password" placeholder="密码"
                           value = {this.state.password}
                           onChange={this.passwordChange}/>
                </div>
                <div className="login-button-box">
                    <button onClick={this.doLogin}>登录</button>
                </div>
                <div className="login-action">
                    <a onClick={this.props.handleClick} className="pull-right">注册</a>
                </div>
            </div>
        );
    }
}
class RegisterForm extends React.Component{
    constructor(props) {
        super(props);
    }

    render=()=>{
        return(
            <div id="register-holder" className={this.props.onRegister?'appear':'disappear'}>
                <div id="register-form">
                    <p id="reg-title">注册</p>
                    <div className="input-control">
                        <span className="inf">用户名</span>
                        <input className="form-input" type="text" id="reg-user"/>
                    </div>
                    <div className="input-control">
                        <p className="inf">密码</p>
                        <input className="form-input" type="password" id="reg-password"/>
                    </div>
                    <div className="input-control">
                        <p className="inf">确认密码</p>
                        <input className="form-input" type="password" id="reg-password2"/>
                    </div>
                    <div className="register-button-box-holder">
                        <div className="register-button-box">
                            <button className="register-button">注册</button>
                            <button className="cancel-button">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            onRegister:false
        }
    }

    openRegister=()=>{
        this.setState({onRegister:true})
    }

    closeRegister=()=>{
        this.setState({onRegister:false})
    }

    render=()=> {
            return(
               <div>
                   <div id="login-wrapper-holder">
                       <div id="login-wrapper">
                           <div className="login-header-holder">
                               <header style={{ width: '1569px',margin:"0 auto",height:'auto'}}>
                                   <div id="login-logo-box">
                                       <a href="/">e-book</a>
                                   </div>
                               </header>
                           </div>
                           <div id="login-main">
                               <div id="login-container">
                                   <LoginForm handleClick={this.openRegister}/>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className={["overlay",this.state.onRegister?'appear':'disappear'].join(' ')}/>
                   <RegisterForm handleClick={this.closeRegister} onRegister={this.state.onRegister}/>
               </div>
             );
        }
    }

export default Login;
export {Login}

