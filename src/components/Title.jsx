import style from './style.module.css';

function Title({ id, title, curve, textChanges }) {
	return (
		<>
			<input
				onChange={(e) => textChanges(id, e.target.value)}
				className={`${style.title} ${curve && style.curve}`}
				placeholder={title}
			/>
		</>
	);
}

export default Title;
