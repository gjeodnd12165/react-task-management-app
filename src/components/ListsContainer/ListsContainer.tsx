import React from 'react'
import { IList } from '../../types';
import { listsContainer } from './ListsContainer.css';
import ActionButton from '../ActionButton/ActionButton';
import List from '../List/List';

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
}

const ListsContainer = ({
  boardId,
  lists
}: TListsContainerProps) => {
  return (
    <div className={listsContainer}>
      {
        lists.map(list => (
          <List 
            key={list.listId} 
            list={list}
            boardId={boardId}
          />
        ))
      }
      <ActionButton 
        boardId={boardId}
        listId={""}
        list
      />
    </div>
  )
}

export default ListsContainer