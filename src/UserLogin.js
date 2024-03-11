import React from 'react';
import UserPage from './UserPage.js';
// import AdminPage from './AdminPage.js';

export default function AdminLogin(){
    const [email, SetEmail] = React.useState("")
    const [passWord, SetPassword] = React.useState("")

    const [login, SetLogin] = React.useState(false)

    function handleEmailChange(event){
        SetEmail(event.target.value)
    }

    function handlePasswordChange(event){
        SetPassword(event.target.value)
    }

    const pass = "Suyash"
    const emai = "suyashp124@gmail.com"
    function LoginSucces(){
        if(passWord===pass && email===emai){
            SetLogin(true)
        }
        else{
            alert("wrong credentials")
        }
    }

    return(
        <div>
            {login?(
            <UserPage/>
            ) : (
            <div className="login">
                <h2>User Login</h2>
                <div>
                    <label htmlFor="email" className="labels">email</label>
                    <input type="email" id="email" className="login-email" value={email} onChange={handleEmailChange}/>
                </div>
                <div>
                    <label htmlFor="password" className="labels">password</label>
                    <input type="password" id="password" className="login-password" value={passWord} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button className="button" onClick={LoginSucces}>Login</button>
                </div>  
                <footer className="user-footer">
                    <p>If you're not a registered user, please contact admin on xyz@gmail.com</p>
                </footer>
            </div>
            )}
        </div>
    )
}
