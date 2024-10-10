const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Simple API route for testing
app.get('/api/algorithms', (req, res) => {
    res.json({
        algorithms: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'DFS', 'BFS']
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
