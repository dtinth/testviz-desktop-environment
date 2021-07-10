const http = require('http');
const fs = require('fs');

// Create a server that saves the event to a log file
const server = http.createServer((req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	});
	req.on('end', () => {
    // Attempt to parse the body as JSON
    let json;
    try {
      json = JSON.parse(body);
    } catch(e) {
    }

    // Save the event to the log file
    if (Array.isArray(json)) {
      const event = [
        Date.now(),
        ...json
      ]
      console.log(event)
      fs.appendFileSync('/mnt/data/recordings/test.log', JSON.stringify(event) + '\n')
    }
    res.end('OK');
	});
});

server.listen(1230, () => {
	console.log(`Server running at http://localhost:1230`);
});