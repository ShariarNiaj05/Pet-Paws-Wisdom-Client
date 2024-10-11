"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input, Card, Text } from "@nextui-org/react";
import nexiosInstance from "@/config/nexios.config";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await nexiosInstance.post("/login", {
        email,
        password,
      });
      console.log(response);
      //   const { token } = response.data;

      // Save token in localStorage
      //   localStorage.setItem("token", token);

      // Redirect to dashboard after successful login
      //   router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <Card css={{ p: "$10", mw: "400px", margin: "auto", mt: "50px" }}>
      <Text h3>Login</Text>
      {error && <Text color="error">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Input
          fullWidth
          clearable
          underlined
          labelPlaceholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Input.Password
          fullWidth
          clearable
          underlined
          labelPlaceholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" shadow color="primary" css={{ mt: "$10" }}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
