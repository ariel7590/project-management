import React, { useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../css/inbox.css'

function Inbox() {
	const [data, setData] = useState(undefined)
	const [show, setShow] = useState(false)
	const [subject, setSubject] = useState('')
	const [source, setSource] = useState('')
	const [content, setContent] = useState('')

	const handleClose = () => setShow(false)
	const handleClick = (sbj, src, cont) => {
		axios
			.post('/set-read', {
				Subject: sbj,
				Message: cont,
			})
			.then(() => {
				setSubject(sbj)
				setSource(src)
				setContent(cont)
				setShow(true)
			})
			.catch((error) => {
				alert(error)
				console.log(error)
			})
	}

	axios
		.get('/messages')
		.then((response) => {
			var filteredMail = response.data.filter((msg) => {
				return msg.DestEmail === sessionStorage.getItem('logged-in-email')
			})
			setData(filteredMail)
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error.response.data.message)
			alert(error.response.data.message)
		})

	if (data === undefined) {
		return (
			<div className='text-center'>
				<div className='spinner-border' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		)
	} else {
		return (
			<>
				<h1 align='center'>Inbox</h1>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Subject</th>
							<th>From</th>
						</tr>
					</thead>
					<tbody>
						{data.map((msg, index) => {
							return (
								<tr
									key={index}
									onClick={() => {
										handleClick(msg.Subject, msg.SourceEmail, msg.Message)
									}}
								>
									<td>{index}</td>
									<td>{msg.Subject}</td>
									<td>{msg.SourceEmail}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>{subject}</Modal.Title>
					</Modal.Header>
					<Modal.Body className='modal-dialog'>
						<div>
							<div>
								<label>From: </label> {source}
							</div>
							<div>
								<label>Message: </label>
								<label>{content}</label>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Reply
						</Button>
						<Button variant='primary' onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default Inbox
