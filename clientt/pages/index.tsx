import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FormLogin from './../component/FormLogin';
import styled from '../styles/Create.module.scss'
import classNames from 'classnames';
import Link from 'next/link';
import jwt from 'jsonwebtoken'
// import { useRouter } from 'next/router.js';

export default function Home(){
  const router = useRouter()
  const [email, setEmail] = useState  <string>('')
	const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  // const {login,handleSubmit} = useForm();
  async function submit() {
		 const res = await fetch('./api/login',{
			method: 'POST',
			// headers: {'Content-Type': 'aplication/json'},
			body: JSON.stringify({
        email, 
        password
      })
		}).then((t) => t.json())
    const token = res.token
    if(token){
      const json = jwt.decode(token) as {[key:string]:string}
      console.log(json) 
      router.push('./user/index')
   } else{
      setMessage('Error')
   }
  }
    	return (
		<>
			<div className={styled.authform}>	
			<div className={styled.wrapper}>
				<div className={styled.titletext}>
					<div className={classNames(styled.title,styled.login)}>Login Form</div>
					<div className={classNames(styled.title,styled.signup)}>Signup Form</div>
				</div>
				<div className={styled.formcontainer}>
					<div className={styled.forminner}>
						<form className={styled.login} onSubmit={submit}>
							<div className={styled.field}>
							<input type="text" name="username" placeholder="Email Address" required 
              onChange={e=>setEmail(e.target.value)}/>
							</div>
							<div className={styled.field}>
							<input type="password"  name="password" placeholder="Password" required onChange={e=>setPassword(e.target.value)} />
							</div>
							<div className={styled.passlink}><a href="#">Forgot password?</a></div>
							<div className={classNames(styled.field,styled.btn)}>
							<div className={styled.btnlayer} />
								<input type="submit" value="Login"/>
									{/* <input type="submit" value="Signup">h</input> */}
							</div>
							<div className={styled.signuplink}>Not a member? <Link href="/signup"><a>Signup now</a></Link></div>
						</form>
            <h1>{message}</h1>
					</div>
				</div>
			</div>
		</div>			
		</>
	);
}