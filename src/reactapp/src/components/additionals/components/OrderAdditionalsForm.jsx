import React, { useContext } from 'react';
// import { useFormikContext } from 'formik';
import { node } from 'prop-types';
import useFormValidateThenSubmit from '../../../hook/useFormValidateThenSubmit';
import OrderAdditionalsFormikContext from '../context/OrderAdditionalsFormikContext';
import TextInput from '../../common/Form/TextInput';

function OrderAdditionalsForm({ children }) {
  const { fields, formId, formikData, submitHandler, handleKeyDown } =
    useContext(OrderAdditionalsFormikContext);

  const formSubmitHandler = useFormValidateThenSubmit({
    formId,
    formikData,
    submitHandler,
  });
  if (false) {
    formSubmitHandler();
  }

  // const { values } = useFormikContext();
  // const [addressFormSubmited, setAddressFormSubmited] = useState(false);

  /*  =======================================================================================  */

  return (
    <div className="px-4">
      <div>{children}</div>
      <TextInput
        required
        name={fields.orderComment}
        formikData={formikData}
        label="Комментарий к заказу"
        onKeyDown={handleKeyDown}
        placeholder=""
        as="textarea"
        className="h-32 py-2"
      />
    </div>
  );
}
OrderAdditionalsForm.propTypes = {
  children: node.isRequired,
};

export default OrderAdditionalsForm;
