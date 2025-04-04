import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    immer((set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      isAdmin: false,

      login: async (userData) => {
        if (userData.username === 'Boss' && userData.phone === '+7 (777) 777-77-77' && userData.password === 'Parol123!') {
          set((state) => {
            state.user = userData;
            state.isAuthenticated = true;
            state.isAdmin = true;
          });
          return true;
        }

        try {
          const { data: existingUser } = await supabase
            .from('registration')
            .select()
            .eq('email', userData.email)
            .eq('phone', userData.phone)
            .single();

          if (!existingUser) {
            return false;
          }

          set((state) => {
            state.user = { ...existingUser, password: undefined };
            state.isAuthenticated = true;
            state.isAdmin = false;
          });
          return true;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      logout: () => set((state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      }),

      registerUser: async (userData) => {
        try {
          const { data, error } = await supabase
            .from('registration')
            .insert([{
              username: userData.username,
              email: userData.email,
              phone: userData.phone,
              district: userData.district
            }])
            .select()
            .single();

          if (error) throw error;

          set((state) => {
            state.users.push(data);
          });

          return data;
        } catch (error) {
          console.error('Registration error:', error);
          throw new Error('Пользователь с такой почтой или телефоном уже существует');
        }
      },

      updateUserProfile: async (updatedData) => {
        try {
          const { data, error } = await supabase
            .from('registration')
            .update(updatedData)
            .eq('id', get().user.id)
            .select()
            .single();

          if (error) throw error;

          set((state) => {
            state.user = { ...state.user, ...data };
            const userIndex = state.users.findIndex(u => u.id === data.id);
            if (userIndex !== -1) {
              state.users[userIndex] = data;
            }
          });
        } catch (error) {
          console.error('Update profile error:', error);
          throw error;
        }
      },

      deleteUser: async (userId) => {
        try {
          const { error } = await supabase
            .from('registration')
            .delete()
            .eq('id', userId);

          if (error) throw error;

          set((state) => {
            state.users = state.users.filter(u => u.id !== userId);
            if (state.user?.id === userId) {
              state.user = null;
              state.isAuthenticated = false;
            }
          });
        } catch (error) {
          console.error('Delete user error:', error);
          throw error;
        }
      },

      fetchUsers: async () => {
        try {
          const { data, error } = await supabase
            .from('registration')
            .select('*');

          if (error) throw error;

          set((state) => {
            state.users = data;
          });
        } catch (error) {
          console.error('Fetch users error:', error);
          throw error;
        }
      },

      submitQuestion: async (question, phone) => {
        try {
          const { error } = await supabase
            .from('questions')
            .insert([{ question, phone }]);

          if (error) throw error;
        } catch (error) {
          console.error('Submit question error:', error);
          throw error;
        }
      },

      submitOrder: async (orderData) => {
        try {
          const { error } = await supabase
            .from('orders')
            .insert([{
              user_id: get().user.id,
              ...orderData
            }]);

          if (error) throw error;
        } catch (error) {
          console.error('Submit order error:', error);
          throw error;
        }
      }
    })),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;