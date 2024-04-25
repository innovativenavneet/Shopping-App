import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const NavBar = ({ onPressFavorites }) => {
    return (
        <View style={styles.navBar}>
            <Text>Favourates :: </Text>
            <TouchableOpacity onPress={onPressFavorites}>
                <Ionicons name="heart-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        const URL = "https://dummyjson.com/products";
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
            })
            .catch((error) => {
                console.error("Error fetching products: ", error);
            });
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
                <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={24} color="#ff0000" />
            </TouchableOpacity>
        </View>
    );

    const navigateToFavorites = (data) => {
        navigation.navigate('Favorites', { payload: data });
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavBar onPressFavorites={() => navigateToFavorites(products)} />
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            />
            <Button title="Go to Favorites" onPress={() => navigateToFavorites(products)} />
        </SafeAreaView>
    );
};

const FavoritesScreen = ({ route }) => {
    const { payload } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Text>Favorites Screen</Text>
            <Text>{JSON.stringify(payload)}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    productContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    navBar: {
        backgroundColor: '#333 ',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default HomeScreen;
