import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Todo from './Todo';
import styles from './styles/TodoCompletedList.module.scss';
import { ITask } from '../../models';
import { todoVariants } from './styles/variants';
import { useUpdateTodoMutation } from '../../store/tasks/tasksApi';

interface TodoCompletedListProps {
  todos: ITask[];
  isLoading: boolean;
  deadline: string;
}

const TodoCompletedList = ({ todos, isLoading, deadline }: TodoCompletedListProps) => {
  const { t } = useTranslation();
  const [updateTodo] = useUpdateTodoMutation();
  const [completedTodos, setCompletedTodos] = useState<ITask[]>(todos);
  const [prevStatus, setPrevStatus] = useState<ITask[]>(todos);
  const [newStatus, setNewStatus] = useState<ITask[]>(todos);

  useEffect(() => {
    setCompletedTodos(todos);
  }, [todos]);

  const dragStartHandler = () => {
    setPrevStatus(completedTodos);
  };

  const dragEndHandler = () => {
    if (completedTodos && prevStatus) {
      setCompletedTodos([
        ...completedTodos.map((todo, index) => {
          if (prevStatus[index].order !== todo.order) {
            return { ...todo, order: prevStatus[index].order };
          }
          return { ...todo };
        }),
      ]);
      setNewStatus(completedTodos);
    }
  };

  useEffect(() => {
    completedTodos.forEach((todo) => updateTodo({ ...todo }));
  }, [newStatus]);

  return (
    <Reorder.Group
      axis="y"
      className={completedTodos.length > 0 ? styles.todoCompletedList : styles.hidden}
      onReorder={setCompletedTodos}
      values={completedTodos}
    >
      {!!todos.length && <h2>{t('CompletedTaskList')}</h2>}
      {isLoading && <div className={styles.loader} />}
      {completedTodos.map((todo: ITask, i) => (
        <Reorder.Item
          key={todo._id}
          className={styles.todoWrapper}
          value={todo}
          whileDrag={{
            scale: 1.05,
            boxShadow: '0px 10px 10px -7px #000000',
          }}
          variants={todoVariants}
          initial="hidden"
          animate="visible"
          custom={i}
          onDragStart={() => dragStartHandler()}
          onDragEnd={() => dragEndHandler()}
        >
          <Todo todo={todo} deadline={deadline} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default TodoCompletedList;
