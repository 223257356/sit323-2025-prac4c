const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Constants for number validation
const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
const MIN_NUMBER = Number.MIN_SAFE_INTEGER;

// Logger middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Utility function to check if inputs are valid numbers
const isValidNumber = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) &&
           value !== null &&
           value !== '' &&
           num <= MAX_NUMBER &&
           num >= MIN_NUMBER;
}

// Root route to check if server is running
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to the Calculator Microservice!',
        endpoints: {
            addition: '/add?num1=x&num2=y',
            subtraction: '/subtract?num1=x&num2=y',
            multiplication: '/multiply?num1=x&num2=y',
            division: '/divide?num1=x&num2=y',
            exponentiation: '/power?base=x&exponent=y',
            squareRoot: '/sqrt?num=x',
            modulo: '/mod?num1=x&num2=y'
        }
    });
});

// Addition endpoint
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for addition.' });
    }

    const result = num1 + num2;
    res.json({ result });
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for subtraction.' });
    }

    const result = num1 - num2;
    res.json({ result });
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for multiplication.' });
    }

    const result = num1 * num2;
    res.json({ result });
});

// Division endpoint
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for division.' });
    }

    if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
    }

    const result = num1 / num2;
    res.json({ result });
});

// Exponentiation endpoint
app.get('/power', (req, res) => {
    const base = parseFloat(req.query.base);
    const exponent = parseFloat(req.query.exponent);

    if (!isValidNumber(base) || !isValidNumber(exponent)) {
        return res.status(400).json({ error: 'Invalid numbers provided for exponentiation.' });
    }

    const result = Math.pow(base, exponent);

    if (!isFinite(result)) {
        return res.status(400).json({ error: 'Result is too large or undefined.' });
    }

    res.json({ result });
});

// Square root endpoint
app.get('/sqrt', (req, res) => {
    const num = parseFloat(req.query.num);

    if (!isValidNumber(num)) {
        return res.status(400).json({ error: 'Invalid number provided for square root.' });
    }

    if (num < 0) {
        return res.status(400).json({ error: 'Cannot calculate square root of a negative number.' });
    }

    const result = Math.sqrt(num);
    res.json({ result });
});

// Modulo endpoint
app.get('/mod', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for modulo operation.' });
    }

    if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed in modulo operation.' });
    }

    const result = num1 % num2;
    res.json({ result });
});

// Set the port and start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Calculator microservice is running at http://localhost:${port}`);
});
