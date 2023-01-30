import React from 'react';
import { Outlet } from 'react-router-dom';
import AppLayout from 'components/layout/AppLayout';

function Protection() {
	return (
		<AppLayout>
			<Outlet />
		</AppLayout>
	);
}

export default Protection;
