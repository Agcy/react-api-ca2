import React, {useContext, useState} from "react";
import { followActor, unfollowActor } from '../api/tmdb-api';
import {AuthContext} from "./mongoAuthContext"; // 确保正确导入这些函数

export const ActorsContext = React.createContext(null);

export const ActorsProvider = ({ children }) => {
    const [following, setFollowing] = useState([]);
    const { user } = useContext(AuthContext);

    const addToFollowing = async (actor) => {
        try {
            const result = await followActor(user.id, actor.id);
            setFollowing([...following, actor.id]);
        } catch (error) {
            console.error('Error in following actor:', error);
        }
    };

    const removeFromFollowed = async (actor) => {
        try {
            const result = await unfollowActor(user.id, actor.id);
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
