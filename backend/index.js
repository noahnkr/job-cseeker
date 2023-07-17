const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));

mongoose.connect('mongodb://127.0.0.1:27017/reactdata',
    {
        dbName: 'reactdata',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const jobListingSchema = new mongoose.Schema(
    {
        _id: { type: Number },
        title: { type: String },
        description: { type: String },
        responsibilities: { type: Array },
        type: { type: String },
        salary: {type: Number },
        company: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        applicants: { type: Array }
    },
        { collection: 'final_project' }
);
const jobListing = mongoose.model('jobListing', jobListingSchema);

const port = process.env.PORT || 4000;
const host = 'localhost';
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});


app.get('/', async (req, res) => {
    const allJobListings = await jobListing.find({});
    res.send(allJobListings);
});

app.get('/search', async (req, res) => {
    const what = req.query.what;
    const where = req.query.where;
    const id = req.query.id;
    var filter;

    if (what !== undefined && where === undefined) {
        filter = { 
            $or: [
                { title: { $regex: what, $options: 'i' } },
                { company: { $regex: what, $options: 'i' } }
            ]
        };

    } else if (what === undefined && where !== undefined) {
        filter = {
            $or: [
                { city: { $regex: where, $options: 'i' } },
                { state: { $regex: where, $options: 'i' } },
                { zip: { $regex: where, $options: 'i' } }
            ]
        };

    } else {
        if (id !== undefined) {
            filter = { _id: id }

        } else {
            filter = { 
                    $and: [
                        {
                            $or: [
                                { title: { $regex: what, $options: 'i' } },
                                { company: { $regex: what, $options: 'i' } }
                            ] 
                        }, 
                        {
                            $or: [
                                { city: { $regex: where, $options: 'i' } },
                                { state: { $regex: where, $options: 'i' } },
                                { zip: { $regex: where, $options: 'i' } }
                            ]
                        }
                    ]
            };
        }
    }

    const matchingJobs = await jobListing.find(filter);
    res.send(matchingJobs);
});


app.post('/post', async (req, res) => {
    const id = (await jobListing.countDocuments()) + 1;
    const title = req.body.title;
    const description = req.body.description;
    const responsibilities = req.body.responsibilities;
    const type = req.body.type;
    const salary = req.body.salary;
    const company = req.body.company;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    const newJobListing = new jobListing({
        _id: id,
        title: title,
        description: description,
        responsibilities: responsibilities,
        type: type, 
        salary: salary,
        company: company,
        city: city,
        state: state,
        zip: zip,
        applicants: []
    });

    try {
        await jobListing.create(newJobListing);
        res.send(JSON.stringify({ message: 'New job listing successfully created.' }))

    } catch (err) {
        console.log('Error creating new job listing.');
        console.log(err);
    }
});

app.put('/edit', async (req, res) => {
    try {
        await jobListing.updateOne({ _id: req.query.id }, { $set: {
            title: req.body.title,
            description: req.body.description,
            responsibilities: req.body.responsibilities,
            type: req.body.type,
            salary: req.body.salary,
            company: req.body.company,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            applicants: req.body.applicants
        }});
        res.send('Successfully updated job listing.');

    } catch (err) {
        console.log('Error while updating job listing:' + err);
    }
});

app.delete('/delete', async (req, res) => {
    try {
        await jobListing.deleteOne({ _id: req.query.id });
        res.send('Succssfully deleted job listing.');
        
    } catch (err) {
        console.log('Error while deleting job listing: ' + err)
    }
});

