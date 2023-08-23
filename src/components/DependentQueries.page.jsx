import React from "react";
import { useQuery } from "react-query";
import {
	useCoursesByChannelId,
	useUsersDataByEmail,
} from "../Hooks/useSuperHeroesData";
const DependentQueriesPage = ({ email }) => {
	const { data: usersByEmail } = useUsersDataByEmail(email);
	const channelId = usersByEmail?.channelId;
	console.log("channelId", channelId);

	const { data: coursesByChannelId } = useCoursesByChannelId(channelId);
	console.log("coursesByChannelId", coursesByChannelId);

	return (
		<div>
			{channelId ? (
				<>
					DependentQueriesPage Retrieving User data using email and select all
					its courses where chanelId is equal
					<p>
						The User Email is {email} and his channel Id is <b>{channelId}</b>{" "}
					</p>
					The Courses with this email and channel Id is ,
					<br />
					{coursesByChannelId?.courses?.map((course) => (
						<li key={channelId}>{course} </li>
					))}
				</>
			) : (
				<>
					<p>No Data Found {email}</p>
				</>
			)}
		</div>
	);
};

export default DependentQueriesPage;
