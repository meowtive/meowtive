import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

type FavoritesOptionsMenuProps = {
  onDelete: () => void;
};

export const FavoritesOptionsMenu = ({
  onDelete,
}: FavoritesOptionsMenuProps) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#000000"
            size={22}
          />
        </TouchableOpacity>
      }>
      <Menu.Item
        onPress={() => {
          closeMenu();
          onDelete();
        }}
        title={t('delete')}
      />
      <Divider />
      <Menu.Item onPress={closeMenu} title={t('cancel')} />
    </Menu>
  );
};
