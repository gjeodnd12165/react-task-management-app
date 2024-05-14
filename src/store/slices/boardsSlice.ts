import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[]
}

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: "list-0",
          listName: "List 0",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 0",
              taskDescription: "Description",
              taskOwner: "nobody",
            },
            {
              taskId: "task-1",
              taskName: "task 1",
              taskDescription: "Description",
              taskOwner: "nobody",
            }
          ]
        },
        {
          listId: "list-1",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-3",
              taskName: "Task 3",
              taskDescription: "Description",
              taskOwner: "nobody"
            }
          ]
        }
      ]
    }
  ]
}

const boardSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {

  }
});

export const boardReducer = boardSlice.reducer;