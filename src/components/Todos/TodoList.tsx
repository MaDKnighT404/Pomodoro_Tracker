import { Reorder } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Todo from './Todo';
import styles from './styles/TodoList.module.scss';
import { ITask } from '../../models';
import { todoVariants } from './styles/variants';
import { useUpdateTodoMutation } from '../../store/tasks/tasksApi';

interface TodoListProps {
  todos: ITask[];
  isLoading: boolean;
  deadline: string;
}

const TodoList = ({ todos, isLoading, deadline }: TodoListProps) => {
  const { t } = useTranslation();
  const [updateTodo] = useUpdateTodoMutation();
  const [inCompletedTodos, setInCompletedTodos] = useState<ITask[]>(todos);
  const [prevStatus, setPrevStatus] = useState<ITask[]>(todos);
  const [newStatus, setNewStatus] = useState<ITask[]>(todos);

  useEffect(() => {
    setInCompletedTodos(todos);
  }, [todos]);

  const dragStartHandler = () => {
    setPrevStatus(inCompletedTodos);
  };

  const dragEndHandler = () => {
    if (inCompletedTodos && prevStatus) {
      setInCompletedTodos([
        ...inCompletedTodos.map((todo, index) => {
          if (prevStatus[index].order !== todo.order) {
            return { ...todo, order: prevStatus[index].order };
          }
          return { ...todo };
        }),
      ]);
      setNewStatus(inCompletedTodos);
    }
  };

  useEffect(() => {
    inCompletedTodos.forEach((todo) => updateTodo({ ...todo }));
  }, [newStatus]);

  return (
    <Reorder.Group
      axis="y"
      className={inCompletedTodos ? styles.todoList : styles.hidden}
      onReorder={setInCompletedTodos}
      values={inCompletedTodos}
    >
      {!!todos && <h2>{t('TaskList')}</h2>}
      {isLoading && <div className={styles.loader} />}
      {inCompletedTodos?.map((todo: ITask, i: number) => (
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

export default TodoList;
