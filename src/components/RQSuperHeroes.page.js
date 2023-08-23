import { Link } from "react-router-dom";
import {
	useAddSuperHeroData,
	useSuperHeroesData,
} from "../Hooks/useSuperHeroesData";
import { useState } from "react";

const onError = (error) => {
	console.log("Perform side effect after encountering error", error);
};

const onSuccess = (data) => {
	console.log("Perform side effect after data fetching", data);
};
export const RQSuperHeroesPage = () => {
	const [name, setName] = useState("");
	const { mutate: addHero } = useAddSuperHeroData();

	const [alterEgo, setAlterEgo] = useState("");
	const {
		isLoading,
		data: superHeroes,
		isError,
		isFetching,
		error,
	} = useSuperHeroesData(onSuccess, onError);

	if (isLoading || isFetching) {
		return <h2>Loading ...</h2>;
	}
	if (isError) {
		return <h2>Something goes wrong {error.message} </h2>;
	}

	const handleAddHeroClick = (e) => {
		e.preventDefault();
		const hero = { name, alterEgo };
		addHero(hero);
		setAlterEgo("");
		setName("");
		// alert("Super Hero Data Added");
	};
	return (
		<>
			<h2>RQ Super Heroes Page</h2>

			<div>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					value={alterEgo}
					onChange={(e) => setAlterEgo(e.target.value)}
				/>
				<button onClick={handleAddHeroClick}>Add Hero</button>
			</div>

			{superHeroes?.map((hero) => (
				<div key={hero.id}>
					<li>
						<Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
					</li>
				</div>
			))}
		</>
	);
};
