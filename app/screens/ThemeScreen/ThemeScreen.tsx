import { SafeAreaView, View } from 'react-native';

import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './styles';

export const ThemeScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        
      </View>
    </SafeAreaView>
  );
};
