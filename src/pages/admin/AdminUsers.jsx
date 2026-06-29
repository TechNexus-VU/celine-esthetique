import { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "@/services/firebase/userService";

import { showSuccess, showError } from "@/utils/toast";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import StatusBadge from "@/components/admin/StatusBadge";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlockUser = async (user) => {
    const newStatus = user.status === "blocked" ? "active" : "blocked";

    try {
      await updateUser(user.id, {
        status: newStatus,
      });

      showSuccess(
        newStatus === "blocked"
          ? "User blocked successfully."
          : "User unblocked successfully."
      );

      await fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      showError("Failed to update user status.");
    }
  };

  const changeRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    try {
      await updateUser(user.id, {
        role: newRole,
      });

      showSuccess("User role updated successfully.");
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      showError("Failed to update user role.");
    }
  };

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      showSuccess("User deleted successfully.");
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showError("Failed to delete user.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedUserId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading users..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Client Management"
        subtitle="Manage registered users and permissions."
      />

      {users.length === 0 ? (
        <EmptyState
          title="No Users Found"
          message="No registered users yet."
        />
      ) : (
        <AdminTable
          headers={["Name", "Email", "Phone", "Role", "Status", "Actions"]}
        >
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4 font-medium text-darkText">
                {user.name || "-"}
              </td>

              <td className="py-4 text-greyText">
                {user.email}
              </td>

              <td className="py-4 text-greyText">
                {user.phone || "-"}
              </td>

              <td className="py-4 text-greyText capitalize">
                {user.role || "user"}
              </td>

              <td className="py-4">
                <StatusBadge status={user.status || "active"} />
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Change Role"
                  variant="secondary"
                  onClick={() => changeRole(user)}
                />

                <AdminButton
                  text={user.status === "blocked" ? "Unblock" : "Block"}
                  variant="warning"
                  onClick={() => toggleBlockUser(user)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(user.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminUsers;