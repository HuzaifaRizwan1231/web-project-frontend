import React, { useState, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import Header from "../components/settings/Header";

const Settings = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "/placeholder.svg?height=100&width=100",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePicture = () => {
    fileInputRef.current?.click();
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (!oldPassword) errors.oldPassword = "Old password is required.";
    if (!newPassword) errors.newPassword = "New password is required.";
    else if (newPassword.length < 6)
      errors.newPassword = "Password must be at least 6 characters.";

    if (newPassword !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    return errors;
  };

  const saveChanges = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      setFormErrors({});
      const res = await mockSaveToBackend(passwords);
      console.log("Password updated successfully:", res);
      alert("Password updated!");
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err?.errors) {
        setFormErrors(err.errors);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Mock backend function
  const mockSaveToBackend = (passwords) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (passwords.oldPassword !== "correct-old-password") {
          reject({
            errors: { oldPassword: "Old password is incorrect." },
          });
        } else {
          resolve(passwords);
        }
      }, 1000);
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Account Settings</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Profile Picture */}
          <div className="bg-dark-secondary rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                Profile Picture
              </h2>
              <p className="text-text-primary text-sm mt-1">
                Update your profile image
              </p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="relative mb-6 group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                className="bg-button-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                onClick={handleChangePicture}
              >
                Change Picture
              </button>
            </div>
          </div>

          {/* Personal Info (read-only) */}
          <div className="bg-dark-secondary rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                Personal Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-white">Name</label>
                <div className="p-4 bg-dark-primary rounded-md text-white">
                  {user.name}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Email</label>
                <div className="p-4 bg-dark-primary rounded-md text-white">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-dark-secondary rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                Change Password
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-white">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                  className="primary-input !bg-dark-primary"
                  placeholder="Enter old password"
                />
                {formErrors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.oldPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-white">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="primary-input !bg-dark-primary"
                  placeholder="Enter new password"
                />
                {formErrors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-white">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="primary-input !bg-dark-primary"
                  placeholder="Confirm new password"
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                className="bg-button-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors w-full flex justify-center items-center gap-2"
                onClick={saveChanges}
                disabled={isLoading}
              >
                {isLoading && <FaSpinner className="animate-spin" />}
                Save Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
