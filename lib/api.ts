import axios from "axios";

const API_BASE = "https://localhost:8443/api/v1";

export type Book = {
  id?: number;
  title: string;
  author: string;
  price: number;
};

type PagedResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

const api = axios.create({
  baseURL: API_BASE,
});

export const booksApi = {
  async getAll(page = 0, size = 50): Promise<Book[]> {
    const response = await api.get<PagedResponse<Book>>("/books", {
      params: { page, size },
    });
    return response.data.content ?? [];
  },

  async getById(id: number): Promise<Book> {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  async create(book: Omit<Book, "id">): Promise<Book> {
    const response = await api.post<Book>("/books", book);
    return response.data;
  },

  async update(id: number, book: Omit<Book, "id">): Promise<Book> {
    const response = await api.put<Book>(`/books/${id}`, book);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};
