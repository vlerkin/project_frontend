import NavigationBar from "@/components/navigationBar";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [usernameState, setUsername] = useState("");
  const [passwordState, setPassword] = useState("");
  const [getError, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usernameState || !passwordState) {
      return;
    }
    const postUser = async (username: string, password: string) => {
      const response = await axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
    };
    postUser(usernameState, passwordState);
    router.push("/");
  };

  return (
    <div className="hero-login">
      <NavigationBar background={false} />
      <div className="login-container">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-header">Login</h2>
          <>
            <label className="display-block input-label" htmlFor="username">
              Username
            </label>
            <input
              className="wider-input"
              type="text"
              id="username"
              name="username"
              value={usernameState}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </>
          <>
            <label className="display-block input-label" htmlFor="password">
              Password
            </label>
            <input
              className="display-block wider-input"
              type="password"
              id="password"
              name="password"
              value={passwordState}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
