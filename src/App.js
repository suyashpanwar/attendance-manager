import { Routes, Route } from 'react-router-dom';
import DisplayCode from './DisplayCode';
import LandingPage from './LandingPage';
import AdminButton from './AdminButton';
// import AdminPage from './AdminPage';
import AdminLogin from './AdminLogin';
import UserButton from './UserButton';
import UserLogin from './UserLogin';
import DateTimeDisplay from './DateTimeDisplay';
import Logo from './Logo';

export default function App(){
    return(
        <main> 
            <Routes>
                <Route path='/' element={
                <div>
                    <Logo/>
                    <DateTimeDisplay/>
                    <DisplayCode/>
                    <UserButton/>
                    <AdminButton/>
                    <LandingPage/>
                </div>} exact />
                <Route path='/AdminLogin' element={
                <div>
                    <AdminLogin/>
                </div>
                } />
                <Route path='/UserLogin' element={
                <div>
                    <UserLogin/>
                </div>} />
            </Routes>
        </main>
    )
}