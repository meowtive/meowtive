import { createContext } from 'react';

type OnboardingContextType = {
  isOnboardingComplete: boolean;
  setIsOnboardingComplete: (value: boolean) => void;
};

export const OnboardingContext = createContext<OnboardingContextType>({
  isOnboardingComplete: false,
  setIsOnboardingComplete: () => {},
});
