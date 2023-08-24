import React, { useState } from "react";

const SearchBox = ({ search, setSearch }) => {
	return (
		<div>
			<input
				type="search"
				name="search"
				value={search}
				onChange={setSearch}
				placeholder="Enter your search term here"
				style={{
					padding: "20px",
					border: "1px solid #ccc",
					borderRadius: "4px",
					fontSize: "14px",
					width: "300px",
					margin: 20,
				}}
			/>
		</div>
	);
};

export default SearchBox;
