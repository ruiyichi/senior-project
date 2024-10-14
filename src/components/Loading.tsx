import InfiniteProgressBar from "./InfiniteProgressBar";

const Loading = ({ title='Loading...' }) => {
	return (
		<div className='loading-container'>
			<InfiniteProgressBar />
			{title}
		</div>
	);
}

export default Loading;