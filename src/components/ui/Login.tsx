import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast, type ToasterProps } from "sonner";
import axios from "axios";

//tu component truyen ve nam het trong props
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response);
      toast.success("Login success");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  }

  function handleGoToRegister() {
    props.goToRegister();
    console.log("go to register");
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-[400px] border rounded-2xl p-10">
        <h1 className=" font-bold text-2xl text-center">Login</h1>
        <p className="mt-4">Enter your email below to login to your account</p>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="email">Email:</label>
            <Input
              value={email}
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password:</label>
            <Input
              value={password}
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <p className="mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={handleGoToRegister}
            >
              Register here
            </button>
          </p>

          <Button type="submit" className="mt-4">
            Login
          </Button>
        </form>
      </div>
      <Toaster richColors position="bottom-center" />
    </div>
  );
}

export default Login;
