import { Link } from "react-router-dom"
export default function UserButton(){
    return(
        <div className="user-button"><Link to='/UserLogin' className="user-button">User</Link></div>
    )
}