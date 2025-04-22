const handleSubmit = async (e) => {
  e.preventDefault();

  const { username, email, password, confirmPassword } = formData;

  // Username must start with a capital letter
  if (!/^[A-Z]/.test(username)) {
    setError("Username must start with a capital letter");
    return;
  }

  // Email must be a valid gmail address
  if (!/^[\w.+\-]+@gmail\.com$/.test(email)) {
    setError("Email must be a valid @gmail.com address");
    return;
  }

  // Password must be at least 8 characters
  if (password.length < 8) {
    setError("Password must be at least 8 characters long");
    return;
  }

  // Passwords must match
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setError("");
  setLoading(true);

  try {
    const response = await axios.post(
      "https://healthtrackor.onrender.com/api/register",
      formData
    );
    localStorage.setItem("x-token", response.data.token);
    alert("Registration successful! Please login to continue.");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/login");
  } catch (err) {
    setError("Registration failed. Please try again.");
  } finally {
    setLoading(false);
  }
};
