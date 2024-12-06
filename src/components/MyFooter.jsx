import React from "react";
import { Container } from "react-bootstrap";

const MyFooter = () => {
  return (
    <Container fluid className="footer bg-trasparent border-top border-white text-center text-white mt-5">
      <p className="m-0 py-3">&copy; 2024 EpiMeteo All Rights Reserved.</p>
    </Container>
  );
};

export default MyFooter;