import React, { useContext, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import ReactModal from 'react-modal';
import { postRequest } from './axiosClient';
import { usercontext } from './Context/usercontext';
import './CSSComponents/loginpage.css';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const Login = () => {
	const { notloggedin, setloginstatus, userid, setuserid } =
		useContext(usercontext);
	const [useremail, setuseremail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [lmail, setlmail] = useState('');
	const [pass, setpass] = useState('');
	const [loginMessage, setLoginMessage] = useState('');
	const [registerMessage, setRegisterMessage] = useState('');
	const [passM, setPasssword] = useState('');
	const [visible, setVisible] = useState(false);

	function togglePasswordView() {
		setVisible(!visible);
	}

	const registeruser = (e) => {
		//console.log(useremail+password);
		console.log(userid); //This is for removing warning only
		console.log(notloggedin); //This is for removing warning only

		e.preventDefault(); // added this line so that the default submission of form (which caused refreshing of the page)can be prevented and we get submit using post method.
		if (password === confirmPassword) {
			postRequest('usercreate', {
				useremail: useremail,
				password: password,
			}).then((response) => {
				setRegisterMessage(response.data.message);
				setTimeout(() => {
					setRegisterMessage('');
				}, 3000);
				window.location.reload();
				// postRequest('userlogin', {
				// 	useremail: useremail,
				// 	password: password,
				// }).then((response) => {
				// 	if (response.data.message) {
				// 		setLoginMessage(response.data.message);
				// 	} else {
				// 		setuserid(response.data[0].userid);
				// 		setloginstatus(false);
				// 	}
				// });
			});
		} else {
			setRegisterMessage('Please make sure your passwords match.');
		}
	};

	const loginuser = (e) => {
		e.preventDefault();
		postRequest('userlogin', {
			useremail: lmail,
			password: pass,
		}).then((response) => {
			if (response.data.message) {
				setLoginMessage(response.data.message);
			} else {
				setuserid(response.data[0].userid);

				setloginstatus(false);
			}
		});
	};

	const [modalIsOpen, setModalisOpen] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [passwordVisible, setPassswordVisible] = useState(false);

	function togglePassword() {
		setPassswordVisible(!passwordVisible);
	}

	function toggleConfirmPassword() {
		setConfirmPasswordVisible(!confirmPasswordVisible);
	}

	return (
		<div className='loginpage'>
			<div className='logo-div'>
				<h2
					style={{
						fontFamily: 'Pacificio',
						fontWeight: 'bolder',
						color: 'rgb(255, 183, 1)',
						marginBottom: '0px',
						
					}}
				>
				<img
					className='logo-img'
					src='https://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/Diary-icon.png'
					alt=''
					style={{
						marginBottom: '-20px',
						height: '90px',
						width: 'auto',
					}}

				/>
					{' '}
					PlanZap
				</h2>

				<p
					style={{
						fontSize: '3vh',
						fontFamily: 'cursive',
						textAlign: 'center',
						color: 'black',
						marginTop: '0px',
						padding: '20px',
					}}
				>
					One Place for your notes, goals, movies, personal diary and
					more!
				</p>
				<img
					className='logo-img'
					src='https://image.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg'
					alt=''
				/>
			</div>

			<div className='loginbox'>
				<div className='loginform'>
					<center>
						<i>
							"A good plan today is better than a perfect plan
							tomorrow"
						</i>
						<br />
						<br />
						<div
							className='heading-login'
							style={{
								fontSize: '5vh',
								fontWeight: '400',
								color: 'rgb(255, 183, 1)',
							}}
						>
							<b>LOGIN</b>
						</div>
						<br />

						<br />
						<div>
							<form autoComplete='on' onSubmit={loginuser}>
								<input
									type='email'
									id='emailid'
									maxLength='40'
									name='emailid'
									className='holders'
									placeholder='Email'
									onChange={(event) => {
										setlmail(event.target.value);
									}}
									required
								/>
								<br />
								<br />
								<input
									type='password'
									id='lpassword'
									maxLength='10'
									name='password'
									autoComplete='new-password'
									className='holders'
									placeholder='Password'
									onChange={(event) => {
										setpass(event.target.value);
										// setPasssword(event.target.value);
									}}
									required
								/>

								{/* <PasswordStrengthMeter passM={passM} /> */}
								{/* Write PasswordMeter Code Here  */}
								<br />
								<br />
								<div>{loginMessage}</div>
								<button type='submit'>
									<b>Sign In</b>
								</button>
							</form>
							<br />
							Visiting for the first time?
							<br />
							<br />
							<button
								type='button'
								onClick={() => setModalisOpen(true)}
							>
								Register here!
							</button>
						</div>
					</center>

					<ReactModal
						className='reg-modal'
						isOpen={modalIsOpen}
						onRequestClose={() => setModalisOpen(false)}
						style={{
							overlay: {
								backgroundColor: 'rgba(0, 0, 0, 0.8)',
							},

							content: {
								position: 'absolute',
								height: '90vh',
								borderRadius: '20px 20px 20px 20px',

								outline: 'none',
								padding: '0px',
							},
						}}
					>
						<div className='regform'>
							<center>
								<br />
								<div
									className='heading-register'
									style={{
										fontSize: '5vh',
										fontWeight: '400',
										color: 'rgb(255, 183, 1)',
									}}
								>
									<b>REGISTER</b>
								</div>
								<br />

								<br />
								<form
									autocomplete='false'
									onSubmit={registeruser}
								>
									<input
										type='email'
										id='emailid'
										maxLength='40'
										name='hidden'
										className='holders'
										autoComplete='false'
										placeholder='Email'
										onChange={(event) => {
											setuseremail(event.target.value);
										}}
										required
									/>
									<br />
									<br />
									<div className='password'>
										<input
											type={
												!passwordVisible
													? 'password'
													: 'text'
											}
											id='password'
											maxLength='10'
											autoComplete='new-password'
											name='password'
											className='holders'
											placeholder='Password'
											onChange={(event) => {
												setPassword(event.target.value);
											}}
											required
										/>
										<div
											className='togglebtn'
											onClick={togglePassword}
										>
											{!passwordVisible ? (
												<BsFillEyeSlashFill />
											) : (
												<BsFillEyeFill />
											)}
										</div>
									</div>

									<br />
									<div className='password'>
										<input
											type={
												!confirmPasswordVisible
													? 'password'
													: 'text'
											}
											id='Cpassword'
											maxLength='10'
											name='Cpassword'
											className='holders'
											placeholder='Confirm Password'
											onChange={(event) => {
												setConfirmPassword(
													event.target.value,
												);
												setPasssword(
													event.target.value,
												);
											}}
											required
										/>
										<div
											className='togglebtn'
											onClick={toggleConfirmPassword}
										>
											{!confirmPasswordVisible ? (
												<BsFillEyeSlashFill />
											) : (
												<BsFillEyeFill />
											)}
										</div>
									</div>
									<PasswordStrengthMeter passM={passM} />
									<br />

									<br />

									<div>
										{registerMessage}
										{}
									</div>
									<button type='submit'>
										<b>Register Me!</b>
									</button>
								</form>
							</center>
							<br />
						</div>
					</ReactModal>
				</div>
			</div>
		</div>
	);
};

export default Login;
