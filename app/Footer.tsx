"use client";

import { Box, Container, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#111827",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ textAlign: { xs: "center", sm: "left" } }}>
            © {currentYear} Books - Next.js + MUI. Built with Next.js 14 and Material-UI.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link
              href="https://github.com/yourusername/books-next"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <GitHubIcon fontSize="small" />
              <Typography variant="body2">GitHub</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
