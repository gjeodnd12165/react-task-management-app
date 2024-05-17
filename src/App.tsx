import { useState } from 'react';
import './App.css'
import { appContainer, board, buttons } from './App.css.ts'
import BoardList from './components/BoardList/BoardList.tsx'
import ListsContainer from './components/ListsContainer/ListsContainer.tsx';
import { useTypedSelector } from './hooks/redux.ts';

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const boards = useTypedSelector(state => state.board.boardArray);
  
  const activeBoard = boards.filter((board => board.boardId === activeBoardId))[0];

  return (
    <>
      <div className={appContainer}>
      <BoardList 
        activeBoardId={activeBoardId} 
        setActiveBoardId={setActiveBoardId}
      />
        <div className={board}>
          <ListsContainer
            lists={activeBoard?.lists}
            boardId={activeBoard?.boardId}
          />
        </div>

        <div>
          <button className={buttons}>
            이 게시판 삭제하기
          </button>
          <button className={buttons}>
            활동 목록 보이기
          </button>
        </div>
      </div>
    </>
  )
}

export default App
