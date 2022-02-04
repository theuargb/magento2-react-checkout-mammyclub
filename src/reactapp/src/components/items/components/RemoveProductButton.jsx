import React, { useState } from 'react';
import { string, func } from 'prop-types';
import { formikDataShape } from '../../../utils/propTypes';

function RemoveProductButton({
  name,
  className,
  handleRemoveProductClick,
  formikData,
}) {
  const { setFieldValue, setFieldTouched } = formikData;

  const [event, setEvent] = useState('');
  React.useEffect(() => {
    if (event) {
      handleRemoveProductClick(event);
    }
  }, [event]);

  const clickHandler = (e) => {
    const newValue = e.target.value;
    setFieldTouched(name, newValue);
    setFieldValue(name, newValue);
    setEvent(e);
  };

  return (
    <button
      value={0}
      onClick={clickHandler}
      name={name}
      type="submit"
      className={className}
      formikData={formikData}
    >
      x
    </button>
  );
}
RemoveProductButton.propTypes = {
  className: string,
  name: string.isRequired,
  formikData: formikDataShape.isRequired,
  handleRemoveProductClick: func.isRequired,
};

RemoveProductButton.defaultProps = {
  className: '',
};
export default RemoveProductButton;
