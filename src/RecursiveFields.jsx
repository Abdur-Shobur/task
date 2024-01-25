import Title from './components/Title';
import { ButtonDelete, ButtonPlus } from './components/ButtonPlus';
import style from './components/style.module.css';

export const RecursiveComponent = ({
	textChanges,
	generateNew,
	titles,
	deleteItem,
}) => {
	return (
		<div className="wrap-box">
			{/* loop all items  */}
			{titles.map((item, index) => (
				<div key={item.id} className="items-list">
					<div className={style.inpWrap}>
						{/* title  */}
						<Title
							title={item.title}
							curve={item.curve}
							id={item.id}
							textChanges={textChanges}
						/>

						{/* delete handler  */}
						<ButtonDelete onClick={() => deleteItem(item.id)} />
					</div>

					{/* new create btn  */}
					<ButtonPlus onClick={() => generateNew(item.id)} />

					{/* if child again call same way  */}
					{item.child && (
						<div className="child-wraps">
							<RecursiveComponent
								titles={item.child}
								generateNew={generateNew}
								textChanges={textChanges}
								deleteItem={deleteItem}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
