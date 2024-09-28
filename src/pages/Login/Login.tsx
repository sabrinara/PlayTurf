import { useAddUsersLoginMutation } from "@/redux/api/api";
import { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginUser, { isLoading, isError, error }] = useAddUsersLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await loginUser({ email, password }).unwrap();
      console.log("Login successful: ", result);
      // You can store the token in localStorage or use context for user state
    } catch (err) {
      console.error("Login failed: ", err);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isError && <p className="error">Login failed: {error.toString()}</p>}
      </form>
    </div>
  );
};

export default Login;
