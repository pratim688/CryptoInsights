import { User } from "@/utils/types";

export const setUser = (user: User) => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});
