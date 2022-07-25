import React from 'react';
import { i18n } from '../../services';

export default function FooterComponent() {
  return <footer className="footer">{i18n.translate('footer.title')}</footer>;
}
