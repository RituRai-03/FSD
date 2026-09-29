import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const [requests, setRequests] = useState([]);

  // Get all requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/requests"
      );

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Submit Request
  const submitRequest = async (e) => {
    e.preventDefault();

    const newRequest = {
      studentName,
      email,
      category,
      description,
      priority
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newRequest)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Request submitted successfully!");

        setStudentName("");
        setEmail("");
        setCategory("");
        setDescription("");
        setPriority("");

        fetchRequests();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="page">

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <p className="eyebrow">STUDENT SUPPORT</p>

            <h1>Campus Help Desk</h1>

            <p className="subtitle">
              Report campus problems and track your requests
              from one place.
            </p>
          </div>

          <div className="header-badge">
            <span className="status-dot"></span>
            Help Desk
          </div>
        </div>
      </header>

      <main className="container">

        {/* Submit Request */}
        <section className="card form-card">

          <div className="section-heading">
            <div>
              <h2>Submit a Request</h2>
              <p>
                Tell us about the issue you're facing on campus.
              </p>
            </div>
          </div>

          <form onSubmit={submitRequest}>

            <div className="form-row">

              <div className="form-group">
                <label>Student Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={studentName}
                  onChange={(e) =>
                    setStudentName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="yourname@college.edu"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Category</label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Internet">Internet</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Library">Library</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                  required
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

            </div>

            <div className="form-group">
              <label>Problem Description</label>

              <textarea
                placeholder="Describe the problem clearly..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              ></textarea>
            </div>

            <button className="submit-btn" type="submit">
              Submit Request
              <span>→</span>
            </button>

          </form>
        </section>


        {/* Submitted Requests */}
        <section className="requests-section">

          <div className="requests-header">
            <div>
              <p className="eyebrow">YOUR ACTIVITY</p>
              <h2>Submitted Requests</h2>
            </div>

            <div className="request-count">
              {requests.length}{" "}
              {requests.length === 1 ? "Request" : "Requests"}
            </div>
          </div>


          {requests.length === 0 ? (

            <div className="empty-state">
              <div className="empty-icon">✓</div>

              <h3>No requests yet</h3>

              <p>
                Your submitted campus issues will appear here.
              </p>
            </div>

          ) : (

            <div className="requests-list">

              {requests.map((request) => (

                <div className="request-card" key={request.id}>

                  <div className="request-top">

                    <div>
                      <span className="request-id">
                        REQUEST #{request.id}
                      </span>

                      <h3>{request.category}</h3>
                    </div>

                    <span
                      className={`priority ${request.priority.toLowerCase()}`}
                    >
                      {request.priority}
                    </span>

                  </div>

                  <p className="request-description">
                    {request.description}
                  </p>

                  <div className="request-footer">

                    <span>
                      <strong>{request.studentName}</strong>
                    </span>

                    <span>{request.email}</span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      <footer>
        Campus Help Desk • Student Support System
      </footer>

    </div>
  );
}

export default App;