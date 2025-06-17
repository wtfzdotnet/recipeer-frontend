import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { LocaleProvider } from '../providers/LocaleProvider';

// Test wrapper component that provides i18n and locale context
export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleProvider defaultLocale="en-US">
        {children}
      </LocaleProvider>
    </I18nextProvider>
  );
}