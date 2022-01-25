import * as Yup from 'yup';

// const phoneRegExp =
//   /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const createMerchantVS = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter your first name')
    .trim()
    .min(2, 'Please enter your first name')
    .max(50),
  lastName: Yup.string()
    .required('Please enter your last name')
    .trim()
    .min(2, 'Please enter your last name')
    .max(50),
  email: Yup.string()
    .email('Please provide valid email')
    .required('Please enter your email address')
    .trim(),
  phoneNumber: Yup.string()
    .required('Please enter your phone number')
    .trim()
    .min(5, 'Please enter your phone number')
    .max(25),
  address: Yup.string().required('Please enter your POS address').trim(),
});

export const createShopVS = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your shop name')
    .trim()
    .min(2)
    .max(50),
  category: Yup.string()
    .required('Please enter your shop category')
    .trim()
    .max(50),
  phone: Yup.string()
    .required('Please enter your shop phone number')
    .trim()
    .max(25)
    .min(5),
  website: Yup.string().optional().trim(),
  address: Yup.string().required('Please select a valid address').trim(),
});

export const addProductVS = Yup.object().shape({
  title: Yup.string()
    .required('Please enter your product name')
    .min(2)
    .max(50)
    .trim(),
  price: Yup.string().required('Please enter your product price').trim(),
  category: Yup.string().required('Please enter your product category').trim(),
  tax: Yup.number().test(
    'is-decimal',
    'Please enter a valid number value',
    value => value => /^[0-9]*$/.test(value.toString()),
  ),
});

export const addAddressVS = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your contact name')
    .min(2)
    .max(50)
    .trim(),
  address: Yup.string()
    .required('Please enter your contact address')
    .min(2)
    .trim(),
});

export const CustomerInfoVS = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, 'First Name must be at Least 2 Characters')
    .max(50)
    .required('Firstname is required'),
  lastName: Yup.string()
    .trim()
    .min(2, 'Last Name must be at Least 2 Characters')
    .max(50),
  email: Yup.string().email('Please provide valid email').trim(),
  phone: Yup.string().trim().max(25).min(5, 'Phone must be at least 5 numbers'),
});
