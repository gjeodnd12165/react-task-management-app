import { boardReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";
import { userReducer } from "../slices/userSlice";


const reducer = {
  logger: loggerReducer,
  modal: modalReducer,
  board: boardReducer,
  user: userReducer
}

export default reducer;