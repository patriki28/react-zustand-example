/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { Note } from './utils/note.schema';
import axiosInstance from '@/config/axios-instance';
import { errorMessageFormatter } from '@/utils/error-messsage-formatter';

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface NoteStore {
  notes: Note[];
  note: Note | null;
  isLoading: boolean;
  message: string | null;
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
  message: null,
  error: null,

  fetchNotes: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axiosInstance.get<ApiResponse<Note[]>>('/');
      set({
        notes: response.data.data,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: errorMessageFormatter(error),
        isLoading: false
      });
    }
  },

  fetchNoteById: async (id) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axiosInstance.get<ApiResponse<Note>>(`/${id}`);
      set({
        note: response.data.data,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: errorMessageFormatter(error),
        isLoading: false
      });
    }
  },

  createNote: async (note) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axiosInstance.post<ApiResponse<Note>>('/', note);
      set((state) => ({
        message: response.data.message,
        notes: [...state.notes, response.data.data],
        isLoading: false
      }));
    } catch (error: any) {
      set({
        error: errorMessageFormatter(error),
        isLoading: false
      });
    }
  },

  updateNote: async (id, updatedNote) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axiosInstance.put<ApiResponse<Note>>(
        `/${id}`,
        updatedNote
      );
      set((state) => ({
        message: response.data.message,
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, ...response.data.data } : note
        ),
        isLoading: false
      }));
    } catch (error: any) {
      set({
        error: errorMessageFormatter(error),
        isLoading: false
      });
    }
  },

  deleteNote: async (id) => {
    set({ isLoading: true, error: null, message: null });
    try {
      await axiosInstance.delete<ApiResponse<null>>(`/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({
        error: errorMessageFormatter(error),
        isLoading: false
      });
    }
  },

  deleteAllNotes: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      await axiosInstance.delete<ApiResponse<null>>('/');
      set({
        notes: [],
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: errorMessageFormatter(error),
        isLoading: false
      });
    }
  }
}));
