import axiosClient from './axiosClient';

export const enrollingStudentApi = {
	getAll: (params?: any) => {
		const url = '/enrolling';
		return axiosClient.get(url, { params });
	},
	getById: (id: string) => {
		const url = `/enrolling/${id}`;
		return axiosClient.get(url);
	},
	updateStatus: (id: string, status: string) => {
		const url = `/enrolling/update-status/${id}`;
		return axiosClient.put(url, { status: status });
	},
};
