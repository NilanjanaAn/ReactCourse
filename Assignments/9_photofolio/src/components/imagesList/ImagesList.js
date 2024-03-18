import styles from "./imageList.module.css";
import { useState, useRef, useEffect } from "react";
import Spinner from "react-spinner-material";
import { ImageForm } from "../imageForm/ImageForm";
import { Carousel } from "../carousel/Carousel";

import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

// react toasts
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ImagesList = ({ albumId, albumName, onBack }) => {
  const GET_IMAGES_QUERY = query(
    collection(db, "albums", albumId, "images"),
    orderBy("createdOn", "desc")
  );

  //These state and functions are create just for your convience you can create modify or delete the state as per your requirement.
  const [images, setImages] = useState([]);
  const [localImages, setLocalImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchIntent, setSearchIntent] = useState(false);
  const searchInput = useRef();
  // async function
  const getImages = async () => {
    setLoading(true);
    const unsub = onSnapshot(GET_IMAGES_QUERY, (snapshot) => {
      const imageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data.name,
        ...doc.data(),
      }));
      setImages(imageList);
      setLocalImages(imageList);
      setLoading(false);
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  const [addImageIntent, setAddImageIntent] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [updateImageIntent, setUpdateImageIntent] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeHoverImageIndex, setActiveHoverImageIndex] = useState(null);

  // function to handle toggle next image
  const handleNext = () => {
    if (activeImageIndex === images.length - 1) return setActiveImageIndex(0);
    setActiveImageIndex((prev) => prev + 1);
  };

  // function to handle toggle previous image
  const handlePrev = () => {
    if (activeImageIndex === 0) return setActiveImageIndex(images.length - 1);
    setActiveImageIndex((prev) => prev - 1);
  };

  // function to handle cancel
  const handleCancel = () => {
    setActiveImageIndex(null);
  };

  // function to handle search functionality for image
  const handleSearchClick = () => {
    if (searchIntent) {
      searchInput.current.value = "";
      getImages();
    }
    setSearchIntent(!searchIntent);
  };

  // function to handle search functionality for image
  const handleSearch = async () => {
    const searchValue = searchInput.current.value;
    if (searchInput.current?.value?.length === 0) {
      getImages();
    }
    if (!searchValue) return localImages;

    const matchingImages = localImages.filter((image) =>
      image.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setImages(matchingImages);
  };

  // async functions
  const handleAdd = async ({ title, url }) => {
    setImgLoading(true);
    const imageRef = await addDoc(collection(db, "albums", albumId, "images"), {
      title,
      url,
      createdOn: new Date(),
    });
    toast.success("Image added successfully");
    setImgLoading(false);
  };

  // function to handle update image
  const handleUpdate = async ({ title, url }) => {
    setImgLoading(true);
    const imageRef = doc(db, "albums", albumId, "images", updateImageIntent.id);
    await setDoc(imageRef, {
      title,
      url,
      createdOn: new Date(),
    });
    toast.success("Image updated successfully");
    setImgLoading(false);
    setUpdateImageIntent(false);
  };

  // function to handle delete image
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteDoc(doc(db, "albums", albumId, "images", id));
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  if (!images.length && !searchInput.current?.value && !loading) {
    return (
      <>
        <div className={styles.top}>
          <span onClick={onBack}>
            <img src="/assets/back.png" alt="back" />
          </span>
          <h3>No images found in the album.</h3>
          <button
            className={`${addImageIntent && styles.active}`}
            onClick={() => setAddImageIntent(!addImageIntent)}
          >
            {!addImageIntent ? "Add image" : "Cancel"}
          </button>
        </div>
        {addImageIntent && (
          <ImageForm
            loading={imgLoading}
            onAdd={handleAdd}
            albumName={albumName}
          />
        )}
      </>
    );
  }
  return (
    <>
      {(addImageIntent || updateImageIntent) && (
        <ImageForm
          loading={imgLoading}
          onAdd={handleAdd}
          albumName={albumName}
          onUpdate={handleUpdate}
          updateIntent={updateImageIntent}
        />
      )}
      {(activeImageIndex || activeImageIndex === 0) && (
        <Carousel
          title={images[activeImageIndex].title}
          url={images[activeImageIndex].url}
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={handleCancel}
        />
      )}
      <div className={styles.top}>
        <span onClick={onBack}>
          <img src="/assets/back.png" alt="back" />
        </span>
        <h3>Images in {albumName}</h3>

        <div className={styles.search}>
          {searchIntent && (
            <input
              placeholder="Search..."
              onChange={handleSearch}
              ref={searchInput}
              autoFocus={true}
            />
          )}
          <img
            onClick={handleSearchClick}
            src={!searchIntent ? "/assets/search.png" : "/assets/clear.png"}
            alt="clear"
          />
        </div>
        {updateImageIntent && (
          <button
            className={styles.active}
            onClick={() => setUpdateImageIntent(false)}
          >
            Cancel
          </button>
        )}
        {!updateImageIntent && (
          <button
            className={`${addImageIntent && styles.active}`}
            onClick={() => setAddImageIntent(!addImageIntent)}
          >
            {!addImageIntent ? "Add image" : "Cancel"}
          </button>
        )}
      </div>
      {loading && (
        <div className={styles.loader}>
          <Spinner color="#0077ff" />
        </div>
      )}
      {!loading && (
        <div className={styles.imageList}>
          {images.map((image, i) => (
            <div
              key={image.id}
              className={styles.image}
              onMouseOver={() => setActiveHoverImageIndex(i)}
              onMouseOut={() => setActiveHoverImageIndex(null)}
              onClick={() => setActiveImageIndex(i)}
            >
              <div
                className={`${styles.update} ${
                  activeHoverImageIndex === i && styles.active
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdateImageIntent(image);
                }}
              >
                <img src="/assets/edit.png" alt="update" />
              </div>
              <div
                className={`${styles.delete} ${
                  activeHoverImageIndex === i && styles.active
                }`}
                onClick={(e) => handleDelete(e, image.id)}
              >
                <img src="/assets/trash-bin.png" alt="delete" />
              </div>
              <img
                src={image.url}
                alt={image.title}
                onError={({ currentTarget }) => {
                  currentTarget.src = "/assets/warning.png";
                }}
              />
              <span>{image.title.substring(0, 20)}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
