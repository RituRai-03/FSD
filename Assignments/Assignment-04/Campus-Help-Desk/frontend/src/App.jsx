import { useState } from "react";
import "./App.css";

function App() {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  // Submit Request
  const submitRequest = async (e) => {
    e.preventDefault();

    const newRequest = {
      studentName: studentName,
      email: email,
      category: category,
      description: description,
      priority: priority
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

        // Clear form
        setStudentName("");
        setEmail("");
        setCategory("");
        setDescription("");
        setPriority("");
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
      <div className="container">

        <div className="header">
          <h1>Campus Help Desk</h1>
          <p>
            Submit your campus issue and we will help you resolve it.
          </p>
        </div>

        <div className="card">
          <h2>Submit a Request</h2>

          <form onSubmit={submitRequest}>

            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your college email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Electricity">Electricity</option>
                <option value="Internet">Internet</option>
                <option value="Classroom">Classroom</option>
                <option value="Hostel">Hostel</option>
                <option value="Library">Library</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Problem Description</label>
              <textarea
                placeholder="Describe your problem..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <button type="submit">
              Submit Request
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default App;