import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  // Get notes from backend
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/notes");
      const data = await response.json();

      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Search notes
  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <h1>Notes Portal App</h1>

      {/* Search */}
      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="notes-container">

        {filteredNotes.map((note) => (
          <div className="note" key={note.fileName}>

            <h2>{note.name}</h2>

            <a
              href={`http://localhost:4000/api/download/${encodeURIComponent(
                note.fileName
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <button>Download</button>
            </a>

          </div>
        ))}

        {filteredNotes.length === 0 && (
          <p className="no-results">
            No notes found.
          </p>
        )}

      </div>

    </div>
  );
}

export default App;