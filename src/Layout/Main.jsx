import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Authorization from '../Components/ShortLinks/Authorization';
import NotFoundPage from '../Components/ShortLinks/NotFoundPage';
import AuthRequire from '../hoc/AuthRequire';
import Home from '../Components/ShortLinks/Home';
import Registration from '../Components/ShortLinks/Registration';
import AuthRegistration from '../hoc/AuthRegistration';

const Main = () => (
  <Container className="h-100 m-3 overflow-hidden align-self-center justify-content-center ">
    <Routes>
      <Route
        path="/"
        element={(
          <AuthRequire>
            <Home />
          </AuthRequire>
        )}
      />
      <Route path="/login" element={<Authorization />} />
      <Route
        path="/signup"
        element={(
          <AuthRegistration>
            <Registration />
          </AuthRegistration>
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Container>
);

export default Main;
