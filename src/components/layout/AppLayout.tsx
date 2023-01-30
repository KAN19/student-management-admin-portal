import { Layout } from 'antd';
import LayoutFooter from 'components/footer/LayoutFooter';
import SideBar from 'components/sidebar/SideBar';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

function AppLayout({ children }: Props) {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<SideBar />

			<Layout className="site-layout">
				{children}
				<LayoutFooter />
			</Layout>
		</Layout>
	);
}

export default AppLayout;
