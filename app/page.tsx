"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Book = {
  id?: number;
  title: string;
  author: string;
  price: number;
};

const API_BASE = "https://localhost:8443/api/v1";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);
  const [form, setForm] = useState<Book>({ title: "", author: "", price: 0 });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/books`, {
        params: { page: 0, size: 50 },
      });
      setBooks(res.data.content ?? []);
    } catch (e) {
      console.error(e);
      alert("Não consegui carregar os livros. Verifique se o backend está rodando em https://localhost:8443");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // precisa já ter aberto https://localhost:8443/swagger e aceitado o certificado
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
    if (!confirm(`Remover "${book.title}"?`)) return;
    await axios.delete(`${API_BASE}/books/${book.id}`);
    await load();
  };

  const handleSave = async () => {
    if (!form.title || !form.author) return;
    if (editing?.id) {
      await axios.put(`${API_BASE}/books/${editing.id}`, form);
    } else {
      await axios.post(`${API_BASE}/books`, form);
    }
    setOpen(false);
    await load();
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f4f6" }}>
      <AppBar position="static" sx={{ bgcolor: "#111827" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Books – Next.js + MUI
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={handleOpenNew}>
            Novo
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5">Lista de livros</Typography>
          <Button variant="outlined" onClick={load} disabled={loading}>
            {loading ? "Carregando..." : "Atualizar"}
          </Button>
        </Box>

        <Paper sx={{ width: "100%", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.title}</TableCell>
                  <TableCell>{b.author}</TableCell>
                  <TableCell>R$ {b.price?.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(b)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(b)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {books.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={4}>Nenhum livro encontrado.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Editar livro" : "Novo livro"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <TextField
            label="Autor"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <TextField
            label="Preço"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
