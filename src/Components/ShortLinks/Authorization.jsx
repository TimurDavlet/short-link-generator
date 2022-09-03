import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const Authorization = () => {
  const { t } = useTranslation();

  return (
    <Row className="justify-content-center align-content-center h-100 w-100">
      <Card className="col-10 col-md-7 col-lg-6 col-xxl-5 p-0">
        <h2 className="text-center p-4">{t('forms.authorization.title')}</h2>
        <Card.Body className="mb-4 row justify-content-center">
          <LoginForm />
        </Card.Body>
        <Card.Footer>
          <p className="text-center">
            <span>{`${t('forms.authorization.footerText')} `}</span>
            <Link to="/signup">{t('forms.authorization.link')}</Link>
          </p>
        </Card.Footer>
      </Card>
    </Row>
  );
};

export default Authorization;
