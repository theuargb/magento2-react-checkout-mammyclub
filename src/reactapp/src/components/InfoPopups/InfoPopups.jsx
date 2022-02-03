import React from 'react';
import Popup from 'reactjs-popup';
import { string } from 'prop-types';
import styled from 'styled-components';
import { __ } from '../../i18n';

const InfoPopups = ({ linkToCMSBlock, label, positionStyles }) => {
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
  `;

  let htmlEl = '';

  const setHtmlContent = (data) => {
    htmlEl = data.content;
  };
  if (!htmlEl) {
    console.log('fetch');
    fetch(`${linkToCMSBlock}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 6gn2y2np87chqd6zb7sjuphsluy3oq77',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        setHtmlContent(response);
      } else {
        htmlEl = 'Не удалось загрузить данные';
        throw new Error('Something went wrong');
      }
    });
  }

  return (
    <StyledPopup
      trigger={
        <button
          type="button"
          className={`text-link text-base ${positionStyles}`}
        >
          {' '}
          {__('подробнее')}
        </button>
      }
      position="right center"
      modal
      nested
    >
      {(close) => (
        <div className="modal w-5/6 bg-white md:w-1/2 mx-auto">
          <div className="header flex justify-between border-b-2 pb-2">
            <div className="text-xlg text-green"> {label}</div>
            {/* eslint-disable */}
            <button type="button" className="close" onClick={close} />
          </div>
          <div className="content p-2 text-md leading-6">{htmlEl}</div>
        </div>
      )}
    </StyledPopup>
  );
};

InfoPopups.propTypes = {
  linkToCMSBlock: string,
  label: string,
  positionStyles: string,
};

InfoPopups.defaultProps = {
  linkToCMSBlock: '',
  label: '',
  positionStyles: '',
};

export default InfoPopups;
