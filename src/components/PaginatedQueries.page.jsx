import React, { useState } from "react";
import { usePaginatedData } from "../Hooks/useSuperHeroesData";
import axios from "axios";
import { useQuery } from "react-query";

const PaginatedQueriesPage = () => {
	const [pageNumber, setPageNumber] = useState(1);

	const { isLoading, data, isError, isFetching, error } =
		usePaginatedData(pageNumber);

	// console.log("Data is ", data);
	if (isLoading) {
		return <h2>Loading ...</h2>;
	}
	if (isError) {
		return <h2>Something goes wrong {error.message} </h2>;
	}
	return (
		<>
			<div>
				PaginatedQueriesPage
				{data?.map((color) => (
					<div key={color.id}>
						<h2>
							{color.id} . {color.label}
						</h2>
					</div>
				))}
			</div>
			<div>
				<button
					onClick={() => setPageNumber((page) => page - 1)}
					disabled={pageNumber === 1}
				>
					prev page
				</button>{" "}
				<span></span>
				<button
					onClick={() => setPageNumber((page) => page + 1)}
					disabled={pageNumber === 4}
				>
					next page
				</button>
			</div>
			<p>{isFetching && "Loading .."}</p>
		</>
	);
};

export default PaginatedQueriesPage;
