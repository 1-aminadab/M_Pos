import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

export default function DrawerExample() {
  const [open, setOpen] = React.useState(true);

  return (
    

   
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}
    >
      <Button
        onPress={() => setOpen((prevOpen) => !prevOpen)}
        title={`${open ? 'Close' : 'Open'} drawer`}
      />
    </Drawer>
  
  );
}