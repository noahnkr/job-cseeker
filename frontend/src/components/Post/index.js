import { useState } from 'react';
import './index.css';

const Post = () => {

    const [newJobListing, setNewJobListing] = useState({
        _id: 0,
        title: "",
        description: "",
        responsibilities: [],
        type: "Full-Time",
        salary: 0,
        company: "",
        city: "",
        state: "",
        zip: ""
    })

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'title') {
            setNewJobListing({...newJobListing, title: value});
        } else if (name === 'description') {
            setNewJobListing({...newJobListing, description: value});
        } else if (name === 'responsibilities') {
            setNewJobListing({...newJobListing, responsibilities: value.split('&&')});
        } else if (name === 'type') {
            setNewJobListing({...newJobListing, type: value});
        } else if (name === 'salary') {
            setNewJobListing({...newJobListing, salary: value});
        } else if (name === 'company') {
            setNewJobListing({...newJobListing, company: value});
        } else if (name === 'city') {
            setNewJobListing({...newJobListing, city: value});
        } else if (name === 'state') {
            setNewJobListing({...newJobListing, state: value});
        } else if (name === 'zip') {
            setNewJobListing({...newJobListing, zip: value});
        }
    }

    function submit(e) {
        e.preventDefault();
        fetch('http://localhost:4000/post', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(newJobListing)
        })
            .then(response => response.json())
            .then(data => {
                console.log('New Job Listing Created.');
                console.log(data);
            })
            .catch(err => console.log(err));

        window.alert('New Job Listing Created.');
    }

    return (
        <div className="post-container">
            <div className="post-heading">
                <h1>Post a Job.</h1>
            </div>
            <div className="job-form-container">
                <form className="job-form" action="">
                    <h2>Basic Information</h2>
                    <div className="basic-information-input">
                        <input type="text" placeholder="Title" name="title" onChange={handleChange} />
                        <input type="text" placeholder="Company" name="company" onChange={handleChange} />
                        <textarea
                            name="description"
                            id="description"
                            cols="30" rows="5"
                            placeholder="Description"
                            onChange={handleChange}>
                        </textarea>
                        <textarea 
                            name="responsibilities" 
                            id="responsibilities" 
                            cols="30" rows="3" 
                            placeholder="Responsibilities, seperated by '&&'"
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="type-salary">
                        <select name="type" id="type" onChange={handleChange}>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="remote">Remote</option>
                        </select>
                        <input type="number" placeholder="Salary or Wage" name="salary" onChange={handleChange} />
                    </div>
                    <div className="location-input">
                        <h2>Location</h2>
                        <input type="text" placeholder="City" name="city" onChange={handleChange} />
                        <input type="text" placeholder="State" name="state" onChange={handleChange} />
                        <input type="text" placeholder="Zip" name="zip" onChange={handleChange} />
                    </div>
                    <input type="submit" value="Submit" onClick={submit}/>
                </form>
            </div>

        </div>
    );

}

export default Post;