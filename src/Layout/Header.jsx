import React, { useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { logOut, loggedIn } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <Navbar bg="light" expand="lg" className="border">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('header.title')}
        </Navbar.Brand>
        {loggedIn && (
          <Button as={Link} to="/" variant="info" onClick={logOut}>
            {t('header.logOutBtn')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
