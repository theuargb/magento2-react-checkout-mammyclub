import React, { useCallback } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { formikDataShape } from '../../utils/propTypes';
import { ADDITIONALS_FORM } from '../../config';
import useFormSection from '../../hook/useFormSection';
import useEnterActionInForm from '../../hook/useEnterActionInForm';
import OrderAdditionalsFormikContext from './context/OrderAdditionalsFormikContext';

const initialValues = {
  orderComment: '',
};

function OrderAdditionalsFormikProvider({ children, formikData }) {
  const { setFieldValue, setFieldTouched } = formikData;

  const resetAdditionalsFormFields = useCallback(() => {
    setFieldValue(ADDITIONALS_FORM, { ...initialValues });
    setFieldTouched(ADDITIONALS_FORM, {});
  }, [setFieldValue, setFieldTouched]);

  const setAdditionalsFormFields = useCallback(
    (itemsToSet) =>
      setFieldValue(ADDITIONALS_FORM, {
        ...initialValues,
        ...itemsToSet,
      }),
    [setFieldValue]
  );

  let context = {
    ...formikData,
    formikData,
    setAdditionalsFormFields,
    resetAdditionalsFormFields,
  };

  // const formSubmit = useSaveAddressAction(context);
  const handleKeyDown = useEnterActionInForm({
    formikData,
    // submitHandler: formSubmit,
  });
  const formSectionContext = useFormSection({
    formikData,
    initialValues,
    id: ADDITIONALS_FORM,
    // submitHandler: formSubmit,
  });

  context = {
    ...context,
    ...formikData,
    ...formSectionContext,
    formikData,
    // formSubmit,
    handleKeyDown,
  };

  return (
    <OrderAdditionalsFormikContext.Provider value={context}>
      <Form id={ADDITIONALS_FORM}>{children}</Form>
    </OrderAdditionalsFormikContext.Provider>
  );
}
OrderAdditionalsFormikProvider.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};
export default OrderAdditionalsFormikProvider;
