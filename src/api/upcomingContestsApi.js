import apiClient from "./apiClient";

const getUpcomingContests = async () => {
    try{
        const res = await apiClient.get("/upcoming-contests");
        const contests = res.data.data;
        
        contests.sort((a, b) => {
            return new Date(a.start_time) - new Date(b.start_time);
        });

        return contests;
    } catch (error){
        throw new Error(
          "Error while fetching upcoming contests." + error.message
        );
    }
}

export {getUpcomingContests};