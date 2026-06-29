import { useEffect, useState } from "react";
import {
  addGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage,
} from "@/services/firebase/galleryService";

import { showSuccess, showError } from "@/utils/toast";

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGalleryItems();
      setGalleryItems(data);
    } catch (error) {
      console.error(error);
      showError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  const saveGalleryItem = async (editingId, formData, imageFile) => {
    try {
      setSaving(true);

      let imageData = {};

      if (imageFile) {
        imageData = await uploadGalleryImage(imageFile);
      }

      if (editingId) {
        await updateGalleryItem(editingId, {
          ...formData,
          ...imageData,
        });

        showSuccess("Gallery image updated successfully.");
      } else {
        await addGalleryItem({
          ...formData,
          ...imageData,
        });

        showSuccess("Gallery image uploaded successfully.");
      }

      await fetchGallery();
      return true;
    } catch (error) {
      console.error(error);
      showError("Failed to save gallery image.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const removeGalleryItem = async (id, imagePath) => {
    try {
      await deleteGalleryItem(id, imagePath);
      showSuccess("Gallery image deleted successfully.");
      await fetchGallery();
    } catch (error) {
      console.error(error);
      showError("Failed to delete gallery image.");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return {
    galleryItems,
    loading,
    saving,
    saveGalleryItem,
    removeGalleryItem,
  };
};