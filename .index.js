const http = require('http');

const getStatus = (host, port = 25565) => {
    const status = require("minecraft-server-status");
    return new Promise((resolve) => {
        status(host, port, res => {
            resolve(res);
        });
    });
};

const PORT = 8000;
const server = http.createServer(async (request, response) => {
    const res = await getStatus("vh.mc.arkan1.ru");
    console.log(res);
    response.end(JSON.stringify(res));
});

server.listen(PORT);
console.log(`Server started for port ${PORT}`);
