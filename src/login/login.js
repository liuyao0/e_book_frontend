import React from "react"
import './login.css'
import loginLogo from './img/logo.png'
import loginBackground from './img/1.jpg'
import loginIcon from './img/2.png'
import Excel from "../excel/excel";


class LoginForm extends React.Component{
    constructor(props) {
        super(props);
    }
    render=()=>{
        return(
            <div id="login-form">
                <div className="login-title">登录</div>
                <div className="input-control">
                    <span className="icon-account" />
                    <input className="form-input" type="text" id="user" placeholder="用户名"/>
                </div>
                <div className="input-control">
                    <span className="icon-password"/>
                    <input className="form-input" type="password" id="password" placeholder="密码"/>
                </div>
                <div className="login-button-box">
                    <button>登录</button>
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
                            <button onClick={this.props.handleClick} className="cancel-button">取消</button>
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

