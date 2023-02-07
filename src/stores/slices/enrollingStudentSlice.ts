import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enrollingStudentApi } from 'api/enrollingStudentApi';
import {
	EnrollingStudent,
	EnrollingStudentRequest,
} from 'models/enrollingStudent';
import { AppRootState } from 'stores';

const initialState = {
	status: 'idle' || 'loading' || 'succeeded' || 'failed',
	listEnrollingStudent: [] as EnrollingStudent[],
};

export const fetchEnrollingStudent = createAsyncThunk(
	'enrollingStudent/enrollingStudent',
	async (params: any, thunkAPI) => {
		try {
			const response = await enrollingStudentApi.getAll(params);
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
				console.log(action.payload.data);
			})
			.addCase(fetchEnrollingStudent.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const selectListEnrollingStudent = (state: AppRootState) =>
	state.enrollingStudentSlice.listEnrollingStudent;

export default enrollingStudentSlice.reducer;
