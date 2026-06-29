import { useEffect, useState } from "react";
import {
  addCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} from "@/services/firebase/couponService";

import { showSuccess, showError } from "@/utils/toast";

export const useCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await getCoupons();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      showError("Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  };

  const saveCoupon = async (editingId, formData) => {
    try {
      if (editingId) {
        await updateCoupon(editingId, formData);
        showSuccess("Coupon updated successfully.");
      } else {
        await addCoupon(formData);
        showSuccess("Coupon created successfully.");
      }

      await fetchCoupons();
      return true;
    } catch (error) {
      console.error("Error saving coupon:", error);
      showError("Failed to save coupon.");
      return false;
    }
  };

  const removeCoupon = async (id) => {
    try {
      await deleteCoupon(id);
      showSuccess("Coupon deleted successfully.");
      await fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      showError("Failed to delete coupon.");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return {
    coupons,
    loading,
    saveCoupon,
    removeCoupon,
  };
};