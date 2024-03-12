export default function AdminPage(){
    return(
        <div>
            <div>
                <div className="nav-bar">
                    <p>Admin Profile</p>
                </div>
                <div className="current-admin">
                    <h3>email : suyashp124@gmail.com</h3>
                    <h3>password : Suyash</h3>
                </div>
            </div>
            <div>
                <div className="nav-bar">
                    <p>Add User</p>
                </div>
                <div>
                    <div>
                        <label htmlFor="new-email" className="labels-new">Email</label>
                        <input type="email" id="new-email" className="new-email"/>
                    </div>
                    <div>
                        <label htmlFor="new-password" className="labels-new">Password</label>
                        <input type="password" id="new-password" className="new-password" />
                    </div>
                    <div className="button-new">
                        <button className="button">Add User</button>
                    </div>  
                </div>
            </div>
            <div>
                <div className="nav-bar">
                    <p>Remove User</p>
                </div>
                <div>
                    <div>
                        <label htmlFor="new-email" className="labels-new">Email</label>
                        <input type="email" id="new-email" className="new-email"/>
                    </div>
                    <div>
                        <label htmlFor="new-password" className="labels-new">Password</label>
                        <input type="password" id="new-password" className="new-password" />
                    </div>
                    <div className="button-new">
                        <button className="button">Remove User</button>
                    </div>  
                </div>
            </div>
        </div>
    )
}