export const Validate = (name:any, value:any, signUpPage:any) => {
    console.log(name, value, signUpPage,"signUpPage=====>")
    let error = '';
    switch (name) {
      case validationParam.email:
        let emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let testedEmail = emailRegex.test(value);
        if (!value) {
          error = signUpPage
            ? 'Email field is required.'
            : 'Email field is required.';
        } else if (!testedEmail) {
          error = signUpPage
            ? 'Email must be a valid email address.'
            : 'Email format is incorrect.';
        }
        return error;
      case validationParam.password:
        if (!value) {
          error = 'Password field is required.';
        }
        return error;
        case validationParam.resetPassword:
            if (!value) {
              error = 'Confirm password field is required.';
            }
        return error;
      case validationParam.name:
        if (!value) {
          error = signUpPage
            ? 'The name field is required.'
            : 'Name field is required.';
        }
        return error;
      case validationParam.room:
        if (!value) {
          error = 'Please Enter Room Name.';
        }
        return error;
      case validationParam.country:
        if (!value) {
          error = 'Country name is required';
        }
        return error;
      case validationParam.timezone:
        if (!value) {
          error = 'Timezone field is required';
        }
        return error;
      case validationParam.phoneNumber:
        if (!value) {
          error = 'Phone number field is required.';
        }else if(value.length<10 || value.length>15){
          error = 'Phone number length must be between 10 to 15';
        }
        return error;
      default:
        return error;
    }
  };


 export const validationParam = {
    email: 'email',
    password: 'password',
    name: 'name',
    room: 'room',
    phoneNumber:'phoneNumber',
    country:'country',
    timezone:"timezone",
    resetPassword:"resetPassword"
  };