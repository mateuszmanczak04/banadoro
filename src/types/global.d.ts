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