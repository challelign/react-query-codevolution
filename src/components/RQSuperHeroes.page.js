import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../Hooks/useSuperHeroesData";

const onError = (error) => {
	console.log("Perform side effect after encountering error", error);
};

const onSuccess = (data) => {
	console.log("Perform side effect after data fetching", data);
};
export const RQSuperHeroesPage = () => {
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
	return (
		<>
			<h2>RQ Super Heroes Page</h2>
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
