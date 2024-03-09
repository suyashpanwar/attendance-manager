import { Routes, Route } from 'react-router-dom';
import DisplayCode from './DisplayCode';
import LandingPage from './LandingPage';
import AdminButton from './AdminButton';
// import AdminPage from './AdminPage';
import AdminLogin from './AdminLogin';
import UserButton from './UserButton';
import UserLogin from './UserLogin';

export default function App(){
    return(
        <main> 
            <Routes>
                <Route path='/' element={
                <div>
                    <DisplayCode/>
                    <UserButton />
                    <AdminButton/>
                    <LandingPage/>
                </div>} exact />
                <Route path='/AdminLogin' element={<AdminLogin/>} />
                <Route path='/UserLogin' element={<UserLogin />} />
            </Routes>
        </main>
    )
}