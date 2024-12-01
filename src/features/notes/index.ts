/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { Note } from './utils/note.schema';
import axiosInstance from '@/config/axios-instance';

/**
 * Generic type for API responses.
 * @template T Data type of the response.
 */
interface ApiResponse<T> {
  message: string;
  data: T;
}

interface NoteStore {
  notes: Note[];
  note: Note | null;
  isLoading: boolean;
  error: string | null;

  fetchNotes: () => Promise<void>;
  fetchNoteById: (id: string) => Promise<void>;
  createNote: (
    note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateNote: (id: string, updatedNote: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  deleteAllNotes: () => Promise<void>;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  note: null,
  isLoading: false,
  error: null,

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get<ApiResponse<Note[]>>('/');
      set({ notes: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false
      });
    }
  },

  fetchNoteById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get<ApiResponse<Note>>(`/${id}`);
      set({ note: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false
      });
      console.error(
        `Error fetching note by ID: ${error.response?.data?.message || error.message}`
      );
    }
  },

  createNote: async (note) => {
    try {
      const response = await axiosInstance.post<ApiResponse<Note>>('/', note);
      set((state) => ({ notes: [...state.notes, response.data.data] }));
    } catch (error: any) {
      console.error(
        `Error creating note: ${error.response?.data?.message || error.message}`
      );
    }
  },

  updateNote: async (id, updatedNote) => {
    try {
      const response = await axiosInstance.put<ApiResponse<Note>>(
        `/${id}`,
        updatedNote
      );
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, ...response.data.data } : note
        )
      }));
    } catch (error: any) {
      console.error(
        `Error updating note: ${error.response?.data?.message || error.message}`
      );
    }
  },

  deleteNote: async (id) => {
    try {
      await axiosInstance.delete<ApiResponse<null>>(`/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id)
      }));
    } catch (error: any) {
      console.error(
        `Error deleting note: ${error.response?.data?.message || error.message}`
      );
    }
  },

  deleteAllNotes: async () => {
    try {
      await axiosInstance.delete<ApiResponse<null>>('/');
      set({ notes: [] });
    } catch (error: any) {
      console.error(
        `Error deleting all notes: ${error.response?.data?.message || error.message}`
      );
    }
  }
}));
