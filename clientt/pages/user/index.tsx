import { Card, Grid } from '@material-ui/core';
import React from 'react';
import UseLayout from '../../layouts/user/UseLayout';
import styles from '../../styles/Create.module.scss';
import { useRouter } from 'next/router';
import { Myorder } from './../../types/recept'; 
import ReceiptList from '../../component/user/ReceiptList';

const Index  = () => {
	const router = useRouter()
	const recept: Myorder[] =[
		{_id: '1', name: "Phone ", shop_name: "RD", price: "50", city: "Liepaja", purc_date: "20.09.2022", Val_period:"20.09.2024"},
		{_id: '2', name: "Phone ", shop_name: "RD", price: "50", city: "Liepaja", purc_date: "20.09.2022", Val_period:"20.09.2024"}
	
	]
	
	return (
		<UseLayout>
			<Grid className={styles.grid} justifyContent='center'>
				<Card style={{width: 900}} className={styles.card}>
					<Grid>
						<ReceiptList receipt={recept}/>
					</Grid>
				</Card>			
			</Grid>			
		</UseLayout>
	);
};

export default Index;