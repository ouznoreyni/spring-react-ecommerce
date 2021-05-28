import React, { useEffect } from 'react';
import Table from './common/Table';

const UserTable = (props) => {
	const auth = {};
	useEffect(() => {
		try {
			const user = auth.getCurrentUser();
			if (user && user.isAdmin) columns.push(addDeleteColumn());
		} catch (error) {
			console.log(error);
		}
	});

	const columns = [
		{
			path: 'first_name',
			label: 'prenom',
		},
		{ path: 'last_name', label: 'nom' },
		{ path: 'username', label: 'nom utilisateur' },
		{ path: 'email', label: 'email' },
		{ path: 'isAdmin', label: 'admin' },
	];

	const addDeleteColumn = () => {
		return {
			key: 'supprimer',
			content: (product) => (
				<button
					onClick={() => props.onDelete(product._id)}
					className='btn btn-danger'
				>
					supprimer
				</button>
			),
		};
	};

	const { users, onSort, sortColumn } = props;

	return (
		<Table
			data={users}
			columns={columns}
			onSort={onSort}
			sortColumn={sortColumn}
		/>
	);
};

export default UserTable;
