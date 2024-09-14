// ProductCard.js

import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../../styles/Styles';

const ProductCard = ({product}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState('Gray');
  const [isFavorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!isFavorite);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addToCart = () => {
    // Add the selected item to the cart array
    // You can use a state management solution like Redux or Context API
    // to manage the cart state across components
    console.log('Added to cart:', {...product, quantity, selectedType});
    toggleModal();
  };

  return (
    <View style={{margin:5, borderRadius: 10}}>
      <View style={{position:"relative"}}>
        <TouchableOpacity  style={{position:"absolute",padding:3,borderTopLeftRadius:10,backgroundColor:color.lightPrimary,zIndex:1,bottom:0, right:0}} onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? 'star' : 'star-outline'}
            size={30}
            color={isFavorite ? 'green' : 'green'}
          />
        </TouchableOpacity>
        <Image
          source={{uri: product.image}}
          style={{
            width: '100%',
            height: 100,
            resizeMode: 'cover',
            borderRadius: 8,
          }}
        />
      </View>

      <Text style={{fontWeight: 'bold', marginTop: 5}}>{product.name}</Text>
      <View style={{flexDirection:"row",alignItems:"center"}}>
        <Text>{product.price} </Text>
       <Text style={{color:color.deepLightGray,fontSize:10}}>ETB</Text>
      </View>
      
      <Text style={{color: product.stock ? 'green' : 'red'}}>
        {product.stock ? 'In Stock' : 'Out of Stock'}
      </Text>

      <TouchableOpacity style={{backgroundColor:product.stock ?color.secondary : color.deepLightGray,borderRadius:10,justifyContent:"center",padding:7, flexDirection:"row",gap:3}} onPress={product.stock ?toggleModal : null}>
     
        <Text style={{color: product.stock ?color.white : color.lightGray, fontWeight:"bold"}}>Add to</Text>
         <Icon name="cart-outline" size={24} color={ product.stock ?color.white : color.lightGray} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text>Select Product Type:</Text>
            {/* Render product types here, for example: */}
            <TouchableOpacity onPress={() => setSelectedType('Gray')}>
              <Text>{'Gray'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedType('Black')}>
              <Text>{'Black'}</Text>
            </TouchableOpacity>

            {/* ... other product types ... */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Text style={{fontSize: 20}}>-</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={{fontSize: 20}}>+</Text>
              </TouchableOpacity>
            </View>

            <Button title="Done" onPress={addToCart} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductCard;
