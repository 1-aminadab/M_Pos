
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import realm from '../../../database';
import CustomModal from '../../../components/modal/CustomModal';
import AddStore from './Storemgt/AddStore';
import { color } from '../../../styles/Styles';
import {Iconify} from 'react-native-iconify';
import { getStore } from '../../../database/services/StoreMgtServices/StoreMgtServices';
// Styled Components can be used for improved styling
// Import styled from 'styled-components/native';

// Constants for icons
const ICONS = {
  TRASH: 'trash-can-outline',
  PLUS: 'plus',
  PENCIL: 'pencil-outline',
};

// Prop types for ConfigHeaders component
ConfigHeaders.propTypes = {
  Title: PropTypes.string.isRequired,
  OnPressDelete: PropTypes.func.isRequired,
  OnPressAdd: PropTypes.func.isRequired,
};

// TableHeader component
const TableHeader = ({ cells }) => {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: color.deepLightGray, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'space-between', marginBottom: 10, backgroundColor: color.lightSecondary, padding: 15 }}>
      {cells.map((cell, index) => (
        <Text key={index} style={{ fontSize: 16, color: color.Neutral_30, fontWeight: 700, fontFamily: 'Nunito' }}>{cell}</Text>
      ))}
    </View>
  );
};

// ConfigHeaders component
function ConfigHeaders({ Title, OnPressDelete, OnPressAdd }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Nunito', color: '#2E2B3E' }}>{Title}</Text>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <TouchableOpacity onPress={OnPressDelete}>
          <Icon name={ICONS.TRASH} size={30} color={color.Neutral_70} />
        </TouchableOpacity>

        <TouchableOpacity onPress={OnPressAdd} style={{ padding: 5, backgroundColor: color.primary, borderRadius: 6 }}>
          <Icon name={ICONS.PLUS} size={20} color={color.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// StoreManagement component
const StoreManagement = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalVisibleStore, setModalVisibleStore] = useState(false);
  const [data, setData] = useState([]);
   const [isEditModalVisible, setEditModalVisible] = useState(false); // Step 3
  const [editItemId, setEditItemId] = useState(null);

  const toggleCheckbox = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleAddStore = () => {
    setModalVisibleStore(!isModalVisibleStore);
  };

   const handleEdit = (id) => {
    setEditItemId(id); // Step 2
    setEditModalVisible(!isEditModalVisible); // Step 3
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      Alert.alert('No Items Selected', 'Please select items to delete.');
      return;
    }

    realm.write(() => {
      selectedIds.forEach((id) => {
        const itemToDelete = realm.objectForPrimaryKey('StoreManagement', id);
        realm.delete(itemToDelete);
      });
    });

    setData((prevData) =>
      prevData.filter((item) => !selectedIds.includes(item.id))
    );

    setSelectedIds([]);
  };

  useEffect(() => { 
    const filteredResults = realm.objects('StoreManagement');
    setData(filteredResults);
  }, []);

  const tableHeaderCellsStore = ['Store', 'Licenses', 'Address', ''];

  return (
    <View>
      <ConfigHeaders
        Title='Store Management'
        OnPressAdd={handleAddStore}
        OnPressDelete={handleDelete}
      />
      <View style={{ borderWidth: 1, borderRadius: 10, borderColor: color.deepLightGray }}>
        <TableHeader cells={tableHeaderCellsStore} />
        {data.length > 0 && data.map((item) => (
          <View key={item.id} style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.8, borderBottomColor: color.deepLightGray, paddingVertical: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              {/* <TouchableOpacity onPress={() => toggleCheckbox(item.id)}>
                <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 5, borderColor: color.gray }} />
              </TouchableOpacity> */}

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
            <Text>{item.license}</Text>
            <Text>{item.address}</Text>
            <TouchableOpacity onPress={() => handleEdit(item.id)} style={{ alignItems: 'center' }}>
              <Icon name={ICONS.PENCIL} size={20} color={color.Neutral_70} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <CustomModal
        modalVisibility={isModalVisibleStore}
        setModalVisibility={setModalVisibleStore}
        innerModal={<AddStore handleSetStore={()=>setModalVisibleStore(false)} />}
      />

        {isEditModalVisible && (
        <CustomModal
          modalVisibility={isEditModalVisible}
          setModalVisibility={setEditModalVisible}
          innerModal={<AddStore itemId={editItemId} onClose={setEditModalVisible} handleSetStore={()=>setEditModalVisible(false)}/>} // Pass itemId to the edit modal
        />
      )}
    </View>
  );
};

export default StoreManagement;
