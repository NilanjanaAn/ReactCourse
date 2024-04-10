import { useState } from "react";
import "./NoteForm.css";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/actions/noteActions";

function NoteForm({ onCreateNote }) {
  const dispatch = useDispatch();
  const [NoteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoteText("");
    dispatch(addNote(NoteText));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control mb-3"
          value={NoteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button className="btn btn-success float-end" type="submit">
          Create Note
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
