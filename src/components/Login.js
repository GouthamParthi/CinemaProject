import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material/";
import Box from "@mui/material/Box";
import Header from "./Header";
import "./Login.css";
import token from "./token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AdminDataConfidential = { USERNAME: "Admin", PASSWORD: "LetMeIn" };

const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const handleFormDetails = (e) => {
    const { name } = e.target;
    if (name == "username") {
      setUserName(e.target.value);
      console.log(userName);
    } else if (name == "password") {
      setPassword(e.target.value);
      console.log(password);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("pass", password);
    console.log(userName == AdminDataConfidential.USERNAME);
    console.log(password == AdminDataConfidential.PASSWORD);
    if (
      userName &&
      password &&
      userName == AdminDataConfidential.USERNAME &&
      password == AdminDataConfidential.PASSWORD
    ) {
      localStorage.setItem("token", token);
      toast.success("Login Successful", {
        position: toast.POSITION.TOP_RIGHT
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Login Failed", { position: toast.POSITION.TOP_RIGHT });

      navigate("/login");

      console.log("fromloginButton");
    }
  };
  return (
    <Box className="login">
      <Header token={token} fixedOrRelative="fixed" />
      <Box className="card">
        <form onSubmit={handleLogin}>
          <Stack spacing={1}>
            <h2>SignIn</h2>
            <div>Sign in to your self service portal</div>
            <TextField
              sx={{ borderRadius: "30px" }}
              placeholder="Username"
              variant="outlined"
              name="username"
              className="field"
              onChange={handleFormDetails}
            ></TextField>

            <TextField
              type="password"
              className="field"
              placeholder="Password"
              name="password"
              onChange={handleFormDetails}
            ></TextField>
            <Button
              variant="contained"
              type="submit"
              style={{ borderRadius: "30px", backgroundColor: " #ff7d65" }}
            >
              LOGIN
            </Button>
          </Stack>
        </form>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Login;
