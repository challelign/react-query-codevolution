import { Link } from "react-router-dom";
import useDebounceSearch from "../Hooks/useDebounceSearch";

import {
	useAddSuperHeroData,
	useSuperHeroesData,
} from "../Hooks/useSuperHeroesData";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { deleteSuperHero } from "../api/SuperHeroes";
const onError = (error) => {
	console.log("Perform side effect after encountering error", error);
};

const onSuccess = (data) => {
	console.log("Perform side effect after data fetching", data);
};
// Define styles as objects
const inputStyle = {
	padding: "10px",
	marginBottom: "10px",
	width: "200px",
};

const buttonStyle = {
	padding: "10px",
	backgroundColor: "blue",
	color: "white",
	border: "none",
	borderRadius: "5px",
	margin: "20px",
};
export const RQSuperHeroesPage = ({ search }) => {
	const [name, setName] = useState("");
	const debSerach = useDebounceSearch(search, 200);
	// const [search, setSearch] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const queryClient = useQueryClient();

	const { mutate: addHero } = useAddSuperHeroData();

	const [alterEgo, setAlterEgo] = useState("");
	const {
		isLoading,
		data: superHeroes,
		isError,
		isFetching,
		error,
	} = useSuperHeroesData(onSuccess, onError, debSerach);

	const deleteSuperMutation = useMutation({
		mutationFn: deleteSuperHero,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
			// console.log("success");
		},
	});
	if (isLoading) {
		return <h2>Loading ...</h2>;
	}
	if (isError) {
		return <h2>Something goes wrong {error.message} </h2>;
	}
	// console.log(search);

	const handleAddHeroClick = (e) => {
		e.preventDefault();
		if (name.trim() === "") {
			setErrorMessage(" Please Fill name");
		} else if (alterEgo.trim() === "") {
			setErrorMessage(" Please Fill alterEgo");
		} else {
			const hero = { name, alterEgo };
			addHero(hero);
			setAlterEgo("");
			setName("");
		}
		// alert("Super Hero Data Added");
	};

	const handleDelete = (id) => {
		deleteSuperMutation.mutate(id);
	};
	return (
		<>
			<h2>RQ Super Heroes Page</h2>

			<div style={{ margin: "10px" }}>
				<div>
					{errorMessage ? <div className="error">{errorMessage}</div> : ""}
				</div>

				<div style={{ margin: "10px" }}>
					<br />

					<label>Name</label>
					<br />
					<input
						type="text"
						value={name}
						style={inputStyle}
						onChange={(e) => setName(e.target.value)}
					/>
					<br />
					<label>AlerEgo Name</label>
					<br />
					<input
						type="text"
						value={alterEgo}
						style={inputStyle}
						onChange={(e) => setAlterEgo(e.target.value)}
					/>
					<span></span>

					<button style={buttonStyle} onClick={handleAddHeroClick}>
						Add Hero
					</button>
				</div>
			</div>

			{superHeroes?.map((hero) => (
				<div key={hero.id}>
					<li>
						<Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
						<span></span>
						<button onClick={() => handleDelete(hero.id)}>delete</button>
					</li>
				</div>
			))}
		</>
	);
};
