import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input, Card, Text } from "@nextui-org/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
