import React from 'react';

import './Input.css';

const Input = ({ sendMessage, message, checkMessage, beforeSend }) => (
<form className="form">
	<input
	className="input"
	type="text"
	placeholder="Type a message..."
	value={message}
	onChange={({ target: { value } }) => checkMessage(value)}
	onKeyPress={event => event.key === 'Enter'
			? beforeSend(event) : null}
	/>
	<button className="sendButton"
		onClick={e => beforeSend(e)}>Send</button>
</form>
)

export default Input;
