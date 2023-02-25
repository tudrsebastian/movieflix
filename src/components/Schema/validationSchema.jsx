// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const valSchema = Yup.object({
  email: Yup.string().email('Provide a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Must be atleast 6 characters').required('Password is required')
});
export default valSchema;
