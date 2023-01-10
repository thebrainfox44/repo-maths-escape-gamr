const Datastore = require("nedb");
const http = require("http");
const fs = require("fs");
require("dotenv").config();

const DB_UNLOCKED = new Datastore({ filename: "unlocked.db", autoload: true });

const PORT = process.env.PORT || "8080";

startserver();

let html,
  css,
  js,
  files_html,
  files_css,
  files_js,
  bg_jpg,
  app_1,
  camera_js,
  camera_html,
  camera_css;
let somethingToUpdate = false;
let updateArray = {};

async function startserver() {
  fs.readFile("./bg.jpg", (e, data) => {
    if (e) throw e;
    bg_jpg = data;
  });
  fs.readFile("./app_1.png", (e, data) => {
    if (e) throw e;
    app_1 = data;
  });
  fs.readFile("./index.html", (e, data) => {
    if (e) throw e;
    html = data.toLocaleString();
  });
  fs.readFile("./style.css", (e, data) => {
    if (e) throw e;
    css = data.toLocaleString();
  });
  fs.readFile("./script.js", (e, data) => {
    if (e) throw e;
    js = data.toLocaleString();
  });

  fs.readFile("./files/index.html", (e, data) => {
    if (e) throw e;
    files_html = data.toLocaleString();
  });
  fs.readFile("./files/style.css", (e, data) => {
    if (e) throw e;
    files_css = data.toLocaleString();
  });
  fs.readFile("./files/script.js", (e, data) => {
    if (e) throw e;
    files_js = data.toLocaleString();
  });

  fs.readFile("./camera/index.html", (e, data) => {
    if (e) throw e;
    camera_html = data.toLocaleString();
  });
  fs.readFile("./camera/style.css", (e, data) => {
    if (e) throw e;
    camera_css = data.toLocaleString();
  });
  fs.readFile("./camera/script.js", (e, data) => {
    if (e) throw e;
    camera_js = data.toLocaleString();
  });

  fs.readFile("./admin/index.html", (e, data) => {
    if (e) throw e;
    admin_html = data.toLocaleString();
  });
  fs.readFile("./admin/style.css", (e, data) => {
    if (e) throw e;
    admin_css = data.toLocaleString();
  });
  fs.readFile("./admin/script.js", (e, data) => {
    if (e) throw e;
    admin_js = data.toLocaleString();
  });

  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.write(html);
      res.end();
      return;
    }
    if (req.url === "/bg.jpg" && req.method === "GET") {
      res.write(bg_jpg);
      res.end();
      return;
    }
    if (req.url === "/app_1.jpg" && req.method === "GET") {
      res.write(app_1);
      res.end();
      return;
    }
    if (req.url === "/style.css" && req.method === "GET") {
      res.write(css);
      res.end();
      return;
    }
    if (req.url === "/script.js" && req.method === "GET") {
      res.write(js);
      res.end();
      return;
    }
    if (req.url === "/files/") {
      res.write(files_html);
      res.end();
      return;
    }
    if (req.url === "/files/style.css" && req.method === "GET") {
      res.write(files_css);
      res.end();
      return;
    }
    if (req.url === "/files/script.js" && req.method === "GET") {
      res.write(files_js);
      res.end();
      return;
    }
    if (req.url === "/camera/") {
      res.write(camera_html);
      res.end();
      return;
    }
    if (req.url === "/camera/style.css" && req.method === "GET") {
      res.write(camera_css);
      res.end();
      return;
    }
    if (req.url === "/camera/script.js" && req.method === "GET") {
      res.write(camera_js);
      res.end();
      return;
    }
    if (req.url === "/admin" && req.method === "GET") {
      res.write(admin_html);
      res.end();
      return;
    }
    if (req.url === "/admin/style.css" && req.method === "GET") {
      res.write(admin_css);
      res.end();
      return;
    }
    if (req.url === "/admin/script.js" && req.method === "GET") {
      res.write(admin_js);
      res.end();
      return;
    }
    if (req.url === "/api/open" && req.method == "POST") {
      element = JSON.parse(req.headers.content);
      if (/\d/.test(element)) {
        console.log("requested admin folder open");
        res.write(JSON.stringify({ status: "folder opened on all clients" }));
        res.end();
        somethingToUpdate = true;
        updateArray = { order: "openfolder", object: element };
        return;
      } else {
        console.log("requested admin file open");
        res.write(JSON.stringify({ status: "file opened on all clients" }));
        res.end();
        somethingToUpdate = true;
        updateArray = { order: "openfile", object: element };
        return;
      }
    }
    if (req.url === "/api/unlock" && req.method == "POST") {
      folder = JSON.parse(req.headers.content);
      console.log("requested admin file unlock");
      res.write(JSON.stringify({ status: "folder unlocked on all clients" }));
      res.end();
      somethingToUpdate = true;
      updateArray = { order: "unlockfolder", object: folder };
      return;
    }
    if (req.url === "/api/lock" && req.method == "POST") {
      folder = JSON.parse(req.headers.content);
      console.log("requested admin file lock");
      res.write(JSON.stringify({ status: "folder locked on all clients" }));
      res.end();
      somethingToUpdate = true;
      updateArray = { order: "lockfolder", object: folder };
      return;
    }
    if (req.url === "/api/audioclue" && req.method == "POST") {
      clue = JSON.parse(req.headers.content);
      console.log("requested admin audio clue");
      res.write(JSON.stringify({ status: "audio clue played on all clients" }));
      res.end();
      somethingToUpdate = true;
      updateArray = { order: "audioclue", object: clue };
      return;
    }
    if (req.url === "/api/closepopup" && req.method == "POST") {
      popup = JSON.parse(req.headers.content);
      console.log("requested admin popup close");
      res.write(JSON.stringify({ status: "popup closed on all clients" }));
      res.end();
      somethingToUpdate = true;
      updateArray = { order: "closepopup", object: popup };
      return;
    }
    if (req.url === "/api/update" && req.method == "POST") {
      if (somethingToUpdate) {
        somethingToUpdate = false;
        if (updateArray.order == "openfolder") {
          res.write(
            JSON.stringify({ id: updateArray.object, type: "openfolder" })
          );
          res.end();
          return;
        }
        if (updateArray.order == "openfile") {
          res.write(
            JSON.stringify({ id: updateArray.object, type: "openfile" })
          );
          res.end();
          return;
        }
        if (updateArray.order == "unlockfolder") {
          res.write(
            JSON.stringify({ id: updateArray.object, type: "unlockfolder" })
          );
          res.end();
          return;
        }
        if (updateArray.order == "lockfolder") {
          res.write(
            JSON.stringify({ id: updateArray.object, type: "lockfolder" })
          );
          res.end();
          return;
        }
        if (updateArray.order == "closepopup") {
          res.write(
            JSON.stringify({ id: updateArray.object, type: "closepopup" })
          );
          res.end();
          return;
        }
        if (updateArray.order == "audioclue") {
          let audiopath;
          if (updateArray.object == "clue1") audiopath = "./tts/1.mp3";
          if (updateArray.object == "clue2") audiopath = "./tts/2.mp3";

          res.write(JSON.stringify({ id: audiopath, type: "playaudio" }));
          res.end();
          return;
        }
        return console.log("error in UPDATEARRAY");
      }
      res.write(JSON.stringify({ status: "nothing to update" }));
      res.end();
      return;
    }
    if (req.url == "/api/getfile" && req.method == "POST") {
      data = JSON.parse(req.headers.content);
      path = data.path;
      type = data.type;

      fs.readFile("./fs-files/" + path + ".html", (e, data) => {
        if (e) console.log(e);
        res.write(
          JSON.stringify({
            title: path + "." + type,
            html: data.toLocaleString(),
          })
        );
        res.end();
      });
      return;
    }
    if (req.url.startsWith("/tts/")) {
      if (req.url.includes("Roboto-Regular.ttf"))
        return console.log("import roboto isnt in our scopes");
      res.writeHead(200, {
        "Content-Type": "audio/x-wav",
      });

      var readStream = fs.createReadStream("." + req.url);
      readStream.pipe(res);
      return;
    }
    if (req.url === "/player/") {
      fs.readFile("./player/index.html", (e, data) => {
        if (e) throw e;
        data;
        res.write(data);
        res.end();
      });
      return;
    }
    if (req.url.startsWith("/player/")) {
      fs.readFile("." + req.url, (e, data) => {
        if (e) throw e;
        data;
        res.write(data);
        res.end();
      });
      return;
    }
    res.write("error 404");
    res.statusCode = "404";
    res.end();
  });

  server.listen(PORT, () => {
    console.log(`Server is running at: localhost:${PORT}`);
  });
}
