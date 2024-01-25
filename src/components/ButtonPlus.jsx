import style from './style.module.css';

export function ButtonPlus({ onClick }) {
	return (
		<button onClick={onClick} className={style.btnPlus}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="19"
				height="18"
				viewBox="0 0 19 18"
				fill="none"
			>
				<path
					d="M5 9H14"
					stroke="#2F9089"
					strokeWidth="1.25"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9.5 4.5V13.5"
					stroke="#2F9089"
					strokeWidth="1.25"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}

export function ButtonDelete({ onClick }) {
	return (
		<button className={style.btnDel} onClick={onClick}>
			Delete
		</button>
	);
}
