import React, { ReactNode } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

import i18next from 'i18next';

import { isAndroid } from '@config/platform';

interface Props {
  children: ReactNode;
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
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorTitle}>
            {i18next.t('errorBoundaryTitle')}
          </Text>
          <Text style={styles.errorText}>
            {i18next.t('errorBoundaryDescription')}
          </Text>
          <Text style={styles.errorInstruction}>
            {i18next.t('errorBoundaryInstruction')}
          </Text>
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
