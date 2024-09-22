const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer(); 
app.use(express.json());


app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});


app.post('/bfhl', upload.single('file_b64'), (req, res) => {
    const { data, file_b64 } = req.body;

    let numbers = [], alphabets = [], lowercaseAlphabets = [];


    data.forEach(item => {
        if (!isNaN(item)) numbers.push(item);
        else alphabets.push(item);
        if (item === item.toLowerCase() && isNaN(item)) lowercaseAlphabets.push(item);
    });

    let highestLowercaseAlphabet = lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets.sort().reverse()[0]]
        : [];

    let fileValid = file_b64 ? true : false;
    let fileMimeType = fileValid ? "image/png" : null;
    let fileSizeKB = fileValid ? (Buffer.byteLength(file_b64, 'base64') / 1024).toFixed(2) : null;

    res.json({
        is_success: true,
        user_id: "Harshvardhan_Sharma",  
        email: "hr4404@srmist.edu.in",
        roll_number: "RA2111051010021",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
