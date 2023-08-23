import axios from "axios";

const api = axios.create({
	baseURL: `http://localhost:4000/`,
});

export const getSuperHeroes = async () => {
	const response = await api.get("/superheroes");
	return response.data;
};

export const getSuperHero = async (heroId) => {
	const response = await api.get(`/superheroes/${heroId}`);
	return response.data;
};

export const getUsersByEmail = async (email) => {
	const response = await api.get(`/users/${email}`);
	return response.data;
};

export const getCoursesByChannelId = async (channelId) => {
	const response = await api.get(`/channels/${channelId}`);
	return response.data;
};

export const getPaginatedData = async (pageNumber) => {
	const response = await api.get(`/colors?_limit=2&_page=${pageNumber}`);
	return response.data;
};
