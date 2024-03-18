import styles from "./albumForm.module.css";
import { useRef } from "react";

export const AlbumForm = ({ loading, handleAddAlbum }) => {
  const albumNameInput = useRef();
  // function  to handle the clearing of the form
  const handleClear = () => {
    albumNameInput.current.value = "";
  };
  // function to handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddAlbum(albumNameInput.current.value);
    handleClear();
  };

  return (
    <div className={styles.albumForm}>
      <span>Create an album</span>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Album Name" ref={albumNameInput} />
        <button type="button" onClick={handleClear} disabled={loading}>
          Clear
        </button>
        <button disabled={loading}>Create</button>
      </form>
    </div>
  );
};
