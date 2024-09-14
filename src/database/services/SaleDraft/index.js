import realm from '../../index';

export const getSaleDraft = () => {
  const draft = realm.objects('Sale_Draft');
  return draft;
};

export const createSaleDraft = draftData => {
  realm.write(() => {
    realm.create('Sale_Draft', draftData);
  });
};

export const deleteSaleDraft = draftID => {
  realm.write(() => {
    const draft = realm.objectForPrimaryKey('Sale_Draft', draftID);
    if (draft) {
      realm.delete(draft);
    }
  });
};

export const deleteAllDrafts = () => {
  return new Promise((resolve, reject) => {
    realm.write(() => {
      const draft = realm.objects('Sale_Draft');
      realm.delete(draft);
      resolve();
    });
  });
};
