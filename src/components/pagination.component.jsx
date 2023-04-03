import React from 'react';

const Pagination = ({ totalPages, onPageChange, currentPage }) => {

	const handlePageClick = (pageNumber) => {
		onPageChange(pageNumber);
	};

	const handlePrevClick = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		pageNumbers.push(
			<li key={1} className={currentPage === 1 ? 'active' : null}>
				<button className='pagination-number' onClick={() => handlePageClick(1)}>{1}</button>
			</li>
		);

		let ellipses = false;
		for (let i = 2; i <= totalPages - 1; i++) {
			if (i === currentPage - 1 || i === currentPage || i === currentPage + 1) {
				// Show the current page and the pages immediately before and after it
				pageNumbers.push(
					<li key={i} className={currentPage === i ? 'active' : null}>
						<button className='pagination-number' onClick={() => handlePageClick(i)}>{i}</button>
					</li>
				);
				ellipses = false;
			} else if (!ellipses) {
				pageNumbers.push(
					<li key={`ellipses${i}`} className="disabled">
						<span>...</span>
					</li>
				);
				ellipses = true;
			}
		}

		if (totalPages > 1) {
			pageNumbers.push(
				<li key={totalPages} className={currentPage === totalPages ? 'active' : null}>
					<button className='pagination-number' onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
				</li>
			);
		}
		return pageNumbers;
	};

	return (
		<div className="pagination-container">
			<ul className="pagination-list">
				<li className={currentPage === 1 ? 'disabled' : null}>
					<button className='pagination-number' onClick={handlePrevClick}>Prev</button>
				</li>
				{renderPageNumbers()}
				<li className={currentPage === totalPages ? 'disabled' : null}>
					<button className='pagination-number' onClick={handleNextClick}>Next</button>
				</li>
			</ul>
		</div>
	);
}

export default Pagination;