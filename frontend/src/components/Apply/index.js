import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';

const Apply = () => {

    const { id } = useLocation().state;
    const { title } = useLocation().state;

    const [jobListing, setJobListing] = useState([]);

    const [newApplicant, setNewApplicant] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        month: 0,
        day: 0,
        year: 0,
        street: "",
        city: "",
        state: "",
        zip: 0
    });

    useEffect(() => {
        getJobListing(id);
    }, [])

    function getJobListing(id) {
        fetch(`http://localhost:4000/search?id=${id}`)
            .then(response => response.json())
            .then(data => setJobListing(data))
            .catch(err => console.log(err))
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'firstName') {
            setNewApplicant({ ...newApplicant, firstName: value });
        } else if (name === 'lastName') {
            setNewApplicant({ ...newApplicant, lastName: value });
        } else if (name === 'email') {
            setNewApplicant({ ...newApplicant, email: value });
        } else if (name === 'phone') {
            setNewApplicant({ ...newApplicant, phone: value });
        } else if (name === 'month') {
            setNewApplicant({ ...newApplicant, month: value });
        } else if (name === 'day') {
            setNewApplicant({ ...newApplicant, day: value });
        } else if (name === 'year') {
            setNewApplicant({ ...newApplicant, year: value });
        } else if (name === 'street') {
            setNewApplicant({ ...newApplicant, street: value });
        } else if (name === 'city') {
            setNewApplicant({ ...newApplicant, city: value });
        } else if (name === 'state') {
            setNewApplicant({ ...newApplicant, state: value });
        } else if (name === 'zip ') {
            setNewApplicant({ ...newApplicant, zip: value });
        }
    }

    function submit(e) {
        e.preventDefault();
        console.log(jobListing[0]);
        var currentApplicants = jobListing[0].applicants;

        currentApplicants.push(newApplicant);
        fetch(`http://localhost:4000/edit?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                applicants: currentApplicants
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        window.alert('Application submitted successfully.');
    }

    return (
        <div className="apply-container">
            <div className="apply-heading">
                <h1>Apply for {title} Position.</h1>
            </div>
        <div className="apply-form-container">
            <form className="apply-form" action="">
                <h2>Basic Information</h2>
                <div className="applicant-information-input">
                    <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} />
                    <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} />
                    <input type="text" placeholder="Email" name="email" onChange={handleChange} />
                    <input type="number" placeholder="Phone Number" name="phone" onChange={handleChange} />
                </div> 
                <h2>Date of Birth</h2>
                <div className="applicant-dob-input">
                    <input type="number" placeholder="Month" name="month" onChange={handleChange} />
                    <input type="number" placeholder="Day" name="day" onChange={handleChange} />
                    <input type="number" placeholder="Year" name="year" onChange={handleChange} />
                </div>
                <h2>Address</h2>
                <div className="applicant-address-input">
                    <input type="text" placeholder="Street" name="street" onChange={handleChange} />
                    <div className="city-state-zip">
                        <input type="text" placeholder="City" name="city" onChange={handleChange} />
                        <input type="text" placeholder="State" name="state" onChange={handleChange} />
                        <input type="number" placeholder="Zip" name="zip" onChange={handleChange} />
                    </div>
                </div>
                <div className="applicant-resume-input">
                    <h2>Resume</h2>
                    <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} />
                </div>
                <input type="submit" value="Submit Application" onClick={submit}/>
            </form>
        </div>
        </div>
    );
}

export default Apply;