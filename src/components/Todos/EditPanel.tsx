import { useState, useRef, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import { ITask } from '../../models';
import {
  useCreateTaskMutation,
  useDeleteTodoMutation,
  useUpdateTodoRefreshMutation,
} from '../../store/tasks/tasksApi';
import NumberInput from '../ui/NumberInput';
import formatDeadlineDate from './helpers/formatDeadlineDate';
import getDeadlineDate from './helpers/getDeadlineDate';
import DatePicker from '../ui/DatePicker';
import { minTimeInMinutes, maxTimeInMinutes } from '../../constants/timerSettings';
import styles from './styles/EditPanel.module.scss';

interface EditPanelProps {
  task?: ITask;
  onClose: () => void;
  isAdd: boolean;
  deadline: string;
  openButton: HTMLButtonElement | null;
}

const EditPanel: FC<EditPanelProps> = ({ task, onClose, isAdd, deadline, openButton }) => {
  const [deleteTodo, { isLoading: isLoadingDelete, isSuccess: isSuccessDelete }] =
    useDeleteTodoMutation();
  const [updateTodo, { isLoading: isLoadingUpdate }] = useUpdateTodoRefreshMutation();
  const [createTask, { isLoading: isLoadingCreate }] = useCreateTaskMutation();
  const defaultPomodoroTime = useAppSelector((state) => state.timerSettings.workPeriodInMinutes);

  const [taskTitle, setTaskTitle] = useState(task ? task.title : '');
  const [taskNote, setTaskNote] = useState(task ? task.note : '');

  const containerRef = useRef<HTMLDivElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const isControlBtnRef = useRef(false);

  const [pomodorosNumber, setPomodorosNumber] = useState(task ? task.pomodorosNumber : 0);
  const [pomodoroTime, setPomodoroTime] = useState(task ? task.pomodoroTime : defaultPomodoroTime);
  const [deadlineDate, setDeadlineDate] = useState(
    task ? new Date(task.deadlineAt) : getDeadlineDate(deadline)
  );

  const { removeTaskFromTimer } = useActions();
  const { t } = useTranslation();

  useEffect(() => {
    const clickOutsideHandler = (evt: MouseEvent) => {
      if (
        !containerRef.current?.contains(evt.target as Node) &&
        !openButton?.contains(evt.target as Node) &&
        !isControlBtnRef.current
      ) {
        onClose();
      }
    };

    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, []);

  useEffect(() => {
    if (!noteRef.current) return;
    const minHeight = 77;
    noteRef.current.style.height = `${Math.max(minHeight, noteRef.current.scrollHeight)}px`;
  }, [taskNote]);

  const handlerCreateTask = async () => {
    if (taskTitle) {
      deadlineDate.setHours(23, 59, 59, 999);
      const deadlineAt = deadlineDate.getTime();
      isControlBtnRef.current = true;

      const newTaskData = {
        title: taskTitle,
        note: taskNote,
        pomodorosNumber,
        pomodoroTime,
        deadlineDate,
        deadlineAt,
      };

      await createTask(newTaskData).unwrap();
      setTaskTitle('');
      onClose();
    } else {
      titleInput.current?.focus();
    }
  };

  const handlerUpdateTask = async () => {
    if (taskTitle) {
      deadlineDate.setHours(23, 59, 59, 999);
      const deadlineAt = deadlineDate.getTime();
      isControlBtnRef.current = true;

      await updateTodo({
        ...task,
        title: taskTitle,
        note: taskNote,
        pomodorosNumber,
        pomodoroTime,
        deadlineDate,
        deadlineAt,
      }).unwrap();
      onClose();
    } else {
      titleInput.current?.focus();
    }
  };

  const handleDeleteTask = async () => {
    if (!task) return;
    isControlBtnRef.current = true;
    await deleteTodo(task).unwrap();
    onClose();
    removeTaskFromTimer(task._id);
  };

  const handleChangeDate = (value: Date) => {
    setDeadlineDate(value);
  };

  const { formattedDate, isExpired } = formatDeadlineDate(deadlineDate, true);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.item}>
          <input
            className={styles.inputText}
            type="text"
            placeholder={t('WhatWorking')}
            value={taskTitle}
            onChange={(evt) => setTaskTitle(evt.target.value)}
            ref={titleInput}
          />
        </div>
        <div className={styles.flexRow}>
          <div className={styles.item}>
            <p className={styles.subtitle}>{t('PomodorosCount')}</p>
            <div className={styles.numbers}>
              {task && (
                <>
                  <div className={styles.numberWrapper}>
                    <span className={styles.numberLabel}>{t('Complete')}</span>
                    <span className={styles.readOnlyNumber}>{task.completedPomodors}</span>
                  </div>
                  <span className={styles.numberSeparator}>/</span>
                </>
              )}
              <div className={styles.numberWrapper}>
                <span className={styles.numberLabel}>{t('Total')}</span>
                <NumberInput
                  value={pomodorosNumber}
                  min={0}
                  onChange={(value) => setPomodorosNumber(value)}
                />
              </div>
              <div className={styles.pomodoroControls}>
                <button
                  className={styles.numberBtn}
                  type="button"
                  onClick={() => setPomodorosNumber((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
                  aria-label={t('LessPomodoros')}
                >
                  <AiFillCaretDown />
                </button>
                <button
                  className={styles.numberBtn}
                  type="button"
                  onClick={() => setPomodorosNumber((prev) => prev + 1)}
                  aria-label={t('MorePomodoros')}
                >
                  <AiFillCaretUp />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.subtitle}>{t('PomodoroTime')}</p>
            <div className={styles.numbers}>
              <div className={styles.numberWrapper}>
                <span className={styles.numberLabel}>{t('Minutes')}</span>
                <NumberInput
                  value={pomodoroTime}
                  min={minTimeInMinutes}
                  max={maxTimeInMinutes}
                  onChange={(value) => setPomodoroTime(value)}
                />
              </div>
              <div className={styles.pomodoroControls}>
                <button
                  className={styles.numberBtn}
                  type="button"
                  onClick={() =>
                    setPomodoroTime((prev) =>
                      prev - 1 < minTimeInMinutes ? minTimeInMinutes : prev - 1
                    )
                  }
                  aria-label={t('DecreasePomodoroTime')}
                >
                  <AiFillCaretDown />
                </button>
                <button
                  className={styles.numberBtn}
                  type="button"
                  onClick={() =>
                    setPomodoroTime((prev) =>
                      prev + 1 > maxTimeInMinutes ? maxTimeInMinutes : prev + 1
                    )
                  }
                  aria-label={t('IncreasePomodoroTime')}
                >
                  <AiFillCaretUp />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <textarea
            ref={noteRef}
            rows={3}
            className={`${styles.inputText} ${styles.note}`}
            placeholder={t('SomeNotes')}
            value={taskNote}
            onChange={(evt) => setTaskNote(evt.target.value)}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.deadline}>
            <span className={styles.subtitle}>{t('Deadline')} </span>
            <span className={isExpired ? styles.expiredDate : styles.formattedDate}>
              {formattedDate}
            </span>
            <DatePicker date={deadlineDate} onChange={handleChangeDate} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {task && (
          <button type="button" className={styles.deleteButton} onClick={handleDeleteTask}>
            {!isLoadingDelete && !isSuccessDelete ? (
              <span>{t('Delete')}</span>
            ) : (
              <div className={styles.loader} />
            )}
          </button>
        )}

        <button type="button" className={styles.cancelButton} onClick={onClose}>
          {t('Cancel')}
        </button>
        {!isAdd ? (
          <button type="button" className={styles.saveButton} onClick={handlerUpdateTask}>
            {!isLoadingUpdate ? <span>{t('Save')}</span> : <div className={styles.loader} />}
          </button>
        ) : (
          <button
            type="button"
            className={styles.saveButton}
            onClick={async () => handlerCreateTask()}
          >
            {!isLoadingCreate ? <span>{t('Create')}</span> : <div className={styles.loader} />}
          </button>
        )}
      </div>
    </div>
  );
};

EditPanel.defaultProps = {
  task: undefined,
};

export default EditPanel;
