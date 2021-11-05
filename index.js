const port = 5000;

const server = require("./api/server");

server.listen(port, () => console.log(`listening on port ${port}`));