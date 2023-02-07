import { Button, Select, message } from 'antd';
import ContentField from 'components/content/ContentField';
import SectionHeader from 'components/section-header/SectionHeader';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'stores';
import {
	fetchEnrollingStudentDetail,
	selectEnrollingStudentDetail,
	updateStatusEnrollingStudent,
} from 'stores/slices/enrollingStudentSlice';

function RegisterPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const enrollingStudent = useAppSelector(selectEnrollingStudentDetail);

	useEffect(() => {
		if (id) {
			dispatch(fetchEnrollingStudentDetail(id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleApproveStudent = () => {
		if (id) {
			dispatch(
				updateStatusEnrollingStudent({ id: id, status: 'approved' })
			).then(() => {
				message.success('Cập nhật thành công');
				navigate('/');
			});
		}
	};

	const handleRejectStudent = () => {
		if (id) {
			dispatch(
				updateStatusEnrollingStudent({ id: id, status: 'rejected' })
			).then(() => {
				message.success('Cập nhật thành công');
				navigate('/');
			});
		}
	};

	return (
		<>
			<SectionHeader>
				Hồ sơ thí sinh {enrollingStudent?.fullName}
			</SectionHeader>
			<ContentField>
				<div>
					<div className="grid grid-cols-2 gap-10">
						<div className="space-y-2">
							<div className="font-semibold">
								Thông tin cá nhân
							</div>
							<div>Họ và tên: {enrollingStudent?.fullName}</div>
							<div>Ngày sinh: {enrollingStudent?.studentDob}</div>
							<div>Email: {enrollingStudent?.email}</div>
							<div>
								CMND/CCCD: {enrollingStudent?.identityNumber}
							</div>
						</div>

						<div className="space-y-2">
							<div className="font-semibold">
								Thông tin đăng ký
							</div>
							<div>
								Ngành học:
								<Select value={enrollingStudent?.major}>
									<Select.Option value="ky-thuat-phan-mem">
										Kỹ thuật phần mềm
									</Select.Option>
									<Select.Option value="khoa-hoc-may-tinh">
										Khoa học máy tính
									</Select.Option>
									<Select.Option value="cong-nghe-thong-tin">
										Công nghệ thông tin
									</Select.Option>
								</Select>
							</div>

							<div>
								Kỳ nhập học:
								<Select
									value={enrollingStudent?.startingSeason}
								>
									<Select.Option value="oct-2023">
										October 2023
									</Select.Option>
									<Select.Option value="march-2024">
										March 2024
									</Select.Option>
								</Select>
							</div>
						</div>

						<div className="col-span-2">
							<div className="font-semibold">Giấy tờ</div>
							<div className="grid grid-cols-2 gap-10">
								<div className="space-y-2">
									<div>Giấy chứng nhận tốt nghiệp THPT:</div>
									<img
										src={enrollingStudent?.highSchoolCert}
										alt="Giấy chứng nhận tốt nghiệp THPT"
										className="object-contain max-w-lg"
									/>
								</div>
								<div className="space-y-2">
									<div>Kết quả thi THPT:</div>
									<img
										src={enrollingStudent?.highSchoolResult}
										alt="Kết quả thi THPT"
										className="object-contain max-w-lg"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-end space-x-4">
						<Button
							type="default"
							danger
							onClick={handleRejectStudent}
						>
							Từ chối
						</Button>
						<Button type="primary" onClick={handleApproveStudent}>
							Duyệt thí sinh
						</Button>
					</div>
				</div>
			</ContentField>
		</>
	);
}

export default RegisterPage;
