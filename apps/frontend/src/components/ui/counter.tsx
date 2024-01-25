import React, { useEffect, useState } from 'react';
import { Button } from './button';

const CounterComponent = ({ value }: { value: number | undefined }) => {
	const [count, setCount] = useState(value !== undefined ? value : 0);

	useEffect(() => {
		if (value !== undefined) {
			setCount(value);
		}
	}, [value]);

	const decreaseCounter = () => {
		setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
	};

	const increaseCounter = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div className='flex items-center justify-center border-4 border-gray-900 rounded-2xl mt-2'>
			<Button className='mr-[15px] bg-gray-900' onClick={decreaseCounter}>
				{'<'}
			</Button>
			<div className='font-[25px] w-auto'>{count}</div>
			<Button className='ml-[15px] bg-gray-900' onClick={increaseCounter}>
				{'>'}
			</Button>
		</div>
	);
};


export default CounterComponent;