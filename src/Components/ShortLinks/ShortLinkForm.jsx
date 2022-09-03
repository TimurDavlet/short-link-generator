import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button, Card, Form, Row,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { useDispatch } from 'react-redux';
import { addSqueeze } from '../../slices/statistics-slice';

const ShortForm = () => {
  const { t } = useTranslation();
  const [squeezeErrors, setSqueezeError] = useState('');
  const [shortLink, setShortLink] = useState('');
  const inputEl = useRef();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    link: yup
      .string()
      .url(t('forms.registration.validUrl'))
      .min(7, t('forms.registration.minName'))
      .required(t('forms.squeeze.requiredName')),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      link: '',
    },
    validationSchema: schema,
    onSubmit: async ({ link }) => {
      try {
        const userId = localStorage.getItem('userId');
        const { access_token } = JSON.parse(userId);
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${access_token}` },
            url: routes.squeeze(link),
          };
        const request = await axios(options);
        setSqueezeError('');
        console.log('запрос короткой ссылки')
        console.log(request.data)
        dispatch(addSqueeze(request.data))
        setShortLink(`${routes.apiPath()}/s/${request.data.short}`);
        console.log('disp otrabotal')
      } catch (error) {
        if (error.response.status === 422) {
          setSqueezeError(t('forms.squeeze.validation'));
        } else {
          setSqueezeError(t('errorNetwork'));
        }
      }
    },
  });

  return (
    <Row className="justify-content-center align-content-center h-100 w-100">
      <div className="col-10">
        <h2 className="text-center p-4">{t('forms.squeeze.generate')}</h2>
        <Card.Body className="mb-4 row justify-content-center">
          <Form onSubmit={formik.handleSubmit} className="w-75">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="link">
                {t('forms.squeeze.name')}
              </Form.Label>
              <Form.Control
                id="link"
                name="link"
                type="text"
                placeholder="..."
                ref={inputEl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.link}
                isInvalid={
                  (formik.touched.link && formik.errors.link) || squeezeErrors
                }
              />
              {squeezeErrors ? (
                ''
              ) : (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.link}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="info" type="submit" className="ms-auto">
              {t('forms.squeeze.butname')}
            </Button>
          </Form>
          <div className="text-center p-4">
            {shortLink.length > 0 && <p className="p-4">{t('forms.squeeze.shortLink')}: {shortLink}</p>}
            {shortLink.length > 0 && <Button variant="info" type="submit" className="ms-auto" onClick={() => {navigator.clipboard.writeText(shortLink)}}>
              {t('forms.squeeze.copy')}
            </Button>}
          </div>
        </Card.Body>
      </div>
    </Row>
  );
};

export default ShortForm;