import { Link } from 'react-router-dom';
import { useState } from 'react';
import './index.css';

const Home = () => {

    const [what, setWhat] = useState('');
    const [where, setWhere] = useState('');

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'title-company-input') {
            setWhat(value);

        } else if (name === 'location-input') {
            setWhere(value);
        }

    }

    return (
        <div className="home-container">
            <div className="main-text-container">
                <h1 className="main-text">Find a Job, Fast.</h1>
            </div>
            <div className="search-container">
                <div className="title-company-search">
                    <label htmlFor="title-company-input">What</label>
                    <input type="text" 
                           id="title-company-input" 
                           name="title-company-input" 
                           placeholder="Job Title or Company" 
                           onChange={handleChange} />
                </div>
                <div className="location-search">
                    <label htmlFor="location-input">Where</label>
                    <input type="text" 
                           id="location-input" 
                           name="location-input" 
                           placeholder="City, State, or Zip"
                           onChange={handleChange} />
                </div>
                <Link exact="true" to="/discover" state={{ what: what, where: where }}>
                    <button>Search</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;