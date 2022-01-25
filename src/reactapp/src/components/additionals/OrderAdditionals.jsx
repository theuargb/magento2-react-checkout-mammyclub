import React, { useMemo } from 'react';
import { node } from 'prop-types';
import { ADDITIONALS_FORM } from '../../config';
import OrderAdditionalsForm from './components/OrderAdditionalsForm';
import OrderAdditionalsFormikProvider from './OrderAdditionalsFormikProvider';
import useFormikMemorizer from '../../hook/useFormikMemorizer';

const OrderAdditionals = ({ children }) => {
  const sectionFormikData = useFormikMemorizer(ADDITIONALS_FORM);
  const { formSectionValues, isFormSectionTouched } = sectionFormikData;
  const additionalsFormikData = useMemo(
    () => ({
      ...sectionFormikData,
      additionalValues: formSectionValues,
    }),
    [sectionFormikData, formSectionValues, isFormSectionTouched]
  );
  return (
    <OrderAdditionalsFormikProvider formikData={additionalsFormikData}>
      <OrderAdditionalsForm formikData={additionalsFormikData}>
        {children}
      </OrderAdditionalsForm>
    </OrderAdditionalsFormikProvider>
  );
};

OrderAdditionals.propTypes = {
  children: node.isRequired,
};

export default OrderAdditionals;
