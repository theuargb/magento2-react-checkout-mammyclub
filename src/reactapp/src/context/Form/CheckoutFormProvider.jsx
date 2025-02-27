import React, { useCallback, useMemo, useState } from 'react';
import _get from 'lodash.get';
import { node } from 'prop-types';
import { Formik } from 'formik';
import { object as YupObject } from 'yup';
import { pushCustomerAccToBrowserHistory } from '../../utils/frontRedirects';

import CheckoutFormContext from './CheckoutFormContext';
import useCartContext from '../../hook/useCartContext';
import useAppContext from '../../hook/useAppContext';
import { config } from '../../config';
import LocalStorage from '../../utils/localStorage';
import gtmDataLayer from '../../utils/gtmDataLayer';

function prepareFormInitValues(sections) {
  const initValues = {};
  sections.forEach((section) => {
    initValues[section.id] = section.initialValues;
  });
  return initValues;
}

function prepareFormValidationSchema(sections, sectionId) {
  const schemaRules = {};

  if (sectionId) {
    const section = sections.find((sec) => sec.id === sectionId);
    schemaRules[sectionId] = YupObject().shape(section.validationSchema);

    return YupObject().shape(schemaRules);
  }

  sections.forEach((section) => {
    schemaRules[section.id] = YupObject().shape(section.validationSchema);
  });
  return YupObject().shape(schemaRules);
}

/**
 * Provider that wraps the entire checkout form
 */
function CheckoutFormProvider({ children }) {
  /**
   * Represent which form section is active at the moment
   */
  const [activeForm, setActiveForm] = useState(false);

  /**
   * Holds individual form sections which constitutes the entire checkout-form-formik
   */
  const [sections, updateSections] = useState([]);
  /**
   * if any of the payment method has any custom action needs to be carried out
   * during "Place Order" action, then it must be added here
   */
  const [paymentActionList, setPaymentActions] = useState({});

  const { placeOrder, cart } = useCartContext();
  const { setPageLoader, isLoggedIn } = useAppContext();

  const [liqPayReadyToInit, setLiqPayReadyToInit] = useState(false);
  const [isLiqPaySuccess, setLiqPayStatus] = useState(false);
  const [isOrderPlaced, setOrderPlacedStatus] = useState(false);
  // const [paymentMethodisLiqPay,setLiqpayAsPaymentMethod] = useState(false);
  /**
   * This will help any custom payment method renderer component to register
   * a custom payment action. Custom payment action will be triggered when
   * the place order happens.
   */
  const registerPaymentAction = useCallback(
    (paymentMethodCode, paymentMethodAction) => {
      setPaymentActions((actions) => ({
        ...actions,
        [paymentMethodCode]: paymentMethodAction,
      }));
    },
    [setPaymentActions]
  );

  /**
   * This will register individual form sections to the checkout-form-formik
   */
  const registerFormSection = useCallback((section) => {
    updateSections((prevSections) => [...prevSections, section]);
  }, []);

  const formSubmit = async (values) => {
    const selectedPaymentMethod = values.payment_method.code;
    try {
      setPageLoader(true);

      const order = await placeOrder(values, paymentActionList);

      const orderNumber = _get(order, 'order_number');
      if (orderNumber && config.isProductionMode) {
        gtmDataLayer.pushDataLayerCartData(
          'purchase',
          cart,
          orderNumber,
          isLoggedIn
        );
        switch (selectedPaymentMethod) {
          case 'liqpaymagento_liqpay':
            setLiqPayReadyToInit(true);
            break;
          case 'przelewy24':
            setOrderPlacedStatus(true);
            pushCustomerAccToBrowserHistory();
            window.location.assign(config.przelewy24SuccessRedirectUrl);
            break;
          default:
            setOrderPlacedStatus(true);
            pushCustomerAccToBrowserHistory();
            window.location.assign(config.successPageRedirectUrl);
            break;
        }
      }

      if (orderNumber && config.isDevelopmentMode) {
        gtmDataLayer.pushDataLayerCartData(
          'purchase',
          cart,
          orderNumber,
          isLoggedIn
        );
        switch (selectedPaymentMethod) {
          case 'liqpaymagento_liqpay':
            setLiqPayReadyToInit(true);
            break;
          case 'przelewy24':
            setOrderPlacedStatus(true);
            LocalStorage.clearCheckoutStorage();
            pushCustomerAccToBrowserHistory();
            window.location.replace(config.przelewy24SuccessRedirectUrl);
            break;
          default:
            setOrderPlacedStatus(true);
            LocalStorage.clearCheckoutStorage();
            pushCustomerAccToBrowserHistory();
            window.location.replace(config.successPageRedirectUrl);
            break;
        }
      }

      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
    }
  };

  const context = useMemo(
    () => ({
      activeFormSection: activeForm,
      setActiveFormSection: setActiveForm,
      registerFormSection,
    }),
    [activeForm, registerFormSection]
  );

  /**
   * Init value of checkout-form-formik
   *
   * It will be the combined object of each individual form sections which
   * are registered to this provider.
   *
   * So the whole initValues would be represented like:
   * {
   *    [form_section_id]: { ...form_section_init_values},
   *    [form_section_id]: { ...form_section_init_values},
   * }
   */
  const formInitialValues = prepareFormInitValues(sections);

  /**
   * ValidationSchema of checkout-form-formik
   *
   * If there is no activeForm, then the validationSchema equals to the combined
   * validationSchema of each individual form section which are registered with
   * this provider
   *
   * If there is a valid activeForm, then the validationSchema represent the
   * validationSchema of the active form section.
   */
  const formValidationSchema = prepareFormValidationSchema(
    sections,
    activeForm
  );

  return (
    <CheckoutFormContext.Provider
      value={{
        ...context,
        checkoutFormValidationSchema: formValidationSchema,
        submitHandler: formSubmit,
        registerPaymentAction,
        liqPayReadyToInit,
        isLiqPaySuccess,
        setLiqPayStatus,
        isOrderPlaced,
      }}
    >
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        onSubmit={formSubmit}
      >
        {children}
      </Formik>
    </CheckoutFormContext.Provider>
  );
}

CheckoutFormProvider.propTypes = {
  children: node.isRequired,
};

export default CheckoutFormProvider;
