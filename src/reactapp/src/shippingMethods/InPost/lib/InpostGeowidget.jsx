/* eslint-disable */
import React, { useEffect, useCallback } from 'react';

export const InpostGeowidget = ({
  token,
  onPoint,
  language = 'pl',
  config = 'parcelCollect',
}) => {
  const callback = useCallback(((e) => onPoint(e), [onPoint]))[0];

  useEffect(() => {
    const css = document.createElement('link'),
      js = document.createElement('script'),
      body = document.getElementsByTagName('body')[0];

    css.rel = 'stylesheet';
    css.href =
      'https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.css';
    // css.href = 'https://geowidget.inpost.pl/inpost-geowidget.css';
    css.type = 'text/css';

    js.defer = true;
    js.src =
      'https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js';
    // js.src = 'https://geowidget.inpost.pl/inpost-geowidget.js';

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
