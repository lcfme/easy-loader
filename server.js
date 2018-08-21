const path = require('path');
const fs = require('fs');
const express = require('express');
const multipart = require('connect-multiparty');
const app = express();
const multipartMiddleware = multipart();

app.use(multipartMiddleware);

app.post('/test', (req, res) => {
    const files = req.files;
    const file = files.file;
    if (file) {
        fs.renameSync(
            file.path,
            path.resolve(__dirname, `files/${Date.now().toString(32)}.webm`)
        );
    }
});

app.listen(1234);
