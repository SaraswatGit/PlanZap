import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { deleteRequest, postRequest, putRequest } from './axiosClient';
import { usercontext } from './Context/usercontext';
import './CSSComponents/delete.css';
import './CSSComponents/movies.css';
import SimpleDialogDemo from './modalBox';

Modal.setAppElement('#root');

const Movies = () => {
	const [movie_name, setmoviename] = useState('');
	const [movie_rating, setmovierating] = useState(0);
	const [movie_desc, setmoviedesc] = useState('');
	const [movielist, setmovielist] = useState([]);
	const [newname, setnewname] = useState(0);
	const [newdesc, setnewdesc] = useState(0);
	const [tempname, settempname] = useState('');
	const [tempdesc, settempdesc] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	//const [defaulttext, setdefaulttext] = useState("");
	const [tempid, settempid] = useState(0);

	const { userid, setuserid } = useContext(usercontext);
	const [isPopup, setPopup] = useState(false);
	const [isRatingAsc, setIsRatingAsc] = useState(null);
	const moviesListOrder = isRatingAsc
		? movielist.sort((a, b) => (a.movie_rating < b.movie_rating ? 1 : -1))
		: movielist.sort((a, b) => (a.movie_rating > b.movie_rating ? 1 : -1));

	function toggleModal() {
		setIsOpen(!isOpen);
	}

	const updatemovie = () => {
		console.log(tempid);
		putRequest('updatedesc', {
			id: tempid,
			movie_name: newname,
			movie_desc: newdesc,
		}).then((response) => {
			postRequest('getdata', {
				userid: userid,
			}).then((response) => {
				setmovielist(response.data);
			});

			console.log('updated');
		});
	};

	const addmovie = () => {
		if (!movie_desc || !movie_name || !movie_rating) {
			alert('Enter all the fields');
			return;
		}
		const data = postRequest('create', {
			movie_name: movie_name,
			movie_rating: movie_rating,
			movie_desc: movie_desc,
			userid: userid,
		}).then(() => {
			postRequest('getdata', {
				userid: userid,
			}).then((response) => {
				setmovielist(response.data);
			});
			console.log('success');
		});
		if (data) {
			setmoviedesc('');
			setmoviename('');
			setmovierating('');
		}
	};

	console.log(setuserid); //This is for removing warning only
	useEffect(() => {
		postRequest('getdata', {
			userid: userid,
		}).then((response) => {
			setmovielist(response.data);
		});
	}, [userid]);

	const deletemovie = (id) => {
		deleteRequest(`deletemovie/${id}`).then((response) => {
			setmovielist(
				movielist.filter((val) => {
					return val.id !== id;
				}),
			);
		});
	};

	return (
		<div className='moviesback'>
			<Modal
				isOpen={isOpen}
				onRequestClose={toggleModal}
				contentLabel='My dialog2'
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
					content: {
						width: '40vw',
						height: '55vh',
						margin: 'auto',
						padding: '0',
						borderRadius: '6px',
						borderColor: 'red',

						background: 'white',

						paddingLeft: '15px',
						paddingTop: '15px',
					},
				}}
			>
				<div className='movie-edit'>
					<label for='mname'>
						<b>Edit Movie Name</b>
					</label>
					<br />
					<input
						id='mname'
						name='moviename'
						rows='2'
						cols='40'
						maxLength='60'
						className='donkey'
						defaultValue={tempname}
						onChange={(event) => {
							setnewname(event.target.value);
						}}
					/>
					<br />
					<br />
					<label for='mdesc'>
						<b>Edit Movie Description</b>
					</label>
					<br />
					<textarea
						id='mdesc'
						name='moviedescription'
						rows='2'
						cols='40'
						maxLength='60'
						className='donkey'
						defaultValue={tempdesc}
						onChange={(event) => {
							setnewdesc(event.target.value);
						}}
					></textarea>
					<br />
					<br />
					<button
						className='save-button'
						onClick={() => {
							updatemovie();
							toggleModal();
						}}
					>
						Save
					</button>
				</div>
			</Modal>

			<div className='topbar'>
				<div className='moviename'>Title</div>
				<div className='movierating'>
					IMDb
					<div
						className='rating-sort-btn'
						onClick={() =>
							isRatingAsc
								? setIsRatingAsc(false)
								: setIsRatingAsc(true)
						}
						title='Sort by Rating'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							style={{
								height: '20px',
								width: '20px',
								background: 'none',
							}}
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path
								fillRule='evenodd'
								d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
				</div>
				<div className='moviedesc'>Description</div>
			</div>

			<div>
				{moviesListOrder.map((val, key) => {
					return (
						<div className='topbar2'>
							<div className='moviename2'>
								<p>
									<a
										href={
											'https://www.google.com/search?q= ' +
											val.movie_name
										}
									>
										{val.movie_name}
									</a>
								</p>
							</div>
							<div className='movierating2'>
								{val.movie_rating}
							</div>
							<div className='moviedesc2'>
								<p>{val.movie_desc}</p>
								<div>
									<EditIcon
										className='edit-icon hoverOnCursor'
										style={{
											paddingLeft: '30px',
											height: '3.2vh',
										}}
										onClick={() => {
											settempname(val.movie_name);
											settempdesc(val.movie_desc);
											setnewname(val.movie_name);
											setnewdesc(val.movie_desc);
											settempid(val.id);
											toggleModal();
										}}
									/>
									<DeleteIcon
										className='trash-icon hoverOnCursor'
										style={{
											paddingLeft: '30px',
											height: '3.2vh',
										}}
										onClick={() => {
											setPopup(true);
										}}
									/>
								</div>
							</div>

							<Modal
								isOpen={isPopup}
								onRequestClose={() => {
									setPopup(false);
								}}
								style={{
									overlay: {
										backgroundColor: 'rgba(0, 0, 0, 0.75)',
									},
									content: {
										width: '30vw',
										height: '30vh',
										margin: 'auto',
										padding: '1%',
										borderRadius: '7px',
										backgroundColor: 'white',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'space-around',
									},
								}}
								centered
							>
								<h2 className='delete-message'>
									Do you want to delete the movie?
								</h2>
								<div className='delete-btns'>
									<button
										onClick={() => {
											deletemovie(val.id);
											setPopup(false);
										}}
										className='popupBtn confirm-btn'
										style={{ backgroundColor: 'red' }}
									>
										confirm
									</button>

									<button
										onClick={() => {
											setPopup(false);
										}}
										className='popupBtn cancel-btn'
									>
										cancel
									</button>
								</div>
							</Modal>
						</div>
					);
				})}
			</div>

			<div className='entrybox'>
				<div className='Heading'>Enter the Movie Details here</div>
				<br />
				<div className='formbox'>
					<label for='mname'>Movie Name</label>
					<br />
					<br />
					<input
						type='text'
						id='mname'
						maxLength='40'
						name='moviename'
						className='donkey'
						value={movie_name}
						placeholder='Mission Impossible : Rogue Nation '
						onChange={(event) => {
							setmoviename(event.target.value);
						}}
					/>
					{/* <Button style={{ visibility: "inline-block" }} onClick={handleSearch}>
            Search
          </Button> */}
					<SimpleDialogDemo
						title={movie_name}
						setIMDB={setmovierating}
						setDescription={setmoviedesc}
					/>
					{/* <br /> */}

					<br />
					<label for='mrating'>IMDb rating</label>
					<br />
					<br />
					<input
						type='text'
						id='mrating'
						maxLength='3'
						name='movierating'
						className='donkey'
						value={movie_rating}
						placeholder='8.4'
						onChange={(event) => {
							setmovierating(event.target.value);
						}}
					/>
					<br />
					<br />
					<label for='mdesc'>Movie Description</label>
					<br />
					<textarea
						style={{
							resize: 'vertical',
						}}
						id='mdesc'
						name='moviedescription'
						rows='2'
						cols='40'
						maxLength='73'
						value={movie_desc}
						placeholder='Description'
						onChange={(event) => {
							setmoviedesc(event.target.value);
						}}
					></textarea>
					<div className='center'>
						<input
							type='submit'
							value='ADD'
							className='subm2'
							onClick={addmovie}
						/>
					</div>
				</div>
			</div>

			<div></div>
		</div>
	);
};

export default Movies;
