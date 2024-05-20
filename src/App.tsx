import { useState } from 'react';
import './App.css'
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css.ts'
import BoardList from './components/BoardList/BoardList.tsx'
import ListsContainer from './components/ListsContainer/ListsContainer.tsx';
import { useTypedDispatch, useTypedSelector } from './hooks/redux.ts';
import EditModal from './components/EditModal/EditModal.tsx';
import LoggerModal from './components/LoggerModal/LoggerModal.tsx';
import { deleteBoard, sort } from './store/slices/boardsSlice.ts';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from './store/slices/loggerSlice.ts';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


function App() {
  const dispatch = useTypedDispatch();
  
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const boards = useTypedSelector(state => state.board.boardArray);
  const modalActive = useTypedSelector(state => state.board.modalActive);
  
  const activeBoard = boards.filter((board => board.boardId === activeBoardId))[0];

  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({
        boardId: activeBoard.boardId
      }));

      dispatch(addLog({
        logId: uuidv4(),
        logMessage: `게시판 지우기: ${activeBoard.boardId}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now())
      }));

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(board => (
          board.boardId === activeBoardId
        ));
    
        return indexToBeDeleted === 0 ?
        indexToBeDeleted + 1 :
        indexToBeDeleted - 1;
      }

      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert('게시판은 최소 1개 이상 존재해야합니다')
    }
  }

  const handleDragEnd = (result: DropResult) => {
    const {destination, source, draggableId} = result;

    const sourceList = activeBoard.lists.filter(list =>
      list.listId === source.droppableId
    )[0];
    dispatch(sort({
      boardIndex: boards.findIndex(board => board.boardId === activeBoardId),
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination?.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination?.index,
      draggableId: draggableId
    }))
    dispatch(addLog({
      logId: uuidv4(),
      logMessage: `
      리스트 "${sourceList.listName}"에서 
      리스트 "${activeBoard.lists.filter(list => list.listId === destination?.droppableId)[0].listName}"으로
      "${sourceList.tasks.filter(task => task.taskId === draggableId)[0].taskName}"을 옮김
      `,
      logAuthor: 'User',
      logTimestamp: String(Date.now())
    }));
  }

  return (
    <div className={appContainer}>

      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen}/> : null}
      {modalActive ? <EditModal /> : null}
      
      <BoardList 
        activeBoardId={activeBoardId} 
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <DragDropContext
          onDragEnd={handleDragEnd}
        >
          <ListsContainer
            lists={activeBoard.lists}
            boardId={activeBoard.boardId}
          />
        </DragDropContext>
      </div>

      <div className={buttons}>
        <button 
          onClick={handleDeleteBoard}
          className={deleteBoardButton}
        >
          이 게시판 삭제하기
        </button>
        <button 
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  )
}

export default App
