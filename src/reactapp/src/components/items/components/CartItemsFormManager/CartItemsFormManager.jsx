import React, { useEffect, useState } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';

import {
  validate,
  prepareCartDataToUpdate,
  prepareCartItemsUniqueId,
  prepareCartItemFormikData,
  prepareCartItemsValidationSchema,
} from './utility';
import { __ } from '../../../../i18n';
import { _objToArray } from '../../../../utils';
import { CART_ITEMS_FORM } from '../../../../config';
import useFormSection from '../../../../hook/useFormSection';
import { formikDataShape } from '../../../../utils/propTypes';
import useItemsAppContext from '../../hooks/useItemsAppContext';
import useItemsCartContext from '../../hooks/useItemsCartContext';
import CartItemsFormContext from '../../context/CartItemsFormContext';
import useEnterActionInForm from '../../../../hook/useEnterActionInForm';

let initialValues = {};

const formSubmit = () => {};

function CartItemsFormManager({ children, formikData }) {
  const [hasError, setHasError] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [validationSchema, setValidationSchema] = useState({});
  const { setMessage, setPageLoader, setErrorMessage, setSuccessMessage } =
    useItemsAppContext();
  const {
    cartItems,
    updateCartItem,
    cartItemsAvailable,
    removeCartItemAction,
  } = useItemsCartContext();
  const { cartItemsValue, setFieldValue } = formikData;
  const cartItemsArray = _objToArray(cartItems);
  const cartItemIds = prepareCartItemsUniqueId(cartItemsArray);
  const itemUpdateHandler = async () => {
    try {
      setMessage(false);
      const isValid = await validate(validationSchema, cartItemsValue);
      const prepareCartItemsToUpdate = prepareCartDataToUpdate(cartItemsValue);

      let cartItemToDelete;
      let cartItemsToUpdate = [];
      /*eslint-disable */

      /* Проверка на соотвествие товаров в компонентах cartItems и cartItemsToUpdate , если нет соответствия -
         из массива cartItemsToUpdate удаляется этот продукт ( без этой проверки метод обновления/удаления продуктов в корзине
        выдаст ошибку, т.к. formikSectionData в компоненте CartItemsForm не обновляется при удалении товаров ( из-за этого
        фактически удалённые товары присутствуют в cartItemsValue) */
      cartItemsToUpdate = prepareCartItemsToUpdate.filter((item) => {
        const itemsID = Object.keys(cartItems);
        if (
          itemsID.some((id) => parseInt(id, 10) === item.cart_item_id)
        ) {
          return item;
        }
      });
      cartItemsToUpdate.forEach((itemToUpdate) => {
        if (itemToUpdate.quantity === 0) {
          cartItemToDelete = itemToUpdate.cart_item_id;
        }
      });
      /* ========================================================================================= */

      if (!isValid) {
        return;
      }
      if (cartItemToDelete) {
        setPageLoader(true);
        await removeCartItemAction({
          cartItem: cartItemToDelete,
        });
        cartItemToDelete = undefined;
        setPageLoader(false);
      } else if (cartItemsToUpdate.length) {
        setPageLoader(true);

        await updateCartItem({ cartItems: cartItemsToUpdate });

        setSuccessMessage(__('Cart updated successfully.'));
        setHasError(false);
        setPageLoader(false);
      }
    } catch (error) {
      console.error(error, 'error');
      console.log(formikData);
      setHasError(true);
      setErrorMessage(error.message);
      setPageLoader(false);
    }
  };

  useEffect(() => {
    if (isFilled || !cartItemsAvailable) {
      return;
    }

    const cartItemFormData = prepareCartItemFormikData(cartItemsArray);
    initialValues = cartItemFormData;
    setFieldValue(CART_ITEMS_FORM, cartItemFormData);
    setValidationSchema(prepareCartItemsValidationSchema(cartItemFormData));
    setIsFilled(true);
  }, [
    isFilled,
    cartItemIds,
    setFieldValue,
    cartItemsArray,
    cartItemsAvailable,
  ]);

  const handleKeyDown = useEnterActionInForm({
    formikData,
    validationSchema,
    submitHandler: itemUpdateHandler,
  });

  const formSectionContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    id: CART_ITEMS_FORM,
    submitHandler: formSubmit,
  });

  const context = {
    ...formSectionContext,
    ...formikData,
    formikData,
    handleKeyDown,
    itemUpdateHandler,
    cartItems: cartItemsArray,
    cartItemsAvailable: !!cartItemsArray.length,
    hasError,
    setHasError,
  };

  return (
    <CartItemsFormContext.Provider value={context}>
      <Form id={CART_ITEMS_FORM}>{children}</Form>
    </CartItemsFormContext.Provider>
  );
}

CartItemsFormManager.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default CartItemsFormManager;
