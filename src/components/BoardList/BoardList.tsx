import React, { useState } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>
}

const BoardList = ({
  activeBoardId,
  setActiveBoardId
}: TBoardListProps) => {
  const dispatch = useTypedDispatch();
  
  const { boardArray } = useTypedSelector(state => state.board);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const { isAuth } = useAuth();


  const handleClick = () => {
    setIsFormOpen(prev => !prev);
  };

  const handleSignIn = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    dispatch(setUser({
      email: userCredential.user.email ?? "no email",
      id: userCredential.user.uid
    }));
  }

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(removeUser());
  }

  return (
    <div className={container}>
      <div className={title}>
        게시판:
      </div>
      {boardArray.map((board, index) => (
        <div key={board.boardId}
          onClick={() => setActiveBoardId(board.boardId)}
          className={
            clsx(
              {
                [boardItemActive] :
                boardArray.findIndex(b => b.boardId === activeBoardId) === index
              },
              {
                [boardItem] :
                boardArray.findIndex(b => b.boardId === activeBoardId) !== index
              }
            )
          }
        >
          <div>
            {board.boardName}
          </div>
        </div>
      ))}
      <div className={addSection}>
        {
          isFormOpen ?
          <SideForm 
            setIsFormOpen={setIsFormOpen}
          /> :
          <FiPlusCircle 
            className={addButton} 
            onClick={handleClick}
          />
        }
        {
        isAuth ?
          <GoSignOut className={addButton} onClick={handleSignOut}/> :
          <GoSignIn className={addButton} onClick={handleSignIn}/>
        }
        </div>
    </div>
  )
}

export default BoardList