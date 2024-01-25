import { useEffect, useState } from 'react';
import { RecursiveComponent } from './RecursiveFields';
import { data } from './assets/data';

function App() {
	// state
	const [titles, setTitles] = useState(data);
	const [localStorageData, setLocalStorage] = useState(false);

	// localStorage get
	useEffect(() => {
		const storedData = localStorage.getItem('data');

		if (storedData) {
			setLocalStorage(true);
			setTitles(JSON.parse(storedData));
		}
	}, []);

	// change text
	const textChanges = (id, text) => {
		const updateTitlesRecursive = (items) => {
			return items.map((item) => {
				if (item.id === id) {
					return {
						...item,
						title: text,
					};
				} else if (item.child) {
					return {
						...item,
						child: updateTitlesRecursive(item.child),
					};
				}
				return item;
			});
		};

		setTitles(updateTitlesRecursive(titles));
	};

	// delete items
	const deleteItem = (id) => {
		const updateTitlesRecursive = (items) => {
			return items.reduce((acc, item) => {
				if (item.id === id) {
					return acc;
				} else {
					const updatedItem = {
						...item,
						child: item.child ? updateTitlesRecursive(item.child) : undefined,
					};
					return [...acc, updatedItem];
				}
			}, []);
		};

		setTitles(updateTitlesRecursive(titles));
	};

	// create new
	const generateNew = (parentId) => {
		console.log(parentId);
		const newItem = {
			id: Date.now().toString(),
			title: 'New Item',
		};

		const updateTitlesRecursive = (items) => {
			return items.map((item) => {
				if (item.id === parentId) {
					return {
						...item,
						child: item.child ? [...item.child, newItem] : [newItem],
					};
				} else if (item.child) {
					return {
						...item,
						child: updateTitlesRecursive(item.child),
					};
				}
				return item;
			});
		};

		setTitles(updateTitlesRecursive(titles));
	};

	// save in local storage
	const saveLocalStorage = () => {
		if (localStorageData) {
			localStorage.removeItem('data', JSON.stringify(titles));
			setLocalStorage((i) => !i);
			return;
		}
		localStorage.setItem('data', JSON.stringify(titles));
		setLocalStorage((i) => !i);
		return;
	};

	return (
		<div>
			{/* top local storage btn  */}
			<div className="topBtnWrap">
				<button
					onClick={saveLocalStorage}
					className={`topBtnWrap__btn ${!localStorageData}`}
				>
					{localStorageData ? 'Delete ' : ' Save '}in Local Storage
				</button>
			</div>

			<div>
				{/* recursive components 	 */}
				<RecursiveComponent
					generateNew={generateNew}
					textChanges={textChanges}
					deleteItem={deleteItem}
					titles={titles}
				/>
			</div>
		</div>
	);
}

export default App;
