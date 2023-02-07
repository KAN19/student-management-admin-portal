import ContentField from 'components/content/ContentField';
import SectionHeader from 'components/section-header/SectionHeader';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'stores';
import {
	fetchEnrollingStudent,
	selectListEnrollingStudent,
} from 'stores/slices/enrollingStudentSlice';

interface DataType {
	key: string;
	name: string;
	email: string;
	identityNumber: string;
	enrollingStatus: string;
}

function Home() {
	const columns: ColumnsType<DataType> = [
		{
			title: 'Họ và tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Địa chỉ email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'CMND/CCCD',
			dataIndex: 'identityNumber',
			key: 'identityNumber',
		},
		{
			title: 'Tình trạng',
			key: 'status',
			dataIndex: 'status',
			render: (_, { enrollingStatus }) => {
				const color =
					enrollingStatus === 'APRROVED'
						? 'green'
						: enrollingStatus === 'PENDING'
						? 'orange'
						: 'red';
				return <Tag color={color}>{enrollingStatus.toLowerCase()}</Tag>;
			},
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<>
					<EyeOutlined
						className="cursor-pointer"
						onClick={() => {
							navigate(`/duyet-ho-so/${record.key}`);
						}}
					/>
				</>
			),
		},
	];

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const listEnrollingStudent = useAppSelector(selectListEnrollingStudent);

	useEffect(() => {
		dispatch(fetchEnrollingStudent({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const brieftData = useMemo(() => {
		return listEnrollingStudent.map((item) => {
			return {
				key: item.id,
				name: item.fullName,
				email: item.email,
				identityNumber: item.identityNumber,
				enrollingStatus: item.enrollingStatus,
			};
		});
	}, [listEnrollingStudent]);

	return (
		<>
			<SectionHeader>
				<div>Danh sách hồ sơ</div>
			</SectionHeader>
			<ContentField>
				<div className="text-xl font-semibold mb-4">
					Danh sách hồ sơ
				</div>
				<Table columns={columns} dataSource={brieftData} />
			</ContentField>
		</>
	);
}

export default Home;
