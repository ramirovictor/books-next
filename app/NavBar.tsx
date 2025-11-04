"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ bgcolor: "#111827" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Books – Next.js + MUI
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            href="/"
            color="inherit"
            sx={{
              borderBottom: pathname === "/" ? "2px solid white" : "2px solid transparent",
              borderRadius: 0,
              fontWeight: pathname === "/" ? "bold" : "normal",
            }}
          >
            Books
          </Button>
          <Button
            component={Link}
            href="/about"
            color="inherit"
            sx={{
              borderBottom: pathname === "/about" ? "2px solid white" : "2px solid transparent",
              borderRadius: 0,
              fontWeight: pathname === "/about" ? "bold" : "normal",
            }}
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
