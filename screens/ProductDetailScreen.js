import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [productId]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>Price: ${product.price}</Text>
                <Text style={styles.discount}>Discount: {product.discountPercentage}% off</Text>
                <Text style={styles.rating}>Rating: {product.rating}</Text>
                <Text style={styles.stock}>Stock: {product.stock}</Text>
                <Text style={styles.brand}>Brand: {product.brand}</Text>
                <Text style={styles.category}>Category: {product.category}</Text>
                <Text style={styles.id}>Product ID: {product.id}</Text>
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteContainer}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "black"} />
                </TouchableOpacity>
                <ScrollView horizontal>
                    {product.images.map((image, index) => (
                        <Image key={index} source={{ uri: image }} style={styles.image} />
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    thumbnail: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        marginBottom: 5,
    },
    discount: {
        fontSize: 16,
        marginBottom: 5,
    },
    rating: {
        fontSize: 16,
        marginBottom: 5,
    },
    stock: {
        fontSize: 16,
        marginBottom: 5,
    },
    brand: {
        fontSize: 16,
        marginBottom: 5,
    },
    category: {
        fontSize: 16,
        marginBottom: 5,
    },
    id: {
        fontSize: 16,
        marginBottom: 5,
    },
    favoriteContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default ProductDetailScreen;
