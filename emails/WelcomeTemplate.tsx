import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Container>
        <Text>Hello {name}</Text>
        <Link href="https://www.codewithmosh.com">www.codewithmosh.com</Link>
      </Container>
    </Html>
  );
};

export default WelcomeTemplate;
