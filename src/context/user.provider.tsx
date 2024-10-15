import { IUser } from "@/types/user.type";
import { createContext, Dispatch, SetStateAction } from "react";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);
interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
