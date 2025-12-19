import API from "../services/api";

export default function Login() {
  const handleSubmit = async e => {
    e.preventDefault();

    const res = await API.post("/auth/login", {
      email: e.target.email.value,
      password: e.target.password.value
    });

    localStorage.setItem("token", res.data.token);
    window.location = "/notes";
  };

  return (
    <div className="container center">
      <form className="card" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button>Login</button>
      </form>
    </div>
  );
}
