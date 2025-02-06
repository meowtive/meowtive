import React, { ReactNode } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { isAndroid } from '@config/platform';
import FastImage from 'react-native-fast-image';
import { SCREEN_DIMENSIONS } from '@config/constants';
import { restartApp } from '@utils/restartApp';
import { TFunction } from 'i18next';

interface Props {
  children: ReactNode;
  t: TFunction;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <FastImage
            source={require('../../resources/assets/images/favorites-empty-list.png')}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.errorTitle}>{t('errorBoundaryTitle')}</Text>
          <Text style={styles.errorText}>{t('errorBoundaryDescription')}</Text>
          <Text style={styles.errorInstruction}>
            {t('errorBoundaryInstruction')}
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={restartApp}
            activeOpacity={0.7}>
            <Text style={styles.restartButtonText}>
              {t('errorBoundaryButton')}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isAndroid ? 40 : 20,
    backgroundColor: '#FEB261',
  },
  image: {
    width: '100%',
    height: SCREEN_DIMENSIONS.height / 2.5,
    marginTop: 5,
  },
  restartButton: {
    marginTop: 50,
    backgroundColor: '#EF7E06',
    borderRadius: 100,
    width: '70%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorInstruction: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  errorDetails: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
    textAlign: 'center',
  },
});
