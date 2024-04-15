import { deleteNote } from "../../redux/actions/noteActions";
import "./NoteList.css";
import { useSelector, useDispatch } from "react-redux";
import { noteActions, noteSelector } from "../../redux/reducers/noteReducer";

function NoteList() {
  // const notes = useSelector((state) => state.noteRed.notes);
  const notes = useSelector(noteSelector);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <p>{note.createdOn.toLocaleDateString()}</p>
            <p className="note-content">{note.text}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                // dispatch(deleteNote(index));
                dispatch(noteActions.delete(index));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
