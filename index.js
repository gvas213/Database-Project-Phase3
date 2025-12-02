const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const path = require('path');
require("dotenv").config();

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/courses', async (req, res) => {
    const { data, error } = await supabase
        .from('courses')
        .select()

    if(error) {
        return res.status(500);
    }

    return res.status(200).json(data);
});

app.get('/course_search', async (req, res) => {
    const course_name = req.query.course_name;
    console.log(course_name);

    // this srearch typo should be fixed, needs to be fixed in db to though since it's already been pushed
    const {data, error} = await supabase.rpc("unsafe_course_srearch", { course_name });
    console.log(data, error);

    if(error) {
        return res.status(500);
    }

    return res.status(200).json(data);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
