import React from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../Hooks/useSuperHeroesData";
const RQSuperHeroPage = () => {
	const { heroId } = useParams();

	const {
		data: heroDetail,
		isLoading,
		isFetching,
		isError,
		error,
	} = useSuperHeroData(heroId);

	if (isLoading || isFetching) {
		return <h2>Loading super hero detail ..</h2>;
	}
	if (isError) {
		return <h2>Some thing goes wrong {error.message} </h2>;
	}
	return (
		<div>
			<p>RQ Super Hero Detail</p>
			<>
				<button>
					<Link to={`/rq-super-heroes`}>Back</Link>
				</button>
				<div key={heroDetail.id}>
					<h3>{heroDetail.name}</h3>
					<h4>{heroDetail.alterEgo}</h4>
					<h4>{heroDetail.id}</h4>
				</div>
			</>
		</div>
	);
};

export default RQSuperHeroPage;
