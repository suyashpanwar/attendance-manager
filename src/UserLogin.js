export default function UserLogin(){
    return(
        <div className="login">
            <h2>User Login</h2>
            <div>
                <label htmlFor="email" className="labels">email</label>
                <input type="email" id="email" className="login-email"/>
            </div>
            <div>
                <label htmlFor="password" className="labels">password</label>
                <input type="password" id="password" className="login-password"/>
            </div>
            <div>
                <button className="button">Login</button>
            </div>  
            <footer className="user-footer">
                <p>If you're not a registered user, please contact admin on xyz@gmail.com</p>
            </footer>
        </div>
    )
}