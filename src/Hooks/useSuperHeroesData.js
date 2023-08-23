import React from "react";
import {
	getSuperHeroes,
	getSuperHero,
	getUsersByEmail,
	getCoursesByChannelId,
	getPaginatedData,
	getInfiniteData,
} from "../api/SuperHeroes";
import { useQuery, useQueryClient } from "react-query";

export const useSuperHeroesData = (onSuccess, onError) => {
	return useQuery("super-heroes", getSuperHeroes, {
		onSuccess,
		onError,
		// cacheTime: 5000, // to reduce no of network request
		// staleTime: 30000, // 30 sec default is 0 sec
		// refetchOnMount: true,
		// refetchOnWindowFocus: true,
		// refetchInterval: 2000,
		// refetchIntervalInBackground: true,
	}); //passing param is optional
};
// getting single hero detail
export const useSuperHeroData = (heroId) => {
	const queryClient = useQueryClient(); //setting initial data to the query
	return useQuery(["super-hero", heroId], () => getSuperHero(heroId), {
		initialData: () => {
			const hero = queryClient
				.getQueryData("super-hero")
				?.data?.find((hero) => hero.id === parseInt(heroId));
			if (hero) {
				return { data: hero };
			} else {
				return undefined;
			}
		},
	});
};

export const useUsersDataByEmail = (email) => {
	return useQuery(["users-by-email", email], () => getUsersByEmail(email));
};

export const useCoursesByChannelId = (channelId) => {
	return useQuery(
		["courses-by-channelId", channelId],

		() => getCoursesByChannelId(channelId),
		{
			enable: !channelId,
		}
	);
};

export const usePaginatedData = (pageNumber) => {
	return useQuery(
		["paginated-data", pageNumber],
		() => getPaginatedData(pageNumber),
		{
			keepPreviousData: true,
		}
	);
};
