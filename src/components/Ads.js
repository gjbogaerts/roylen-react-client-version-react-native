import React from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, ListItem } from 'react-native-elements';
import { colors } from '../styles/styles';

const Ads = ({
  ads,
  onDeletePressed,
  message,
  showDelete,
  getAd,
  removeOverlay
}) => {
  const renderAd = item => {
    const deleteAd = () => {
      Alert.alert('Delete ad?', 'Are you sure you want to delete this ad?', [
        {
          text: 'Cancel',
          style: 'cancel'
          // onPress: () => console.log('cancel pressed')
        },
        {
          text: 'Yes, delete this item',
          onPress: () => {
            onDeletePressed(item);
          }
        }
      ]);
    };

    const renderListItem = () => {
      return (
        <ListItem
          title={item.title}
          bottomDivider
          subtitle={item.description}
          rightElement={
            showDelete ? (
              <TouchableOpacity onPress={deleteAd}>
                <Ionicons name="ios-trash" size={25} color={colors.color} />
              </TouchableOpacity>
            ) : null
          }
        />
      );
    };

    return !showDelete ? (
      <TouchableOpacity
        onPress={() => {
          removeOverlay();
          getAd(item._id, item.title);
        }}
      >
        {renderListItem()}
      </TouchableOpacity>
    ) : (
      renderListItem()
    );
  };
  return (
    <View>
      {message ? <Text>{message}</Text> : null}
      <FlatList
        data={ads}
        keyExtractor={item => item._id}
        renderItem={({ item }) => renderAd(item)}
      />
    </View>
  );
};

export default Ads;
