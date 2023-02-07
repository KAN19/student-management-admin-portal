import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enrollingStudentApi } from 'api/enrollingStudentApi';
import {
	EnrollingStudent,
	UpdateStatusEnrollingStudentType,
} from 'models/enrollingStudent';
import { AppRootState } from 'stores';

const initialState = {
	status: 'idle' || 'loading' || 'succeeded' || 'failed',
	listEnrollingStudent: [] as EnrollingStudent[],
	enrollingStudent: {} as EnrollingStudent,
};

export const fetchEnrollingStudent = createAsyncThunk(
	'enrollingStudent/enrollingStudent',
	async (params: any, thunkAPI) => {
		try {
			const response = await enrollingStudentApi.getAll(params);
			console.log(response?.data);
			return response;
		} catch (error) {
			const message = 'Error Message';
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const fetchEnrollingStudentDetail = createAsyncThunk(
	'enrollingStudent/enrollingStudentDetail',
	async (id: string, thunkAPI) => {
		try {
			const response = await enrollingStudentApi.getById(id);
			return response;
		} catch (error) {
			const message = 'Error Message';
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const updateStatusEnrollingStudent = createAsyncThunk(
	'enrollingStudent/update-status',
	async ({ id, status }: UpdateStatusEnrollingStudentType, thunkAPI) => {
		try {
			const response = await enrollingStudentApi.updateStatus(id, status);
			return response;
		} catch (error) {
			const message = 'Error Message';
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const enrollingStudentSlice = createSlice({
	name: 'enollingStudent',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEnrollingStudent.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchEnrollingStudent.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.listEnrollingStudent = action.payload.data;
			})
			.addCase(fetchEnrollingStudent.rejected, (state) => {
				state.status = 'failed';
			});
		builder
			.addCase(fetchEnrollingStudentDetail.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchEnrollingStudentDetail.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.enrollingStudent = action.payload.data;
				console.log(action.payload.data);
			})
			.addCase(fetchEnrollingStudentDetail.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const selectListEnrollingStudent = (state: AppRootState) =>
	state.enrollingStudentSlice.listEnrollingStudent;

export const selectEnrollingStudentDetail = (state: AppRootState) =>
	state.enrollingStudentSlice.enrollingStudent;

export default enrollingStudentSlice.reducer;
