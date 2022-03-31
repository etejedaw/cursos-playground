const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write(
            `
            <html>
            <head><title>/</title><head>
            <h1>send username</h1>
            <body>
                <form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>
            </body>
            </html>
            `
        );
        return res.end();
    }
    if(url === '/users'){
        res.write(
            `
            <html>
            <head><title>/users</title><head>
            <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            </ul>
            </html>
            `
        );
        return res.end();
    }
    if(url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => body.push(chunk));
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
        });
    }
}

module.exports = requestHandler;