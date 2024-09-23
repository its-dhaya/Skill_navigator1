import React, { useState } from 'react';

const SidebarAndProfile = () => {
  const [certifications, setCertifications] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    degree: '',
    specialization: '',
    phone: '',
    email: '',
    linkedIn: '',
    gitHub: '',
    languages: '',
  });
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [customLanguage, setCustomLanguage] = useState('');
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCertifications((prevCertifications) => [
      ...prevCertifications,
      ...files.map((file) => file.name),
    ]);
  };

  const handleRemoveFile = (fileName) => {
    setCertifications(certifications.filter((cert) => cert !== fileName));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error message on change
  };

  const handleLanguageSelect = (e) => {
    const { value } = e.target;
    if (value && !selectedLanguages.includes(value)) {
      setSelectedLanguages([...selectedLanguages, value]);
      setFormData({ ...formData, languages: '' }); // Reset dropdown
    }
  };

  const handleCustomLanguageAdd = () => {
    if (customLanguage && !selectedLanguages.includes(customLanguage)) {
      setSelectedLanguages([...selectedLanguages, customLanguage]);
      setCustomLanguage('');
    }
  };

  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate each field
    for (const key in formData) {
      if (formData[key] === '') {
        validationErrors[key] = `Please fill the ${key} field.`;
      }
    }

    if (certifications.length === 0) {
      validationErrors.certifications = 'Please upload at least one certification.';
    }

    if (selectedLanguages.length === 0) {
      validationErrors.languages = 'Please select at least one language.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert('Form submitted successfully!');
    // Add further actions for form submission
  };

  const handleLogout = () => {
    // Add your logout logic here
    alert('Logged out successfully!');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md h-screen flex flex-col">
        <div className="flex flex-col items-center py-10">
          {/* Profile Image */}
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <div className="bg-blue-200 w-28 h-28 rounded-full flex items-center justify-center">
                <span className="text-4xl text-blue-500">👤</span>
              </div>
            )}
          </div>

          <div className="mt-4 text-lg font-medium">YOUR INFO</div>

          {/* Edit Profile Image Button */}
          <label className="mt-4 text-blue-500 cursor-pointer flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <span className="material-icons">edit</span> Edit your profile image
          </label>
        </div>
        
        {/* Links */}
        <div className="flex flex-col mt-10 mb-auto">
          <a href="/home" target="_blank" rel="noopener noreferrer" className="px-6 py-4 hover:bg-blue-100 w-full text-left block text-blue-600">
            Home
          </a>
          <a href="/courses" target="_blank" rel="noopener noreferrer" className="px-6 py-4 hover:bg-blue-100 w-full text-left block text-blue-600">
            Courses
          </a>
          <a href="/activity" target="_blank" rel="noopener noreferrer" className="px-6 py-4 hover:bg-blue-100 w-full text-left block text-blue-600">
            Activity
          </a>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white mx-4 mb-4 py-2 rounded-md shadow hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Profile Form */}
      <div className="flex-1 bg-blue-50 p-8 rounded-lg">
        <div className="bg-white p-8 rounded-md shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Degree</label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Degree</option>
                  <option>B.E</option>
                  <option>B.Tech</option>
                  <option>B.Sc</option>
                  <option>M.E</option>
                  <option>M.Tech</option>
                  <option>M.Sc</option>
                </select>
                {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Enter Specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">+91</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email ID</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your E-mail ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Certifications</label>
              <div className="relative">
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md relative overflow-hidden">
                  Upload Certifications
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </button>
              </div>
              <ul className="mt-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center justify-between py-1">
                    <span>{cert}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(cert)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              {errors.certifications && <p className="text-red-500 text-sm">{errors.certifications}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Languages</label>
              <select
                name="languages"
                onChange={handleLanguageSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
                <option value="C++">C++</option>
                <option value="Ruby">Ruby</option>
                <option value="Go">Go</option>
                <option value="Swift">Swift</option>
                <option value="PHP">PHP</option>
                <option value="SQL">SQL</option>
              </select>
              <input
                type="text"
                placeholder="Add a custom language"
                value={customLanguage}
                onChange={(e) => setCustomLanguage(e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={handleCustomLanguageAdd}
                className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md"
              >
                Add Language
              </button>
              {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
              {/* Display the list of selected languages */}
              {selectedLanguages.length > 0 && (
                <ul className="mt-2 text-sm text-gray-700">
                  {selectedLanguages.map((language, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{language}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(language)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600">
                Update
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SidebarAndProfile;
