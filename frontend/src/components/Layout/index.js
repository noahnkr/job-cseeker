import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import './index.css';

const Layout = () => {
    return (
        <div className="App">
            <Navbar />
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;