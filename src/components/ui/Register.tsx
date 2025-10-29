import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast, type ToasterProps } from "sonner";
import axios from "axios";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response);
      toast.success("Created account success");
    } catch (error) {
      console.log(error);
      toast.error("Created account failed");
    }
  }

  function handleGoToLogin() {
    props.goToLogin();
    console.log("go to login");
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-[400px] border rounded-2xl p-10">
        <h1 className=" font-bold text-2xl text-center">Create an account</h1>
        <p className="mt-4">Enter your email below to create your account</p>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="name">Name:</label>
            <Input
              value={name}
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
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
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={handleGoToLogin}
            >
              Login here
            </button>
          </p>

          <Button type="submit" className="mt-4" onClick={handleSubmit}>
            Create Account
          </Button>
        </form>
      </div>
      <Toaster richColors position="bottom-center" />
    </div>
  );
}

export default Register;
