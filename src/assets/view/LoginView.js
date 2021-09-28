import React from "react"
import './css/login.css'
import {ThemeLine} from "../../App";
import {server_ip} from '../../App'

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
        if(this.state.username.length===0)
        {
            alert("用户名为空！")
            return;
        }

        if(this.state.password.length===0)
        {
            alert("密码为空！")
            return;
        }
        let user_id=-2,user_type=1
        fetch("http://"+server_ip+"/login?username=" + this.state.username + "&password=" + this.state.password, {
            credentials: 'include'
        }).then(response => response.text()).then(data=>{
            data=data.split(",");
            user_id=parseInt(data[0],10);
            user_type=parseInt(data[1],10);
        }).then(()=>{
            if(user_id===-1&&user_type===-1)
                alert("用户名或密码错误！");
            else if(user_type===-2)
            {
                alert("您已被管理员禁止登陆！！！")
            }else{
                alert("登陆成功！");
                // localStorage.setItem("user_id",user_id);
                // localStorage.setItem("user_name",this.state.username);
                // localStorage.setItem("user_type",user_type)
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
        this.state={
            username:"",
            password:"",
            againPassword:"",
            email:"",
            usernameExist:false,
            passwordEqual:true,
            emailValid:true,
        }
    }

    userNameChange=(e)=>{
        let username=e.target.value;
        if(username.length===0)
        {
            this.setState({username:username})
            return;
        }
        this.setState({username:username})
        fetch("http://"+server_ip+"/usernameExist?username="+username).then(response => response.text())
            .then(data=>{
                console.log(data);
                if(parseInt(data,10)===0)
                    this.setState({
                        usernameExist:false
                    })
                else
                    this.setState({
                        usernameExist:true
                    })
            })
    }

    handlePasswordEqual=(password,againPassword)=>
    {
        if(password===againPassword||againPassword.length===0)
        {
            this.setState({
                passwordEqual: true
            })
            return;
        }
        this.setState({
            passwordEqual: false
        })
    }

    passwordChange=(e)=>{
        let password=e.target.value;
        this.setState({password:password})
        this.handlePasswordEqual(password,this.state.againPassword)
    }
    againPasswordChange=(e)=>{
        let againPassword=e.target.value
        this.setState({againPassword:againPassword})
        this.handlePasswordEqual(this.state.password,againPassword)
    }
    emailChange=(e)=>{
        let email=e.target.value
        let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(myreg.test(email)||email.length===0)
        {
            this.setState({
                email:email,
                emailValid:true
            })
        }
        else
        {
            this.setState({
                email:email,
                emailValid:false
            })
        }
    }

    handleRegister=()=>{
        if(this.state.username.length===0)
        {
            alert("请输入用户名！")
            return;
        }

        if(this.state.password.length===0)
        {
            alert("请输入密码！")
            return;
        }

        if(this.state.againPassword.length===0)
        {
            alert("请输入重复密码！")
            return;
        }

        if(this.state.email.length===0)
        {
            alert("请输入邮箱！")
            return;
        }

        if(this.state.usernameExist)
        {
            alert("用户名已存在！")
            return;
        }

        if(!this.state.passwordEqual)
        {
            alert("两次输入的密码不一致！")
            return;
        }

        if(!this.state.emailValid)
        {
            alert("邮箱格式不正确！")
            return;
        }

        fetch("http://"+server_ip+"/addUser?username="+this.state.username+"&password="+this.state.password+"&email="+this.state.email).then();
        alert("注册成功！");
        this.props.closeRegister();
    }

    testState=()=>{
        console.log(this.state.username,this.state.password,this.state.againPassword,this.state.email);
    }
    render=()=>{
        return(
            <div id="register-holder" className={this.props.onRegister?'appear':'disappear'}>
                <div id="register-form">
                    <p id="reg-title">注册</p>
                    <div className="input-control">
                        <span className="inf">用户名</span>
                        <span style={{display:"inline-block",width:'25px'}}/>
                        <span style={{color:'red'}} className={this.state.usernameExist?'inline-block-appear':'disappear'}>用户名已存在！</span>
                        <input value={this.state.username} onChange={this.userNameChange} className="form-input" type="text" id="reg-user"/>
                    </div>
                    <div className="input-control">
                        <span className="inf">密码</span>
                        <input value={this.state.password} onChange={this.passwordChange} className="form-input" type="password" id="reg-password"/>
                    </div>
                    <div className="input-control">
                        <span className="inf">确认密码</span>
                        <span style={{display:"inline-block",width:'15px'}}/>
                        <span style={{color:'red'}} className={!this.state.passwordEqual?'inline-block-appear':'disappear'}>两次输入的密码不一致！</span>
                        <input value={this.state.againPassword} onChange={this.againPasswordChange} className="form-input" type="password" id="reg-password2"/>
                    </div>
                    <div className="input-control">
                        <span className="inf">邮箱</span>
                        <span style={{display:"inline-block",width:'15px'}}/>
                        <span style={{color:'red'}} className={!this.state.emailValid?'inline-block-appear':'disappear'}>邮箱格式不正确！</span>
                        <input value={this.state.email} onChange={this.emailChange} className="form-input" type="email" id="reg-password2"/>
                    </div>
                    <div className="register-button-box-holder">
                        <div className="register-button-box">
                            <button onClick={this.handleRegister} className="register-button">注册</button>
                            <button onClick={this.props.closeRegister} className="cancel-button">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class LoginView extends React.Component{
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
                <RegisterForm closeRegister={this.closeRegister} onRegister={this.state.onRegister}/>
            </div>
        );
    }
}

export {LoginView}
