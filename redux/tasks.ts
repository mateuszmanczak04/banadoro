import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appAxios from '../lib/appAxios';
import { uuid } from 'uuidv4';

export type Task = {
  _id: string;
  title: string;
  checked: boolean;
};

type InitialState = {
  tasks: Task[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  tasks: [],
  loading: false,
  error: '',
};

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (
    {
      title,
      authorEmail,
    }: { title: string; authorEmail: string | undefined | null },
    thunkAPI
  ) => {
    try {
      const _id = uuid();
      if (authorEmail) {
        appAxios.post('/api/tasks/add-task', {
          title,
          authorEmail,
          _id,
        });
      }
      return { title, checked: false, _id };
    } catch (err) {
      return thunkAPI.rejectWithValue('Could not add task.');
    }
  }
);

export const toggleTask = createAsyncThunk(
  'tasks/toggleTask',
  async (
    {
      _id,
      authorEmail,
    }: { _id: string; authorEmail: string | null | undefined },
    thunkAPI
  ) => {
    try {
      if (authorEmail) {
        appAxios.put('/api/tasks/toggle-task', {
          _id,
        });
      }
      return _id;
    } catch (err) {
      return thunkAPI.rejectWithValue('Could not toggle task.');
    }
  }
);

export const fetchAllUserTasks = createAsyncThunk(
  'tasks/fetchAllUserTasks',
  async (email: string, thunkAPI) => {
    try {
      const response = await appAxios.get(
        '/api/tasks/get-all-user-tasks/' + email
      );

      return response.data.tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue('Could not fetch tasks.');
    }
  }
);

export const uploadLocalTasks = createAsyncThunk(
  'tasks/upload-local-tasks',
  async (email: string, thunkAPI: any) => {
    const tasks = thunkAPI.getState().tasks.tasks;
    const tasksWithEmail = tasks.map((task: Task) => ({
      ...task,
      authorEmail: email,
    }));

    try {
      await appAxios.post('/api/tasks/upload-local-tasks', { tasks, email });

      return tasksWithEmail;
    } catch (err) {
      thunkAPI.rejectWithValue('Could not upload local tasks.');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete-task',
  async (_id: string, thunkAPI: any) => {
    try {
      appAxios.delete('/api/tasks/delete-task/' + _id);
      return _id;
    } catch (err) {
      return thunkAPI.rejectWithValue('Could not delete a task.');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    // add task
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
      state.error = '';
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // toggle task
    builder.addCase(toggleTask.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(toggleTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload) {
          return { ...task, checked: !task.checked };
        }
        return task;
      });
      state.error = '';
    });
    builder.addCase(toggleTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // fetch all user tasks
    builder.addCase(fetchAllUserTasks.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchAllUserTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = '';
    });
    builder.addCase(fetchAllUserTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // upload local tasks
    builder.addCase(uploadLocalTasks.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(uploadLocalTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = '';
    });
    builder.addCase(uploadLocalTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // delete task
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.error = '';
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default tasksSlice.reducer;
export const getTasks = (state: any) => state.tasks.tasks;
export const { setTasks } = tasksSlice.actions;
