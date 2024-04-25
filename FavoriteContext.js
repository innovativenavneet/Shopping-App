import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (product) => {
        setFavorites(prevFavorites => [...prevFavorites, product]);
    };

    const removeFromFavorites = (productId) => {
        setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId));
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};
