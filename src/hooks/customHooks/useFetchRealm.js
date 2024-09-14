import React, {useState, useEffect} from 'react';
import realm from '../../database/index';
import {useFocusEffect} from '@react-navigation/native';
const useFetchRealm = ({uri, id}) => {
  const [data, setData] = useState();
  const [pending, setPending] = useState(true);
  useEffect(() => {
    const d = id
      ? realm.objects(uri).filtered(`_id == ${id}`)[0]
      : realm.objects(uri);
    setData(d);
  }, []);
  useEffect(() => setPending(false), [data]);
  useFocusEffect(
    React.useCallback(() => {
      const d = id
        ? realm.objects(uri).filtered(`_id == ${id}`)[0]
        : realm.objects(uri);
      setData(d);
      //  console.log("hi");

      return () => setData(d);
    }, []),
  );

  return {data, pending};
};
export default useFetchRealm;
