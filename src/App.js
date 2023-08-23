import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroesNameOnly } from "./components/RQSuperHeroesNameOnly.page";
import RQSuperHero from "./components/RQSuperHero.page";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import DependentQueriesPage from "./components/DependentQueries.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import InfiniteQueryPage from "./components/InfiniteQuery.page";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/super-heroes">Traditional Super Heroes</Link>
							</li>
							<li>
								<Link to="/rq-super-heroes">RQ Super Heroes</Link>
							</li>
							<li>
								<Link to="/rq-super-heroes-name-only">
									RQ Super Heroes Name Only
								</Link>
							</li>
							<li>
								<Link to="/rq-dependent">RQ dependent</Link>
							</li>
							<li>
								<Link to="/rq-paginated-data">RQ Paginated Data</Link>
							</li>
							<li>
								<Link to="/rq-infinite-data">RQ Infinite Data</Link>
							</li>
						</ul>
					</nav>
					<Switch>
						<Route path="/rq-dependent">
							<DependentQueriesPage email="chalie@gmail.com" />
							<DependentQueriesPage email="a@gmail.com" />
							<DependentQueriesPage email="no@gmail.com" />
						</Route>
						<Route path="/rq-super-heroes-name-only">
							<RQSuperHeroesNameOnly />
						</Route>
						<Route path="/rq-super-heroes/:heroId">
							<RQSuperHeroPage />
						</Route>
						<Route path="/rq-super-heroes">
							<RQSuperHeroesPage />
						</Route>
						<Route path="/super-heroes">
							<SuperHeroesPage />
						</Route>
						<Route path="/rq-paginated-data">
							<PaginatedQueriesPage />
						</Route>
						<Route path="/rq-infinite-data">
							<InfiniteQueryPage />
						</Route>

						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	);
}

export default App;
