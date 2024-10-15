import { IUser } from "@/types/user.type";
import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);
interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {};
