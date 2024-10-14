/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input, Card } from "@nextui-org/react";
import nexiosInstance from "@/config/nexios.config";
import { redirect } from "next/navigation";
import { decode } from "@/helpers/jwtHelpers";
import { JwtPayload } from "jsonwebtoken";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const router = useRouter();
  console.log(nexiosInstance);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await nexiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("response", response);
      const { token } = response.data;
      // console.log("decoded token", decode(JSON.stringify(token)));
      // Save token in localStorage
      localStorage.setItem(
        "userInfo",
        decode(JSON.parse(token)) as unknown as string
      );

      // Redirect to dashboard after successful login
      redirect("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <Card>
      <h3>Login</h3>
      {/* {error && <Text color="error">{error}</Text>} */}
      <form onSubmit={handleSubmit}>
        <Input
          fullWidth
          // clearable
          // underlined
          // labelPlaceholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Input
          fullWidth
          // clearable
          // underlined
          // labelPlaceholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" color="primary">
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
