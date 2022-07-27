import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { i18n } from '../../services';
import { setLang } from '../../services/translate.service';
import { AuthConstants, logoutAction } from '../../redux/auth';
import { StoreStateInterface } from '../../redux/store';

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state: StoreStateInterface) => state.auth);
  const nextLang = userAuth.lang === 'en' ? 'hr' : 'en';

  function onLangChange() {
    setLang(nextLang);
    dispatch({ type: AuthConstants.SET_LANG, payload: nextLang });
  }

  function onLogOut() {
    dispatch(logoutAction());
  }

  return (
    <header className="header">
      <h1>{i18n.translate('header.title')}</h1>
      <div className='btnContainer'>
        <Button onClick={onLangChange}>{nextLang}</Button>
        <Button type="primary" onClick={onLogOut}>{i18n.translate(`dashboard.logoutBtn`)}</Button>
      </div>
    </header>
  );
}
