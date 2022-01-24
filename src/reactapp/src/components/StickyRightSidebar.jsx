import React from 'react';
import { node } from 'prop-types';

import useAppContext from '../hook/useAppContext';

function StickyRightSidebar({ children }) {
  const { message } = useAppContext();

  return (
    <div
      className="sticky self-start w-full lg:w-1/2 border border-container"
      style={{ top: message ? '100px' : '0px' }}
    >
      <div className="">{children}</div>
    </div>
  );
}

StickyRightSidebar.propTypes = {
  children: node.isRequired,
};

export default StickyRightSidebar;
