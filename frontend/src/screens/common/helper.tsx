export const initUserState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  message: null,
  isAdmin: false,
};

export const initProductState = {
  name: '',
  price: 0,
  image: '',
  brand: '',
  category: '',
  countInStock: 0,
  description: '',
};

type UserFields = keyof typeof initUserState;

type ProductFields = keyof typeof initProductState;

export const localUserReducer = (
  state: typeof initUserState,
  action: { id: UserFields; value: string | boolean }
) => {
  return { ...state, [action.id]: action.value };
};
export const localProductReducer = (
  state: typeof initProductState,
  action: { id: ProductFields; value: string | number }
) => {
  return { ...state, [action.id]: action.value };
};
