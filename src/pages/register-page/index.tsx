import ContentField from 'components/content/ContentField';
import SectionHeader from 'components/section-header/SectionHeader';
import React from 'react';

type Props = {};

function RegisterPage({}: Props) {
	return (
		<>
			<SectionHeader>Hồ sơ ABC</SectionHeader>
			<ContentField>Hell world</ContentField>
		</>
	);
}

export default RegisterPage;
