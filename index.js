import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors("*"));

app.post('/proxy', async (req, res) => {
    const url = req.body.url;
    const options = req.body.options;
    let responseData;

    try {
        const response = await fetch(url, options);
        responseData = {
            status: response.status,
            contentType: response.headers.get('content-type'),
            body: await response.text()
        }
    } catch (error) {
        responseData = {
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: error.message })
        }
    }

    res.json(responseData);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});