import http from "http";

// Reusable CSS layout for all pages
const styles = `
  body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
  nav { background-color: #333; padding: 12px 20px; }
  nav a { color: white; margin-right: 15px; text-decoration: none; font-weight: bold; }
  nav a:hover { text-decoration: underline; }
  .container { padding: 30px; max-width: 600px; }
  table { border-collapse: collapse; width: 100%; margin-top: 15px; }
  th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
  th { background-color: #f4f4f4; }
  input, select { width: 95%; padding: 6px; }
  button { margin-top: 15px; padding: 10px 20px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; }
  button:hover { background: #0056b3; }
  #msg { margin-top: 15px; font-weight: bold; }
`;

// Navigation bar HTML template
const navbar = `
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/student">Student Form</a>
  </nav>
`;

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  // --- GET ROUTING ---
  if (req.method === "GET") {
    
    // 1. Home Page (Status Code: 200)
    if (req.url === "/") {
      res.writeHead(200, { ...headers, "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Home</title><style>${styles}</style></head>
        <body>
          ${navbar}
          <div class="container">
            <h1>Welcome to Home Page</h1>
            <p>This is the main dashboard of our Node.js HTTP server routing demonstration.</p>
          </div>
        </body>
        </html>
      `);
    }

    // 2. About Page (Status Code: 200)
    else if (req.url === "/about") {
      res.writeHead(200, { ...headers, "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>About</title><style>${styles}</style></head>
        <body>
          ${navbar}
          <div class="container">
            <h1>About Us</h1>
            <p>We are learning how to build custom web servers and handle routes using Node.js' native <code>http</code> module.</p>
          </div>
        </body>
        </html>
      `);
    }

    // 3. Contact Page (Status Code: 200)
    else if (req.url === "/contact") {
      res.writeHead(200, { ...headers, "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Contact</title><style>${styles}</style></head>
        <body>
          ${navbar}
          <div class="container">
            <h1>Contact Us</h1>
            <p>Email: admin@studentportal.com</p>
            <p>Phone: +1 (555) 019-2834</p>
          </div>
        </body>
        </html>
      `);
    }

    // 4. Student Form Page (Status Code: 200)
    else if (req.url === "/student") {
      res.writeHead(200, { ...headers, "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Student Form</title><style>${styles}</style></head>
        <body>
          ${navbar}
          <div class="container">
            <h2>Student Registration Form</h2>
            <form id="studentForm">
              <table>
                <thead><tr><th>Field</th><th>Input</th></tr></thead>
                <tbody>
                  <tr>
                    <td><label for="name">Name</label></td>
                    <td><input type="text" id="name" required placeholder="Name"></td>
                  </tr>
                  <tr>
                    <td><label for="age">Age</label></td>
                    <td><input type="number" id="age" required placeholder="20"></td>
                  </tr>
                  <tr>
                    <td><label for="branch">Branch</label></td>
                    <td>
                      <select id="branch" required>
                        <option value="">--Select Branch--</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics">Electronics</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label for="email">Email</label></td>
                    <td><input type="email" id="email" required placeholder="xyz@example.com"></td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">Submit Form</button>
            </form>
            <div id="msg"></div>
          </div>

          <script>
            document.getElementById('studentForm').addEventListener('submit', async (e) => {
              e.preventDefault();
              const msgDiv = document.getElementById('msg');
              
              const studentData = {
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                branch: document.getElementById('branch').value,
                email: document.getElementById('email').value
              };

              try {
                const res = await fetch('http://localhost:3001/api/students', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(studentData)
                });

                const data = await res.json();
                
                if (res.status === 200) {
                  msgDiv.style.color = "green";
                  msgDiv.textContent = "Status 200 Success: " + data.message;
                  document.getElementById('studentForm').reset();
                } else {
                  msgDiv.style.color = "red";
                  msgDiv.textContent = "Error Status: " + res.status;
                }
              } catch (err) {
                msgDiv.style.color = "red";
                msgDiv.textContent = "Failed to connect to backend server.";
              }
            });
          </script>
        </body>
        </html>
      `);
    }

    // 5. Unhandled Routes (Status Code: 404)
    else {
      res.writeHead(404, { ...headers, "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 Not Found</title><style>${styles}</style></head>
        <body>
          ${navbar}
          <div class="container">
            <h1 style="color:red;">404 - Page Not Found</h1>
            <p>The requested route does not exist.</p>
          </div>
        </body>
        </html>
      `);
    }
  } 

  // --- POST ROUTING ---
  else if (req.method === "POST" && req.url === "/api/students") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const studentData = JSON.parse(body);
      console.log("Connection established successfully");
      console.log("Received Student Payload:", studentData);

      res.writeHead(200, { ...headers, "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Student data saved successfully!",
          received: studentData,
        })
      );
    });
  }
});

server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});