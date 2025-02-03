import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Auth.css";

const valorantCharacters = [
  "https://i.imgur.com/NvtkNPU.png",
  "https://i.imgur.com/ETMk87f.png",
  "https://i.imgur.com/YrXplp1.png",
  "https://i.imgur.com/MuSjhD6.png",
  "https://i.imgur.com/MdNk3RR.png",  
  "https://i.imgur.com/p6Dn3jY.png",
  "https://i.imgur.com/zZwMI9z.png",
  "https://i.imgur.com/En1W7Y1.png",
  "https://i.imgur.com/MrMQjun.png",
  "https://i.imgur.com/K59jXD9.png",
  "https://i.imgur.com/08cKK0A.png",
  "https://i.imgur.com/8bAEd4o.png",
  "https://i.imgur.com/zTnE1EO.png",

];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  });
  const [defaultCountry, setDefaultCountry] = useState("us");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    if (mode === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  useEffect(() => {
    // Fetch countries (replace with actual API if available)
    const allCountries = [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
      "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
      "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
      "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
      "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
      "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
      "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji",
      "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
      "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India",
      "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
      "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
      "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
      "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
      "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands",
      "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
      "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
      "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
      "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
      "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
      "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
      "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
      "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
      "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
      "Yemen", "Zambia", "Zimbabwe"
    ];

    setCountries(allCountries);
  }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/"); // IP tabanlı lokasyon API
        const data = await response.json();
        setDefaultCountry(data.country_code.toLowerCase());
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchCountry();
  }, []);

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";

    try {
      const response = await fetch(`${apiUrl}/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (!isLogin) {
          const randomIndex = Math.floor(
            Math.random() * valorantCharacters.length
          );
          data.characterImage = valorantCharacters[randomIndex];
        }

        localStorage.setItem("user", JSON.stringify(data));
        message.success(isLogin ? "Login successful." : "Registration successful.");

        if (isLogin && data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        message.error(isLogin ? "Login failed, please try again." : "Registration failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred, please try again.");
    }
  };

  const toggleMode = () => {
    navigate(`/auth?mode=${isLogin ? "register" : "login"}`);
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <p className="auth-description">
            {isLogin
              ? "Please enter your e-mail and password to Login to your account."
              : "Fill in the form below to create a new AccValo.Shop account."}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
              <div className="form-group">
                  <label>
                    Username <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    className="animated-input"
                    onChange={handleInputChange}
                    required
                  />
              </div>
                <div className="form-group">
                  <label>
                    First Name <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    className="animated-input"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Last Name <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    className="animated-input"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Phone <span className="required"></span>
                  </label>
                  <PhoneInput
                    country={defaultCountry}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    enableSearch={true}
                    placeholder="Phone Number"  
                  />
                </div>
                <div className="form-group">
                  <label>
                    Country <span className="required"></span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    className="animated-input"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                
               
              </>
            )}

            <div className="form-group">
              <label>
                Email <span className="required"></span>
              </label>
              <input
                type="email"
                name="email"
                className="animated-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Password <span className="required"></span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="animated-input"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
              </div>
            )}

            <button className="btn-submit">{isLogin ? "Login" : "Register"}</button>
          </form>

          {/* Toggle Button */}
          <div className="toggle-auth">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button onClick={toggleMode} className="link-button">
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={toggleMode} className="link-button">
                  Login here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
