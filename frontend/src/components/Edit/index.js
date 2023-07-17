import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './index.css';


const Edit = () => {
    const [editedJobListing, setEditedJobListing] = useState([{
        _id: 0,
        title: "",
        description: "",
        responsibilities: [],
        type: "Full-Time",
        salary: 0,
        company: "",
        city: "",
        state: "",
        zip: "",
        applicants: []
    }]);

    const { id } = useLocation().state;
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibilities] = useState([]);
    const [type, setType] = useState('');
    const [salary, setSalary] = useState(0);
    const [company, setCompany] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    
    useEffect(() => {
        getJobListing(id);  
    }, []);

    useEffect(() => {
        setTitle(editedJobListing[0].title);
        setDescription(editedJobListing[0].description);
        setResponsibilities(editedJobListing[0].responsibilities);
        setType(editedJobListing[0].type);
        setSalary(editedJobListing[0].salary);
        setCompany(editedJobListing[0].company);
        setCity(editedJobListing[0].city);
        setState(editedJobListing[0].state);
        setZip(editedJobListing[0].zip);
    }, [editedJobListing])

    
    function getJobListing(id) {
        fetch(`http://localhost:4000/search?id=${id}`)
            .then(response => response.json())
            .then(data => setEditedJobListing(data))
            .catch(err => console.log(err))
    }

    function deleteListing() {
        if (window.confirm(`Are you sure you want to delete the listing: ${editedJobListing[0].title}?`)) {
            fetch(`http://localhost:4000/delete?id=${id}`)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
            window.alert('Listing successfully deleted.');
        }
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'responsibilities') {
            setResponsibilities(value.split('&&'));
        } else if (name === 'type') {
            setType(value);
        } else if (name === 'salary') {
            setSalary(value);
        } else if (name === 'company') {
            setCompany(value);
        } else if (name === 'city') {
            setCity(value);
        } else if (name === 'state') {
            setState(value);
        } else if (name === 'zip') {
            setZip(value);
        }
    }

    function submit(e) {
        e.preventDefault();
        fetch(`http://localhost:4000/edit?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: editedJobListing._id,
                title: title,
                description: description,
                responsibilities: responsibilities,
                type: type,
                salary: salary,
                company: company,
                city: city,
                state: state,
                zip: zip
            })
        })
            .then(response => response.json())
            .then(data => console.log('Job Listing Information Updated.'))
            .catch(err => console.log(err));

        window.alert('Job Listing Information Updated.');
    }

    return (
        <div className="post-container">
            <div className="post-heading">
                <h1>Edit an Existing Job.</h1>
            </div>
            <div className="job-form-container">
                <form className="job-form" action="">
                    <div className="job-form-heading">
                        <h2>Basic Information</h2>
                        <div className="delete-icon" onClick={deleteListing}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <div className="basic-information-input">
                        <input type="text" placeholder="Title" name="title" value={title} onChange={handleChange} />
                        <input type="text" placeholder="Company" name="company" value={company} onChange={handleChange} />
                        <textarea
                            name="description"
                            id="description"
                            cols="30" rows="5"
                            placeholder="Description"
                            value={description}
                            onChange={handleChange}>
                        </textarea>
                        <textarea 
                            name="responsibilities" 
                            id="responsibilities" 
                            cols="30" rows="3" 
                            placeholder="Responsibilities, seperated by '&&'"
                            value={responsibilities.join('&&')}
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <select name="type" id="type" value={type} onChange={handleChange}>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="remote">Remote</option>
                    </select>
                    <input type="number" placeholder="Salary or Wage" name="salary" value={salary} onChange={handleChange} />
                    <div className="location-input">
                        <h2>Location</h2>
                        <input type="text" placeholder="City" name="city" value={city} onChange={handleChange} />
                        <input type="text" placeholder="State" name="state" value={state} onChange={handleChange} />
                        <input type="text" placeholder="Zip" name="zip" value={zip} onChange={handleChange} />
                    </div>
                    <input type="submit" value="Update" onClick={submit}/>
                </form>
            </div>
        </div>
    );

}

export default Edit;