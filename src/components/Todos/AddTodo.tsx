import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { HiPlusCircle } from 'react-icons/hi';
import EditPanel from './EditPanel';
import styles from './styles/AddTodo.module.scss';

const AddTodo = ({ deadline }: { deadline: string }) => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const [containerHeight, setContainerHeight] = useState<number | string>();
  const [overflow, setOverflow] = useState('hidden');
  const containerRef = useRef<HTMLDivElement>(null);

  const calcHeight = (el: HTMLElement) => {
    let containerBorders = 0;
    if (containerRef.current)
      containerBorders = containerRef.current.offsetHeight - containerRef.current.clientHeight;

    const height = el.offsetHeight + containerBorders;
    setContainerHeight(height);
    setOverflow('hidden');
  };

  const closeEditPanel = () => {
    setContainerHeight(containerRef.current?.offsetHeight);
    setIsCreateMode(false);
  };

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight);
  }, []);

  return (
    <div
      className={`container ${styles.container}`}
      ref={containerRef}
      style={{ height: containerHeight, overflow }}
    >
      <CSSTransition
        in={isCreateMode}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
        onEntered={() => {
          setOverflow('unset');
          setContainerHeight('auto');
        }}
      >
        <EditPanel
          onClose={closeEditPanel}
          isAdd={isAddTask}
          deadline={deadline}
          openButton={buttonRef.current}
        />
      </CSSTransition>

      <CSSTransition
        in={!isCreateMode}
        unmountOnExit
        timeout={{ appear: 0, enter: 500, exit: 0 }}
        onEnter={calcHeight}
      >
        <button
          ref={buttonRef}
          type="button"
          className={styles.addButton}
          onClick={() => {
            setIsCreateMode(true);
            setIsAddTask(true);
          }}
        >
          <span className={styles.buttonIcon}>
            <HiPlusCircle />
          </span>
          <span className={styles.buttonText}>{t('AddTask')}</span>
        </button>
      </CSSTransition>
    </div>
  );
};

export default AddTodo;
