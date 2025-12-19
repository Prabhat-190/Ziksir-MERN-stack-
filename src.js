import API from "../services/api";

export default function Register() {
  const handleSubmit = async e => {
    e.preventDefault();

    await API.post("/auth/register", {
      email: e.target.email.value,
      password: e.target.password.value
    });

    alert("Registered successfully");
    window.location = "/";
  };

  return (
    <div className="container center">
      <form className="card" onSubmit={handleSubmit}>
        <h3>Register</h3>
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button>Register</button>
      </form>
    </div>
  );
}
