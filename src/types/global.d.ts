interface Task {
  _id: string;
  title: string;
  checked: boolean;
}

interface User {
  _id: string;
  email?: string;
  password?: string;
  totalTime?: number;
  username?: string;
}

interface RankingTopUser {
  _id: string;
  totalTime: number;
  username: string;
}

interface Day {
  date: string;
  totalTime: number;
  _id: string;
}

type Mode = 'session' | 'break';
