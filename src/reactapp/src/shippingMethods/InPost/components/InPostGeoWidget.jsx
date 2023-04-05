import React from 'react';
import { func } from 'prop-types';
import { InpostGeowidget } from '../lib/InpostGeowidget';

import RootElement from '../../../utils/rootElement';
import { __ } from '../../../i18n';

function InPostGeoWidget({ onPointCallback }) {
  const inpostMethodConfig = RootElement?.getInpostMethodConfig();
  if (!inpostMethodConfig) {
    return (
      <div>
        <div className="-mt-1 border-container-lightner border-2 mb-2 border-t-0 p-1">
          <p className="text-gray my-2 text-base">
            {__(
              'InPost delivery is not configured, check the token for geowidget in the settings'
            )}
          </p>
        </div>
      </div>
    );
  }
  const { public_api_key: token, sandbox } = inpostMethodConfig;
  return (
    <InpostGeowidget
      token={token}
      onPoint={onPointCallback}
      sandbox={sandbox}
    />
  );
}

InPostGeoWidget.propTypes = {
  onPointCallback: func.isRequired,
};

export default InPostGeoWidget;
