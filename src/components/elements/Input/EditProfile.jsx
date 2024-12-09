import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { toast } from "react-hot-toast";
import useUser from "../../../hooks/useUser";
import useUpdateUser from "../../../hooks/useUpdateUser";
import useDeleteUser from "../../../hooks/useDeleteUser";

const EditProfile = () => {
  const { userData, loading, error, refreshUser } = useUser();
  const {
    updateUser,
    loading: updating,
    error: updateError,
    success,
  } = useUpdateUser();
  const {
    deleteUser,
    loading: deleting,
    error: deleteError,
    success: deleteSuccess,
  } = useDeleteUser();

  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.fullName,
        phone: userData.phoneNumber,
        email: userData.email,
      });
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      fullName: profileData.name,
      phoneNumber: profileData.phone,
    };

    const success = await updateUser(updatedData);
    if (success) {
      refreshUser();
      toast.success("Profile updated successfully!");
    } else {
      toast.error(updateError || "Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (userData && userData.id) {
      const success = await deleteUser(userData.id);
      if (success) {
        toast.success("User deleted successfully!");
      } else {
        toast.error(deleteError || "Failed to delete user");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-8 md:mt-0 w-full md:w-[518px] h-auto border-2 p-4 rounded-[4px]">
      <h1 className="text-xl font-semibold py-4">Ubah Data Profil</h1>
      <div className="mb-6">
        <div className="bg-purple-400 text-white p-3 rounded-t-lg flex items-center gap-2">
          <User size={20} />
          <span>Data Diri</span>
        </div>
        <div className="space-y-4 p-4 border-gray-200 rounded-b-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg" // Menambahkan padding untuk memperbesar tinggi input
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg" // Menambahkan padding untuk memperbesar tinggi input
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-between mx-4">
          <button
            onClick={handleDelete}
            className={`bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors w-full sm:w-[48%] ${
              deleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Hapus Akun"}
          </button>
          <button
            onClick={handleSubmit}
            className={`bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors w-full sm:w-[48%] ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={updating}
          >
            {updating ? "Updating..." : "Simpan"}
          </button>
        </div>
      </div>

      {updateError && <div className="text-red-500 mt-4">{updateError}</div>}
      {success && (
        <div className="text-green-500 mt-4">Profile successfully updated!</div>
      )}
      {deleteError && <div className="text-red-500 mt-4">{deleteError}</div>}
      {deleteSuccess && (
        <div className="text-green-500 mt-4">User successfully deleted!</div>
      )}
    </div>
  );
};

export default EditProfile;
