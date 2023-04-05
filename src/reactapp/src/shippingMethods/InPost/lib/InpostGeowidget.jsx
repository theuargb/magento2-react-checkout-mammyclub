import { bool, func, string } from 'prop-types';
import React, { useEffect, useCallback } from 'react';

const inpostStaticUrl = {
  sandbox: 'https://sandbox-easy-geowidget-sdk.easypack24.net',
  live: 'https://geowidget.inpost.pl',
};

export const InpostGeowidget = ({
  token,
  onPoint,
  language = 'pl',
  config = 'parcelCollect',
  sandbox = true,
}) => {
  const callback = useCallback(((e) => onPoint(e), [onPoint]))[0];

  useEffect(() => {
    const css = document.createElement('link');
    const js = document.createElement('script');
    const body = document.getElementsByTagName('body')[0];

    css.rel = 'stylesheet';
    css.type = 'text/css';
    js.defer = true;
    css.href = `${
      inpostStaticUrl[sandbox ? 'sandbox' : 'live']
    }/inpost-geowidget.css`;

    js.src = `${
      inpostStaticUrl[sandbox ? 'sandbox' : 'live']
    }/inpost-geowidget.js`;

    body.appendChild(css);
    body.appendChild(js);
  }, []);

  useEffect(() => {
    window.onPoint = callback;
  }, [callback]);

  const html = `<inpost-geowidget
                  token=${token}                
                  language=${language}
                  config=${config}
                  onpoint="onPoint"
                />`;
  return (
    <div
      style={{ height: '500px' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

InpostGeowidget.propTypes = {
  token: string.isRequired,
  onPoint: func.isRequired,
  language: string,
  config: string,
  sandbox: bool,
};

InpostGeowidget.defaultProps = {
  language: 'pl',
  config: 'parcelCollect',
  sandbox: true,
};

export default InpostGeowidget;
