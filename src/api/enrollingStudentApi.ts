import axiosClient from './axiosClient';

export const enrollingStudentApi = {
	getAll: (params?: any) => {
		const url = '/enrolling';
		return axiosClient.get(url, { params });
	},
};
