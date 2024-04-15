import { useState } from "react";
import "./NoteForm.css";
import { useDispatch, useSelector } from "react-redux";
// import { addNote } from "../../redux/actions/noteActions";
import { noteActions } from "../../redux/reducers/noteReducer";
import {
  notificationActions,
  notificationSelector,
} from "../../redux/reducers/notificationReducer";

function NoteForm({ onCreateNote }) {
  const dispatch = useDispatch();
  const [NoteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoteText("");
    // dispatch(addNote(NoteText));
    dispatch(noteActions.add(NoteText));
  };

  const message = useSelector(notificationSelector);

  if (message) {
    setTimeout(() => {
      dispatch(notificationActions.reset());
    }, 3000);
  }

  return (
    <div className="container">
      {message ? (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      ) : null}
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
