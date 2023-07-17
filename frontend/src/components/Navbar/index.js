import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Navbar = () => {

    return (
        <div className="nav-bar-container">
            <nav className="nav-bar">
                <Link exact="true" to="/">
                    <h1 className="logo">Job CSeeker</h1>
                </Link>
                <div className="left-links">
                    <Link exact="true" to="/discover" state={{what: '', where: ''}}>
                        <h2>Discover Jobs</h2>
                    </Link>
                </div>
                <div className="right-links">
                    <Link exact="true" to="/edit-search" className="dropdown">
                        <FontAwesomeIcon icon={faBars} />
                    </Link>
                    <div className="post-job-button">
                        <Link exact="true" to="/post">
                            <h2>Post Job</h2>
                        </Link>
                    </div>
                </div>
                
            </nav>
        </div>
    );

}

export default Navbar;