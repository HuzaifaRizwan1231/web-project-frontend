import React, { useState, useRef, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import Header from "../components/settings/Header";

const Settings = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "/placeholder.svg?height=100&width=100",
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
  });

  const [formErrors, setFormErrors] = useState({}); // holds frontend + backend errors
  const [isLoading, setIsLoading] = useState(false); // simulate backend request

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditing.name) nameInputRef.current?.focus();
    if (isEditing.email) emailInputRef.current?.focus();
  }, [isEditing]);

  const toggleEdit = (field) => {
    setFormErrors({}); // clear errors when editing toggled
    setIsEditing((prev) => ({
      name: field === "name" ? !prev.name : false,
      email: field === "email" ? !prev.email : false,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

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

  const validateForm = () => {
    const errors = {};
    if (!user.name.trim()) errors.name = "Name is required.";
    if (!user.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "Email is invalid.";
    }
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
      // Simulate API call
      const res = await mockSaveToBackend(user);
      console.log("Saved user data:", res);
      setIsEditing({ name: false, email: false });
    } catch (err) {
      // Assume backend sends { errors: { name: '...', email: '...' } }
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
  const mockSaveToBackend = (user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate error from backend
        if (user.email === "taken@example.com") {
          reject({
            errors: { email: "This email is already in use." },
          });
        } else {
          resolve(user);
        }
      }, 1000);
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Account Settings</h1>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
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
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-white text-2xl font-medium">
                        {user.name}
                      </span>
                    )}
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
          </div>

          {/* Personal Info */}
          <div className="mt-8 space-y-8">
            <div className="bg-dark-secondary rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">
                  Personal Information
                </h2>
                <p className="text-text-primary text-sm mt-1">
                  Update your personal details
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-white">
                      Name
                    </label>
                    <button
                      className="h-8 px-2 text-text-primary hover:text-white transition-colors !bg-transparent"
                      onClick={() => toggleEdit("name")}
                    >
                      {isEditing.name ? "Cancel" : "Edit"}
                    </button>
                  </div>
                  {isEditing.name ? (
                    <>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="primary-input !bg-dark-primary"
                        placeholder="Enter your name"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm">
                          {formErrors.name}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center space-x-2 p-4 bg-dark-primary rounded-md">
                      <span className="text-white">{user.name}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-white">
                      Email
                    </label>
                    <button
                      className="h-8 px-2 text-text-primary hover:text-white transition-colors !bg-transparent"
                      onClick={() => toggleEdit("email")}
                    >
                      {isEditing.email ? "Cancel" : "Edit"}
                    </button>
                  </div>
                  {isEditing.email ? (
                    <>
                      <input
                        ref={emailInputRef}
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="primary-input !bg-dark-primary"
                        placeholder="Enter your email"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm">
                          {formErrors.email}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center space-x-2 p-4 bg-dark-primary rounded-md">
                      <span className="text-white">{user.email}</span>
                    </div>
                  )}
                </div>

                {(isEditing.name || isEditing.email) && (
                  <button
                    className="bg-button-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors w-full flex justify-center items-center gap-2"
                    onClick={saveChanges}
                    disabled={isLoading}
                  >
                    {isLoading && <FaSpinner className="animate-spin" />}
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
