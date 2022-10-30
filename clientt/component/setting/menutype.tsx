import React from 'react';
import { useState } from "react";
import styled from '../../styles/Components.module.scss'
import classNames from 'classnames';
// import { Route } from 'react-router-dom';
import Pages from './../../component/setting/pages';
import Link from 'next/link';

const items = [
	{name: 'My seting', path:'seting', href:'/../user/myseting'},
	{name: 'Tegs'},
	{name: 'Change password'}
]
const menutype = () => {
	return (
		// <div className='container'>
		<div className={styled.profilemenu}>
				{items.map(items => 
					<li className={styled.profilmenuitems}>
						<Link href={`/${items.href}`}>
						<a className={styled.profilmenulink}>{items.name}</a>
						</Link>
					</li>
					)} 
		</div>

	);
};

export default menutype;