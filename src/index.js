import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	render() {
		let class_name='square';
		if (this.props.value != null) {
			class_name += '-used';
		}
		return <button className={class_name} onClick={this.props.onClick}>{this.props.value}</button>;
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			on: true,
		};
	}

	reset(squares) {
		for (let i = 0; i < squares.length; i++) {
			squares[i] = null;
		}
		this.setState({
			squares: squares,
			on: true,
		});
	}
	renderSquare (i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => {
						const squares = this.state.squares.slice();
						if (winner(squares) || squares[i])
							return;

						let on = this.state.on;
						if (on) squares[i] = 'X';
						else squares[i] = 'O';
						on = !on;
						this.setState({
							squares: squares,
							on: on,
						});
				}}
			/>
		);
	}

	render() {
		let status = (this.state.on ? 'X' : 'O') + "'s turn" ;
    let statusClass = "status";
		if (winner(this.state.squares)) {
			status = winner(this.state.squares) + " is Winner";
      statusClass += "-win";
		}
		return (
			<div>
				<div className={statusClass}>{status}</div>
				<div className="board">
					<div>
						{this.renderSquare(0)}
						{this.renderSquare(1)}
						{this.renderSquare(2)}
					</div>
					<div>
						{this.renderSquare(3)}
						{this.renderSquare(4)}
						{this.renderSquare(5)}
					</div>
					<div>
						{this.renderSquare(6)}
						{this.renderSquare(7)}
						{this.renderSquare(8)}
					</div>
				</div>
				<div className="controlles">
					<button className="reset" onClick={() => { this.reset(this.state.squares.slice()); }}>Reset</button>
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
  render() {
		return (
			<div>
				<Board />
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));

function winner(squares) {
	const wins = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6],
	];

	for (let i = 0; i < wins.length; i++) {
		const[a, b, c] = wins[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
			return squares[a];
	}
	return null;
}
