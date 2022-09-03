import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button, Card, Form, Row,
} from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

const LoginForm = () => {
  const { t } = useTranslation();
  const [authErrors, setAuthError] = useState('');
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputEl = useRef();
  const fromPath = location.state?.from?.pathname || '/';

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('forms.registration.minName'))
      .max(20, t('forms.registration.maxName'))
      .required(t('forms.requiredName')),
    password: yup
      .string()
      .min(6, t('forms.registration.minPassword'))
      .required(t('forms.requiredPassword')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('forms.registration.notMatchPassword'))
      .required(t('forms.requiredPassword')),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: async ({ username, password }) => {
      try {
        await axios.post(routes.registrPath(username, password), {
          headers: {
            accept: 'application/json',
          },
        });
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
          url: routes.loginPath(),
        };
        const request = await axios(options);
        setAuthError('');
        logIn();
        localStorage.setItem('userId', JSON.stringify({ ...request.data }));
        navigate(fromPath);
      } catch (error) {
        if (error.response.status === 400) {
          setAuthError(t('forms.registration.existUser'));
        } else {
          setAuthError(t('forms.errorNetwork'));
        }
      }
    },
  });

  return (
    <Row className="justify-content-center align-content-center h-100 w-100">
      <Card className="col-10 col-md-7 col-lg-6 col-xxl-5">
        <h2 className="text-center p-4">{t('forms.registration.title')}</h2>
        <Card.Body className="mb-4 row justify-content-center">
          <Form onSubmit={formik.handleSubmit} className="w-75">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">
                {t('forms.registration.username')}
              </Form.Label>
              <Form.Control
                id="username"
                name="username"
                type="text"
                placeholder="..."
                ref={inputEl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                isInvalid={
                  (formik.touched.username && formik.errors.username) || authErrors
                }
              />
              {authErrors ? (
                ''
              ) : (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">{t('forms.password')}</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={
                  (formik.touched.password && formik.errors.password) || authErrors
                }
              />
              {authErrors ? (
                ''
              ) : (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">
                {t('forms.registration.confirmPassword')}
              </Form.Label>
              <Form.Control
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                isInvalid={
                  (formik.touched.confirmPassword && formik.errors.confirmPassword) || authErrors
                }
              />
              {authErrors ? (
                <Form.Control.Feedback type="invalid">
                  {authErrors}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button variant="info" type="submit" className="ms-auto">
              {t('forms.registration.button')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default LoginForm;
