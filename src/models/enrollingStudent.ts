export interface EnrollingStudent {
	id: string;
	fullName: string;
	email: string;
	studentDob: string;
	identityNumber: string;
	major: string;
	highSchoolCert: string;
	highSchoolResult: string;
	startingSeason: string;
	enrollingStatus: string;
}

export type EnrollingStudentRequest = Omit<EnrollingStudent, 'id' | 'status'>;

export type UpdateStatusEnrollingStudentType = {
	id: string;
	status: string;
};
