import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
};

type CartItem = {
  qty: number;
  product: Product;
};

const products: Product[] = [
  { id: '1', name: 'Protein Bar', price: 60 },
  { id: '2', name: 'Whey Protein', price: 1200 },
  { id: '3', name: 'Yoga Mat', price: 700 },
];

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  const increaseQty = (productId: string) => {
    // TODO: increase quantity for product
    const product = products.find((p)=>productId===p.id)
    if (!product) return
    // check in cart if product exists
    console.log('cart map',cart);
    setCart(prevCart=>{
        const prevItem = prevCart[productId]
        if (!prevItem) {
            return {
                ...prevCart,
                [productId]: {qty: 1 , product}
            }
        }
        return {
            ...prevCart,
            [productId]: {qty: prevItem.qty + 1, product: prevItem.product}
        }

    })

// console.log('product',product);
  };


console.log('cart final',cart);
  const decreaseQty = (productId: string) => {
    // TODO: decrease quantity for product
    setCart(prevCart=>{
        const prevItem = prevCart[productId]
        if (!prevItem) {
            return prevCart
        }
        if (prevItem.qty === 0) return prevCart
        return {
            ...prevCart,
            [productId]: {qty: prevItem.qty - 1, product: prevItem.product}
        }

    })
  };

  const totalPrice = useMemo(() => {
    // TODO: compute total price
    return 0;
  }, [cart]);

  const totalItems = useMemo(() => {
    // TODO: compute total quantity
    return 0;
  }, [cart]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ margin: 10, padding: 10, borderWidth: 1 }}>
      <Text>{item.name}</Text>
      <Text>₹{item.price}</Text>
      <View style={{ flexDirection: 'row', gap: 10, alignItems:'center' }}>
        <Button title="➖" onPress={() => decreaseQty(item.id)} />
        <Text>{cart[item.id]?.qty || 0}</Text>
        <Button title="➕" onPress={() => increaseQty(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={{ padding: 20 }}>
        <Text>Total Items: {totalItems}</Text>
        <Text>Total Price: ₹{totalPrice}</Text>
      </View>
    </View>
  );
};

export default ShoppingCart;
