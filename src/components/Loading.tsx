import { motion } from 'framer-motion';

const Loading = ({ title='Loading...' }) => {
	return (
		<div className='loading-container'>
			{title}
		</div>
	);
}

export default Loading;