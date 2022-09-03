import React from 'react';
import axios from 'axios';
import leoProfanity from 'leo-profanity';
import i18next from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-relative-packages
import linksReduser from './slices/statistics-slice';
import locales from './locales/index';
import routes from './routes';
import App from './Components/App';

const InitialState = async () => {
  const i18n = i18next.createInstance();

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  await i18n.use(initReactI18next).init({
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ...locales,
    },
  });

  const store = configureStore({
    reducer: {
      statistics: linksReduser,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios,
          routes,
        },
      },
    }),
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default InitialState;
