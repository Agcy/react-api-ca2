import React, { useState } from "react";

export const ActorsContext = React.createContext(null);

export const ActorsProvider = ({ children }) => {
    const [following, setFollowing] = useState([]);

    const addToFollowing = (actor) => {
        let newFollow = [];
        if (!following.includes(actor.id)){
            newFollow = [...following, actor.id];
        }
        else{
            newFollow = [...following];
        }
        setFollowing(newFollow)
    };

    const removeFromFollowed= (actor) => {
        setFollowing( following.filter(
            (aId) => aId !== actor.id
        ) )
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
