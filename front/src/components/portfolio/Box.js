import React from "react";
import { PortfolioBox, Title } from "../../styles/portfolio/Box";
import Button from "@mui/material/Button";

export default function Box({ title }) {
  return (
    <PortfolioBox>
      <Title>{title}</Title>
      <Button variant="contained" color="success">
        +
      </Button>
    </PortfolioBox>
  );
}
