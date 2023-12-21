import React, {useContext, useEffect, useState} from "react";
import {
    followActor,
    getUserFavorites,
    getUserFollowedActors,
    getUserMarkedMovies, getUserMovieReviews,
    unfollowActor
} from '../api/tmdb-api';
import {AuthContext} from "./mongoAuthContext"; // 确保正确导入这些函数

export const ActorsContext = React.createContext(null);

export const ActorsProvider = ({ children }) => {
    const [following, setFollowing] = useState([]);
    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(()=>{
        if(!isAuthenticated){
            setFollowing([])

        }else {
            async function getRecord() {
                setFollowing(await getUserFollowedActors(user.id))
            }
            getRecord()
        }
    }, [isAuthenticated])

    const addToFollowing = async (actor) => {
        try {
            await followActor(user.id, actor.id);
            console.log(user.id)
            setFollowing([...following, actor.id]);
        } catch (error) {
            console.error('Error in following actor:', error);
        }
    };

    const updateFollowedActors = async (userId) => {
        const followedActors = await getUserFollowedActors(userId);
        setFollowing(followedActors.map(actor => actor.id)); // 假设返回的是包含 id 的演员对象数组
    };

    const removeFromFollowed = async (actor) => {
        try {
            await unfollowActor(user.id, actor.id);
            setFollowing(following.filter((aId) => aId !== actor.id));
        } catch (error) {
            console.error('Error in unfollowing actor:', error);
        }
    };

    return (
        <ActorsContext.Provider
            value={{
                following,
                addToFollowing,
                removeFromFollowed
            }}>
            {children}
        </ActorsContext.Provider>
    );
};
