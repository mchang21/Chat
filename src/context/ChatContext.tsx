import { User } from "firebase/auth";
import { createContext, ReactNode, useContext, useReducer, Reducer } from "react";
import { AuthContext } from "./AuthContext";

export interface ChatState {
    chatId: string;
    user: User;
}

export interface ChatAction {
    type: string;
    payload?: User;
}

interface ChatContextProviderProps {
    children: ReactNode;
}

export const ChatContext = createContext<{ data: ChatState; dispatch: React.Dispatch<ChatAction> } | undefined>(undefined);

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({ children }) => {
    const {currentUser} = useContext(AuthContext);

    const INITIAL_STATE: ChatState = {
        chatId: "null",
        user: currentUser as User
    }
    
    const chatReducer: Reducer<ChatState, ChatAction> = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                const currentUserUid = currentUser?.uid || "";
                const payloadUid = action.payload?.uid || "";
                return{
                    ...state,
                    user: action.payload || state.user,
                    chatId: currentUserUid > payloadUid
                        ? currentUserUid + payloadUid
                        : payloadUid + currentUserUid,
                }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
