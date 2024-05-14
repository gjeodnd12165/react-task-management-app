import { boardReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";


const reducer = {
  logger: loggerReducer,
  modal: modalReducer,
  board: boardReducer
}

export default reducer;