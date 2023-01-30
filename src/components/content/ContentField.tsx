import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';

const { Content } = Layout;

type Props = {
	children: React.ReactNode;
	breadCrumb?: Array<string>;
};

function ContentField({ children, breadCrumb }: Props) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Content style={{ margin: '0 16px' }}>
			<Breadcrumb style={{ margin: '16px 0' }}>
				{breadCrumb &&
					breadCrumb.map((item, index) => {
						return (
							<Breadcrumb.Item key={index}>
								{item}
							</Breadcrumb.Item>
						);
					})}
			</Breadcrumb>
			<div
				style={{
					padding: 24,
					minHeight: '70vh',
					background: colorBgContainer,
				}}
			>
				{children}
			</div>
		</Content>
	);
}

export default ContentField;
