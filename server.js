const http = require("http");
const { Worker, isMainThread } = require("node:worker_threads");

const server = http.createServer((req, res) => {
  if (req.url.split("?")[0] === "/compress" && req.method === "GET") {
    const fileName = req.url.split("?")[1].split("=")[1];
    if (isMainThread) {
      const worker = new Worker(`${__dirname}/worker.js`, {
        workerData: { fileName },
      });

      worker.on("message", (msg) => {
        if (msg.match(/No such file or directory/))
          res.end("No such file or directory");
        if (msg.match(/already exists/))
          res.end("File with the same name already exists");
        if (msg.match(/encoded/)) res.end("File encoded");
      });
    }
  } else if (req.url === "/test" && req.method === "GET") {
    res.end("test");
  } else res.end("404");
});

server.listen(3000, () => console.log("server is listening on port 3000"));
