import React, { useEffect, useRef, useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ErrorIcon from '@mui/icons-material/Error';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/system/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import './SigninForm.css';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const SigninForm = () => {
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current?.focus();
  }, [emailRef]);

  const setEmailRef = (element) => {
    emailRef.current = element;
  };

  const [data, setData] = useState({ email: '', password: '' });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://192.168.0.164:8080/api/signin';
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('userToken', res.data);
      localStorage.setItem('userFirstName', res.userFirstName);
      localStorage.setItem('userLastName', res.userLastName);
      localStorage.setItem('userEmail', res.userEmail);
      if (checked) {
        secureLocalStorage.setItem('userSecureRememberMe', checked);
        secureLocalStorage.setItem('userSecureEmail', data.email);
        secureLocalStorage.setItem('userSecurePassword', data.password);
      } else {
        secureLocalStorage.removeItem('userSecureRememberMe');
        secureLocalStorage.removeItem('userSecureEmail');
        secureLocalStorage.removeItem('userSecurePassword');
      }
      window.location = '/homepage';
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else if (!error.response) {
        setError('Network error! Please try again later!');
      }
    }
  };

  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (error.startsWith('"Email"') || error === 'Invalid Email or Password!') {
      setEmailError(true);
    }
  }, [error]);

  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (
      error.startsWith('"Password"') ||
      error === 'Invalid Email or Password!'
    ) {
      setPasswordError(true);
    }
  }, [error]);

  const handleChange = ({ currentTarget: input }) => {
    secureLocalStorage.removeItem('userSecureRememberMe');
    secureLocalStorage.removeItem('userSecureEmail');
    secureLocalStorage.removeItem('userSecurePassword');
    setData({ ...data, [input.name]: input.value });
    setError('');

    setEmailError(false);
    setPasswordError(false);

    if (input.name === 'email') {
      setEmailError(false);
    } else if (input.name === 'password') {
      setPasswordError(false);
    }
  };

  const handleEmailBlur = (e) => {
    if (!e.target.value) {
      setEmailError(true);
    } else {
      setEmailError(false);
      setEmailIconColor('gray');
    }
  };

  const handlePasswordBlur = (e) => {
    if (!e.target.value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPasswordIconColor('gray');
    }
  };

  const [emailIconColor, setEmailIconColor] = useState('gray');

  const handleEmailFocus = () => {
    setEmailIconColor('#2e7d32');
  };

  const [passwordIconColor, setPasswordIconColor] = useState('gray');

  const handlePasswordFocus = () => {
    setPasswordIconColor('#2e7d32');
  };

  const [checked, setChecked] = useState(
    secureLocalStorage.getItem('userSecureRememberMe') === null
      ? false
      : secureLocalStorage.getItem('userSecureRememberMe')
  );

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (secureLocalStorage.getItem('userSecureRememberMe')) {
      setData({
        email: secureLocalStorage.getItem('userSecureEmail', data.email),
        password: secureLocalStorage.getItem(
          'userSecurePassword',
          data.password
        ),
      });
      setChecked(checked);
    }
  }, [checked, data.email, data.password]);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      localStorage.setItem('facebookToken', response.accessToken);
      localStorage.setItem('facebookName', response.name);
      localStorage.setItem('facebookEmail', response.email);
      localStorage.setItem('facebookPicture', response.picture.data.url);
      window.location = '/homepage';
    }
  };

  const responseGoogle = (response) => {
    if (response.credential) {
      const googleUserObject = jwt_decode(response.credential);
      localStorage.setItem('googleUser', JSON.stringify(googleUserObject));
      localStorage.setItem(
        'googleName',
        JSON.stringify(googleUserObject['given_name'])
      );
      localStorage.setItem(
        'googleEmail',
        JSON.stringify(googleUserObject['email'])
      );
      localStorage.setItem(
        'googlePicture',
        JSON.stringify(googleUserObject['picture'])
      );
      window.location = '/homepage';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: '75px', textAlign: 'center' }}
    >
      <FormControl>
        <Typography
          sx={{
            mt: 2.5,
            fontSize: {
              xs: '17px',
              sm: '17px',
              md: '20px',
              lg: '23px',
              xl: '23px',
            },
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#2e7d32',
          }}
        >
          Sign in to your account
        </Typography>
        <TextField
          required
          error={emailError}
          name="email"
          onChange={handleChange}
          onBlur={handleEmailBlur}
          onFocus={handleEmailFocus}
          value={data.email}
          inputRef={setEmailRef}
          type="email"
          label="Email Address"
          variant="outlined"
          size="small"
          id="outlined-basic-email-address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon
                  sx={{ color: emailError ? '#d32f2f' : emailIconColor }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {emailError ? <ErrorIcon sx={{ color: '#d32f2f' }} /> : ''}
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            mt: 2.5,
            '& label.Mui-focused': {
              color: emailError ? '#d32f2f' : '#2e7d32',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: emailError ? '#d32f2f' : '#2e7d32',
              },
            },
          }}
        />
        <TextField
          required
          error={passwordError}
          name="password"
          onChange={handleChange}
          onBlur={handlePasswordBlur}
          onFocus={handlePasswordFocus}
          value={data.password}
          type="password"
          label="Password"
          variant="outlined"
          size="small"
          id="outlined-basic-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon
                  sx={{ color: passwordError ? '#d32f2f' : passwordIconColor }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {passwordError ? <ErrorIcon sx={{ color: '#d32f2f' }} /> : ''}
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            mt: 2.5,
            '& label.Mui-focused': {
              color: passwordError ? '#d32f2f' : '#2e7d32',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: passwordError ? '#d32f2f' : '#2e7d32',
              },
            },
          }}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                sx={{
                  '&.Mui-checked': {
                    color: '#2e7d32',
                  },
                }}
              />
            }
            label="Remember me"
          />
        </FormGroup>
        {error && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}
          >
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 1.5,
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: 1,
            backgroundColor: '#2e7d32',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#2e7d32',
            },
          }}
        >
          Sign In
        </Button>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            flexWrap: 'wrap',
            mt: 2,
            mb: 2,
            fontSize: {
              xs: '17px',
              sm: '17px',
              md: '18px',
              lg: '19px',
              xl: '19px',
            },
            fontWeight: 'bold',
          }}
        >
          Don't have an account?
          <Link
            component={RouteLink}
            to="/signup"
            sx={{
              ml: 1,
              textDecoration: 'none',
              textTransform: 'capitalize',
              color: '#2e7d32',
              '&:hover': {
                textDecoration: 'underline',
                color: '#2e7d32',
              },
            }}
          >
            Sign up
          </Link>
        </Stack>
        <Divider sx={{ width: '100%', mb: 2, fontWeight: 'bold' }}>OR</Divider>
      </FormControl>
      <Stack spacing={0.5} justifyContent="center" alignItems="center">
        <FacebookLogin
          appId="487185063270333"
          textButton="Sign in with Facebook"
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="btnFacebook"
          icon="fa-facebook"
        />
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={responseGoogle}
          width="275"
        />
      </Stack>
    </form>
  );
};

export default SigninForm;
