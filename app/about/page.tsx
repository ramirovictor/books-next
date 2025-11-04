"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: "#f3f4f6", py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          About This Project
        </Typography>

        <Typography variant="body1" paragraph>
          This is a portfolio-ready book management application built with Next.js 14 and Material-UI,
          consuming a Spring Boot REST API. It demonstrates modern full-stack development with TypeScript,
          responsive design, and clean architecture.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Tech Stack
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, mb: 3 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CodeIcon sx={{ mr: 1, color: "#000000" }} />
                <Typography variant="h6">Frontend</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Next.js 14</strong> with App Router for modern React development
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Material-UI (MUI)</strong> for beautiful, accessible components
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>TypeScript</strong> for type safety and better DX
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Axios</strong> for HTTP client
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<GitHubIcon />}
                href="https://github.com/yourusername/books-next"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Frontend Repo
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <StorageIcon sx={{ mr: 1, color: "#6db33f" }} />
                <Typography variant="h6">Backend</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Spring Boot 3</strong> – RESTful API with CRUD operations
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>H2 Database</strong> – In-memory database for quick setup
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Swagger</strong> – API documentation at /swagger-ui
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>HTTPS</strong> – Self-signed certificate for secure connections
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<GitHubIcon />}
                href="https://github.com/yourusername/books-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Backend Repo
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2, mb: 0 }}>
              <li>Full CRUD operations (Create, Read, Update, Delete)</li>
              <li>Real-time search by title with client-side filtering</li>
              <li>Snackbar notifications for user feedback</li>
              <li>Responsive design for mobile, tablet, and desktop</li>
              <li>Clean code architecture with separated API layer</li>
              <li>Custom 404 page and navigation with active route highlighting</li>
            </Typography>
          </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ p: 3, bgcolor: "white", borderRadius: 1, border: "1px solid #e0e0e0" }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            <strong>Note:</strong> This same backend API also powers an alternative frontend implementation
            built with React 18 + Vite + Tailwind CSS, demonstrating different approaches to modern web development.
          </Typography>
          <Button
            size="small"
            variant="text"
            startIcon={<GitHubIcon />}
            href="https://github.com/yourusername/books-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            View React + Vite version
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
