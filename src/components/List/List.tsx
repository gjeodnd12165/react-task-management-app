import React from 'react'
import { IList, ITask } from '../../types';
import { GrSubtract } from 'react-icons/gr';
import Task from '../Task/Task';
import ActionButton from '../ActionButton/ActionButton';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActivity } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 as uuidv4 } from 'uuid';
import { setModalData } from '../../store/slices/modalSlice';
import { deleteButton, header, listWrapper, name } from './List.css';
import { Droppable } from 'react-beautiful-dnd';

type TListProps = {
  list: IList;
  boardId: string;
}

const List = ({
  list,
  boardId
}: TListProps) => {
  const dispatch = useTypedDispatch();

  const handleDeleteList = (listId: string) => () => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(addLog({
      logId: uuidv4(),
      logMessage: `리스트 삭제하기: ${list.listName}`,
      logAuthor: 'User',
      logTimestamp: String(Date.now())
    }))
  }

  const handleChangeTask = (
    boardId: string, 
    listId: string, 
    taskId: string, 
    task: ITask
  ) => () => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActivity(true));
  }

  return (
    <Droppable
      droppableId={list.listId}
    >
      {provided => (
        <div 
          className={listWrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract 
              className={deleteButton}
              onClick={handleDeleteList(list.listId)}
            />
          </div>
          {
            list.tasks.map((task, index) => (
              <div
                key={task.taskId}
                onClick={handleChangeTask(boardId, list.listId, task.taskId, task)}
              >
                <Task 
                  taskName={task.taskName}
                  taskDescription={task.taskDescription}
                  boardId={boardId}
                  id={task.taskId}
                  index={index}
                />
              </div>
            ))
          }
          {provided.placeholder}
          <ActionButton 
            boardId={boardId}
            listId={list.listId}
          />
        </div>
      )}
    </Droppable>
  )
}

export default List