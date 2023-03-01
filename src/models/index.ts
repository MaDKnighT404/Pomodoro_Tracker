export interface ITask {
  _id: string;
  __v: number;
  title: string;
  note?: string;
  createdAt: number; // timestamp
  deadlineAt: number; // timestamp
  deadlineDate: string;
  isCompleted: boolean;
  pomodorosNumber: number;
  pomodoroTime: number; // time in minutes
  completedPomodors: number;
  order: number;
  user?: {
    _id: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    passwordHash: string;
    fullName: string;
    email: string;
  };
}

export interface IUser {
  fullName: string;
  isRegistred: boolean;
}
