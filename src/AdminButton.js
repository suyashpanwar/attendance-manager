import { Link } from "react-router-dom"
export default function AdminButton(){
    return(
        <div className="admin-button"><Link to='/AdminLogin' className="admin-button">Admin</Link></div>
    )
}