
export const userSchema = {
  name: {
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: {
      options: {
        min: 4,
        max: 64,
      },
    },
  },

  email: {
    notEmpty: true,
    isString: true,
    trim: true,
    isEmail: true,
  },
};