import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { object, string } from 'prop-types';
import styled from 'styled-components';
import { __ } from '../../../i18n';

const InfoPopups = ({ cmsHtmlContent, label, positionStyles }) => {
  const StyledPopup = styled(Popup)`
    @keyframes animateModal {
      0% {
        top: -100%;
        background: rgba(119, 119, 119, 0);
      }
      100% {
        top: 0;
        background: rgba(119, 119, 119, 0.6);
      }
    }
    &-overlay {
      background: rgba(119, 119, 119, 0.6);
      animation-name: animateModal;
      animation-duration: 0.5s;
      animation-timing-function: ease-out;
    }
    &-content {
      width: 100%;
    }
    &-content > .modal {
      box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 10px 0px;
      border-radius: 5px;
      padding: 15px 20px;
    }
    &-content .header {
      border-color: #5dba5d;
    }
    &-content .close {
      background: rgb(93, 186, 93);
      height: 21px;
      width: 21px;
      border-radius: 50%;
      position: relative;
      &:after,
      &:before {
        content: '';
        position: absolute;
        top: 9px;
        left: 4px;
        display: block;
        width: 13px;
        height: 3px;
        background: #fff;
      }
      &:after {
        transform: rotate(45deg);
      }
      &:before {
        transform: rotate(135deg);
      }
    }
    &-content .content {
      overflow: auto;
      max-height: 50vh;
    }
  `;
  const [htmlEl, setHtmlContent] = useState(null);
  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  };

  if (!htmlEl && cmsHtmlContent?.content) {
    const decodedHtml = htmlDecode(cmsHtmlContent?.content);
    setHtmlContent(decodedHtml);
  }
  return (
    <StyledPopup
      trigger={
        <button
          type="button"
          className={`text-link text-base ${positionStyles}`}
        >
          {' '}
          {__('more')}
        </button>
      }
      position="right center"
      modal
      nested
    >
      {(close) => (
        <div className="modal w-5/6 bg-white md:w-1/2 mx-auto">
          <div className="header flex justify-between border-b-2 pb-2">
            <div className="text-lg text-green text-old_green-main">
              {' '}
              {label}
            </div>
            {/* eslint-disable */}
            <button type="button" className="close" onClick={close} />
          </div>
          <div className="content p-2 text-md leading-6">
            <div dangerouslySetInnerHTML={{ __html: htmlEl }} />
          </div>
        </div>
      )}
    </StyledPopup>
  );
};

InfoPopups.propTypes = {
  cmsHtmlContent: object,
  label: string,
  positionStyles: string,
};

InfoPopups.defaultProps = {
  cmsHtmlContent: {},
};

export default React.memo(InfoPopups);
