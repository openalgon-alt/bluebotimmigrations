// server.js
// Startup file for Hostinger's Node.js application manager.
// Converts standard Node.js HTTP requests/responses into Web Standard Request/Response objects
// to execute the compiled Vinxi server handler.

import http from "http";
import server from "./dist/server/index.js"; // Import the compiled Vinxi server handler

const port = process.env.PORT || 3000;

http
  .createServer(async (req, res) => {
    try {
      // 1. Construct the request URL
      const protocol = req.headers["x-forwarded-proto"] || "http";
      const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
      const url = new URL(req.url, `${protocol}://${host}`);

      // 2. Convert Node request stream into a Web standard ReadableStream for the request body
      let body = null;
      if (req.method !== "GET" && req.method !== "HEAD") {
        body = new ReadableStream({
          start(controller) {
            req.on("data", (chunk) => controller.enqueue(chunk));
            req.on("end", () => controller.close());
            req.on("error", (err) => controller.error(err));
          },
        });
      }

      // 3. Construct headers
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value === undefined) continue;
        if (Array.isArray(value)) {
          for (const val of value) {
            headers.append(key, val);
          }
        } else {
          headers.set(key, value);
        }
      }

      // 4. Create Web standard Request object
      const webReq = new Request(url.toString(), {
        method: req.method,
        headers: headers,
        body: body,
        duplex: body ? "half" : undefined,
      });

      // 5. Invoke the compiled server fetch handler
      const webRes = await server.fetch(webReq, {}, {});

      // 6. Write status and headers back to the Node response
      res.statusCode = webRes.status;
      res.statusMessage = webRes.statusText;
      webRes.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      // 7. Write the response body back in chunks
      if (webRes.body) {
        const reader = webRes.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      }
      res.end();
    } catch (err) {
      console.error("Error handling request:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  })
  .listen(port, () => {
    console.log(`[Hostinger Server] Listening on http://localhost:${port}`);
  });
