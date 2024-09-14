import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCategory from './AddCategory';
import realm from '../../../../database';
import CustomModal from '../../../../components/modal/CustomModal';
import {color} from '../../../../styles/Styles';
import {Iconify} from 'react-native-iconify';

const ICONS = {
  TRASH: 'trash-can-outline',
  PLUS: 'plus',
  PENCIL: 'pencil-outline',
};

const TableHeader = ({cells}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: color.deepLightGray,
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: color.lightSecondary,
        padding: 15,
      }}>
      {cells.map((cell, index) => (
        <Text
          key={index}
          style={{
            fontSize: 16,
            color: color.Neutral_30,
            fontWeight: 700,
            fontFamily: 'Nunito',
          }}>
          {cell}
        </Text>
      ))}
    </View>
  );
};

const ConfigHeaders = ({Title, OnPressDelete, OnPressAdd}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          fontFamily: 'Nunito',
          color: '#2E2B3E',
        }}>
        {Title}
      </Text>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <TouchableOpacity onPress={OnPressDelete}>
          <Icon name="trash-can-outline" size={30} color={color.Neutral_70} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={OnPressAdd}
          style={{padding: 5, backgroundColor: color.primary, borderRadius: 6}}>
          <Icon name="plus" size={20} color={color.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CategoryList = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalVisibleStore, setModalVisibleStore] = useState(false);
  const [data, setData] = useState();

  const toggleCheckbox = id => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(selectedId => selectedId !== id)
        : [...prevSelectedIds, id],
    );
  };

  const handleAddCategory = () => {
    setModalVisibleStore(!isModalVisibleStore);
  };

  //   const handleAddStore = () => {
  //     setModalVisibleStore(!isModalVisibleStore);
  //   };

  const handleEdit = id => {
    // Implement your edit logic here
    console.log('Edit button pressed' + id);
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      Alert.alert('No Items Selected', 'Please select items to delete.');
      return;
    }

    // Perform deletion in the Realm database
    realm.write(() => {
      selectedIds.forEach(id => {
        const itemToDelete = realm.objectForPrimaryKey('Category', id);
        realm.delete(itemToDelete);
      });
    });

    // Update the state to reflect the changes in your UI
    setData(prevData =>
      prevData.filter(item => !selectedIds.includes(item.id)),
    );
    // Clear the selectedIds after deletion
    setSelectedIds([]);
  };

  useEffect(() => {
    const filteredResults = realm.objects('Category');
    setData(filteredResults);
  }, []);

  const tableHeaderCellsStore = ['Category', ''];
console.log(data)
  return (
    <View>
      <ConfigHeaders
        Title="Product Categories"
        OnPressAdd={handleAddCategory}
        OnPressDelete={handleDelete}
      />
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: color.deepLightGray,
        }}>
        {/* Table Header */}
        <TableHeader cells={tableHeaderCellsStore} />
        {/* Table Data */}
        {data?.length >= 0 &&
          data?.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 0.8,
                borderBottomColor: color.deepLightGray,
                paddingVertical: 12,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <TouchableOpacity
                  onPress={() => toggleCheckbox(item.id)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontWeight: '600',
                  }}>
                  <View
                    style={{
                      padding: 2,
                      width: 25,
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: selectedIds.includes(item.id)
                        ? color.primary
                        : color.white,
                      borderWidth: 2,
                      borderColor: color.outline,
                      borderRadius: 5,
                    }}>
                    {selectedIds.includes(item.id) && (
                      <Iconify
                        icon="charm:tick"
                        size={20}
                        color={color.white}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <Text>{item.name}</Text>
              </View>

              <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                style={{alignItems: 'center'}}>
                <Icon name={ICONS.PENCIL} size={20} color={color.Neutral_70} />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <CustomModal
        modalVisibility={isModalVisibleStore}
        setModalVisibility={setModalVisibleStore}
        innerModal={<AddCategory />}
      />
    </View>
  );
};

export default CategoryList;
