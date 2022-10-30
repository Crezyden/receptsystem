import React from 'react';
import Mheader from '../../component/user/Mheader';
import Userheader from '../../component/user/userheader';

const UseLayout=  ({children}) => {
	return (
		<> 
			{/* <Mheader/> */}
			<Userheader/>
			<div className='container'>
				{children}
			</div>
		</>
	);
};

export default UseLayout;
 