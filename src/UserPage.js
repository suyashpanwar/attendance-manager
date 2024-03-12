export default function UserPage(){
    return(
        <div>
            <div>
                <div className="nav-bar">
                    <p>User Profile</p>
                </div>
                <div className="current-admin">
                    <h3>email : suyashp124@gmail.com</h3>
                    <h3>password : Suyash</h3>
                </div>
            </div>
            <div>
                <div className="nav-bar">
                    <p>Send attendance request</p>
                </div>
                <div>
                    <label htmlFor="class-name" className="labels-user">Class</label>
                    <input type="text" id="class-name" placeholder="enter class ID" className="new-class"/>
                </div>
                <div className="button-new">
                    <button className="button">Send Request</button>
                </div>
            </div>
            <div>
                <div className="nav-bar">
                    <p>Add new class</p>
                </div>
                <form action="/action_page.php" className="class-new">
                    <label htmlFor="class-name" >Class</label>
                    <input type="text" id="class-name" placeholder="new class ID" className="new-class"/>
                    <p>attach excel file for new class</p>
                    <input type="file" id="myFile" name="filename" />
                    <input type="submit" className="button" />
                </form>
            </div>
        </div>
    )
}