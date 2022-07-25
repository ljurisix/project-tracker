import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { i18n, logoutAction } from '../../../common';

function DashboardPageComponent() {
  const dispatch = useDispatch();

  function onLogOutBtnClick() {
    dispatch(logoutAction());
  }

  return (
    <div className="center-center w100-h100">
      {i18n.translate('dashboard.title')}
      <Button onClick={onLogOutBtnClick}>{i18n.translate('dashboard.logoutBtn')}</Button>
    </div>
  );
}

export default DashboardPageComponent;
