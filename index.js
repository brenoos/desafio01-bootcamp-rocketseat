const express = require('express');

const app = express();

app.use(express.json());

const projects = [
    {
        id: '1',
        title: 'novo projeto',
        tasks: []
    }
]

app.get('/projects', (req, res) => res.json(projects))

app.listen(3333, () => {
    console.log("Server Running");
})