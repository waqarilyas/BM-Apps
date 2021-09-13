import * as Yup from 'yup';

export const createMerchantVS = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  email: Yup.string()
    .email('Please provide valid email')
    .required('Please enter your email address'),
  phoneNumber: Yup.string().required('Please enter your phone number'),
  address: Yup.string().required('Please enter your POS address'),
});

export const createShopVS = Yup.object().shape({
  name: Yup.string().required('Please enter your shop name'),
  category: Yup.string().required('Please enter your shop category'),
  phone: Yup.string().required('Please enter your shop phone number'),
  website: Yup.string().optional(),
  address: Yup.string().required('Please select a valid address'),
});

export const addProductVS = Yup.object().shape({
  title: Yup.string().required('Please enter your product name'),
  price: Yup.string().required('Please enter your product price'),
  category: Yup.string().required('Please enter your product category'),
  tax: Yup.string().optional(),
});
