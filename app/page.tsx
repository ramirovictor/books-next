"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { booksApi, type Book } from "@/lib/api";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);
  const [form, setForm] = useState<Book>({ title: "", author: "", price: 0 });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const load = async () => {
    setLoading(true);
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (e) {
      console.error(e);
      setSnackbar({
        open: true,
        message: "Failed to load books. Make sure the backend is running at https://localhost:8443",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // You need to have already opened https://localhost:8443/swagger and accepted the certificate
    load();
  }, []);

  const handleOpenNew = () => {
    setEditing(null);
    setForm({ title: "", author: "", price: 0 });
    setOpen(true);
  };

  const handleEdit = (book: Book) => {
    setEditing(book);
    setForm(book);
    setOpen(true);
  };

  const handleDelete = async (book: Book) => {
    if (!book.id) return;
    if (!confirm(`Remove "${book.title}"?`)) return;
    try {
      await booksApi.delete(book.id);
      setSnackbar({ open: true, message: `"${book.title}" deleted successfully!`, severity: "success" });
      await load();
    } catch (e) {
      console.error(e);
      setSnackbar({ open: true, message: "Failed to delete book", severity: "error" });
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.author) {
      setSnackbar({ open: true, message: "Please fill in all fields", severity: "error" });
      return;
    }
    try {
      if (editing?.id) {
        await booksApi.update(editing.id, form);
        setSnackbar({ open: true, message: `"${form.title}" updated successfully!`, severity: "success" });
      } else {
        await booksApi.create(form);
        setSnackbar({ open: true, message: `"${form.title}" created successfully!`, severity: "success" });
      }
      setOpen(false);
      await load();
    } catch (e) {
      console.error(e);
      setSnackbar({ open: true, message: "Failed to save book", severity: "error" });
    }
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: "#f3f4f6", pb: 4, minHeight: "100%" }}>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h5">Book List</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenNew}>
            New Book
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, minWidth: "200px", bgcolor: "white" }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
            }}
          />
          <Button variant="contained" onClick={load} disabled={loading} color="primary">
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Box>

        <Paper sx={{ width: "100%", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell>{b.title}</TableCell>
                  <TableCell>{b.author}</TableCell>
                  <TableCell>$ {b.price?.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEdit(b)}
                      sx={{ color: "#1976d2" }}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(b)}
                      sx={{ color: "#d32f2f" }}
                      title="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {filteredBooks.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    {searchTerm ? "No books found matching your search." : "No books found. Click 'New Book' to add one."}
                  </TableCell>
                </TableRow>
              )}

              {loading && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Book" : "New Book"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
            fullWidth
            inputProps={{ step: "0.01", min: "0" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
