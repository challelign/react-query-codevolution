import { useQuery } from "react-query";
import axios from "axios";
import { getSuperHeroes } from "../api/SuperHeroes";

export const RQSuperHeroesNameOnly = () => {
	const {
		isLoading,
		data: superHeroes,
		isError,
		isFetching,
		error,
		refetch,
	} = useQuery("super-heroes", getSuperHeroes, {
		enabled: false,
		select: (superHeroes) => {
			const superHeroNames = superHeroes.map((hero) => hero.name);
			return superHeroNames;
		},
	});

	if (isLoading || isFetching) {
		return <h2>Loading ...</h2>;
	}
	if (isError) {
		return <h2>Something goes wrong {error.message} </h2>;
	}
	return (
		<>
			<h2>RQ Super Heroes Names Only Page</h2>

			<button onClick={refetch}>Fetch Heroes</button>

			{superHeroes?.map((superHName) => (
				<li key={superHName}>{superHName}</li>
			))}
		</>
	);
};
