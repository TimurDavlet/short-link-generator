import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchUserById } from '../../slices/statistics-slice';
import Table from './Table';
import ShortForm from './ShortLinkForm';

export default function Statistics() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const firstLoad = async () => {
      try {
        await dispatch(fetchUserById());
        setFetching(false);
      } catch (error) {
        toast.error(t('networkError'));
      }
    };

    firstLoad();
  }, [dispatch, t]);

  return (
    fetching ? <Spinner className="align-self-center" animation="border" variant="info" />
      : (
        <><div className='h-100 d-flex flex-column'><ShortForm /></div><div className='h-100 d-flex flex-column'><Table /></div></>
      )
  );
}