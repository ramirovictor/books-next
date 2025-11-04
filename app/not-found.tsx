"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        bgcolor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 3,
          }}
        >
          <MenuBookIcon sx={{ fontSize: 120, color: "text.secondary" }} />
          <Typography variant="h3" component="h1" fontWeight="bold">
            404
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Back to Books
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
