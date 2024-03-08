import DisplayCode from './DisplayCode';
import LandingPage from './LandingPage';
import AdminButton from './AdminButton';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './AdminPage';

export default function App(){
    return(
        <main> 
            <Routes>
                <Route path='/' element={
                <div>
                    <DisplayCode/>
                    <AdminButton/>
                    <LandingPage/>
                </div>} exact />
                <Route path='/AdminPage' element={<AdminPage/>} />
            </Routes>
        </main>
    )
}