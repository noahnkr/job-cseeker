import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './index.css';

const Discover = () => {

    const { what } = useLocation().state;
    const { where } = useLocation().state;
    
    const [jobListings, setJobListings] = useState([]);
    const [titleOrCompany, setTitleOrCompany] = useState(what);
    const [location, setLocation] = useState(where);

    useEffect(() => {
        search();
    }, [])

    const showJobListings = jobListings.map(jobListing => {
        return (
            <div className="job-listing" key={jobListing._id}>
                <div className="job-listing-header">
                    <h1>{jobListing.title}</h1>
                </div>
                <div className="job-listing-company">
                    <h2>{jobListing.company} ({jobListing.type}) <br /></h2>
                    <h3>{jobListing.city}, {jobListing.state}, {jobListing.zip} <br /></h3>
                </div>
                <div className="job-listing-description">
                    <p>{jobListing.description} <br /><br /></p>
                    <p>Responsibilities:<br /></p>
                    {jobListing.responsibilities.map(responsibility => {
                        return (
                            <p>- {responsibility} <br /></p>
                        );
                    })}
                </div>
                <div className="job-listing-footer">
                    <h1>${jobListing.salary}</h1>
                    <Link className="apply-button" exact="true" to='/apply' state={{ id: jobListing._id, title: jobListing.title }}>
                        Apply
                    </Link>
                </div>
            </div>
        );
    })

    function search() {
        console.log('Searching...');
        if (titleOrCompany === '' && location === '') {
            getAllJobListings();
            console.log('Search completed.');
            return;
        }

        const filter = {
            titleOrCompany: titleOrCompany,
            location: location
        }
        getJobListings(filter);
        console.log('Search completed.');
    }

    function getJobListings(filter) {
        fetch(`http://localhost:4000/search?what=${filter.titleOrCompany}&where=${filter.location}`)
            .then(response => response.json())
            .then(data => {setJobListings(data); console.log(data)})
            .catch(err => console.log(err));
    }

    function getAllJobListings() {
        fetch('http://localhost:4000/')
            .then(response => response.json())
            .then(data => setJobListings(data))
            .catch(err => console.log(err));
    }

    function handleTitleOrCompanyChange(event) {
        setTitleOrCompany(event.target.value);
    }

    function handleLocationChange(event) {
        setLocation(event.target.value);
    }

    return (
        <div className="discover-container">
            <h1 className="discover-heading">Search for a Job.</h1>
            <div className="search-container">
                <div className="title-company-search">
                    <label htmlFor="title-company-input">What</label>
                    <input 
                        type="text" 
                        id="title-company-input" 
                        name="title-company-input" 
                        placeholder="Job Title or Company"
                        value={titleOrCompany}
                        onChange={handleTitleOrCompanyChange} 
                    />
                </div>
                <div className="location-search">
                    <label htmlFor="location-input">Where</label>
                    <input 
                        type="text" 
                        id="location-input" 
                        name="location-input" 
                        placeholder="City, State, or Zip"
                        value={location}
                        onChange={handleLocationChange} 
                    />
                </div>
                <button onClick={() => search()}>Search</button>
            </div>
            <div className="job-listings-container">
                {showJobListings}
            </div>
        </div>
    );
}

export default Discover;