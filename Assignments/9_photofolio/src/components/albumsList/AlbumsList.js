import { useState, useEffect } from "react";
import styles from "./albumsList.module.css";
import { AlbumForm } from "../albumForm/AlbumForm";
import { ImagesList } from "../imagesList/ImagesList";
import Spinner from "react-spinner-material";

import { db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

// react toasts
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AlbumsList = ({}) => {
  //These state are create just for your convience you can create modify or delete the state as per your requirement.

  const GET_ALBUMS_QUERY = query(
    collection(db, "albums"),
    orderBy("createdOn", "desc")
  );

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albumAddLoading, setAlbumAddLoading] = useState(false);
  const [addAlbumIntent, setAddAlbumIntent] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // create function to get all the album from the firebase.

  const getData = async () => {
    setLoading(true);
    const unsub = onSnapshot(GET_ALBUMS_QUERY, (snapshot) => {
      const albumList = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data.name,
        ...doc.data(),
      }));
      setAlbums(albumList);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // create function to handle adding of the album

  const handleAddAlbum = async (albumName) => {
    if (albums.find((album) => album.name === albumName.id))
      return toast.error("Album name already in use.");
    setAlbumAddLoading(true);
    const albumRef = collection(db, "albums");
    const docRef = await addDoc(albumRef, {
      name: albumName,
      createdOn: new Date(),
    });
    toast.success("Album added successfully.");
    setAlbumAddLoading(false);
  };

  const handleAlbumClick = (albumName) => {
    if (selectedAlbum === albumName) return setSelectedAlbum(null);
    setSelectedAlbum(albumName);
  };

  const onBack = () => {
    setSelectedAlbum(null);
  };

  if (albums.length === 0 && !loading) {
    return (
      <>
        {addAlbumIntent && <AlbumForm handleAddAlbum={handleAddAlbum} />}
        <div className={styles.top}>
          <h3>No albums found.</h3>
          <button onClick={() => setAddAlbumIntent(!addAlbumIntent)}>
            {!addAlbumIntent ? "Add album" : "Cancel"}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {!selectedAlbum && (
        <>
          {addAlbumIntent && (
            <AlbumForm
              handleAddAlbum={handleAddAlbum}
              loading={albumAddLoading}
            />
          )}
          <div className={styles.top}>
            <h3>Your albums</h3>
            <button
              className={`${addAlbumIntent && styles.active}`}
              onClick={() => setAddAlbumIntent(!addAlbumIntent)}
            >
              {!addAlbumIntent ? "Add album" : "Cancel"}
            </button>
          </div>
          {loading && (
            <div className={styles.loader}>
              <Spinner color="#0077ff" />
            </div>
          )}
          {!loading && (
            <div className={styles.albumsList}>
              {albums.map((album) => {
                return (
                  <div
                    className={styles.album}
                    key={album.id}
                    onClick={(e) => {
                      handleAlbumClick(album.name);
                    }}
                  >
                    <img src="/assets/gallery.png" alt="images"></img>
                    <span>{album.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {selectedAlbum && (
        <ImagesList
          albumId={albums.find((album) => album.name === selectedAlbum).id}
          albumName={selectedAlbum}
          onBack={onBack}
        />
      )}
    </>
  );
};
