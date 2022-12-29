import React, { useEffect, useRef, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ErrorIcon from '@mui/icons-material/Error';
import Alert from '@mui/material/Alert';
import Stack from '@mui/system/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import './SignupForm.css';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const SignupForm = () => {
  const firstNameRef = useRef();

  useEffect(() => {
    firstNameRef.current?.focus();
  }, [firstNameRef]);

  const setFirstNameRef = (element) => {
    firstNameRef.current = element;
  };

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const [accountCreatedMessage, setAccountCreatedMessage] = useState('');
  const [openAccountCreateMessageBox, setOpenAccountCreateMessageBox] =
    useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword === data.password) {
      try {
        const url = 'http://localhost:8080/api/signup';
        const { data: res } = await axios.post(url, data);

        setAccountCreatedMessage(res.message);

        setTimeout(() => {
          navigate('/signin');
        }, 3000);
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
    } else {
      setError('Passwords do not match!');
    }
  };

  const [firstNameError, setFirstNameError] = useState(false);

  useEffect(() => {
    if (error.startsWith('"First Name"')) {
      setFirstNameError(true);
    }
  }, [error]);

  const [lastNameError, setLastNameError] = useState(false);

  useEffect(() => {
    if (error.startsWith('"Last Name"')) {
      setLastNameError(true);
    }
  }, [error]);

  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (
      error.startsWith('"Email"') ||
      error === 'An account with this email already exists!'
    ) {
      setEmailError(true);
    }
  }, [error]);

  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (error.startsWith('"Password"') || error === 'Passwords do not match!') {
      setPasswordError(true);
    }
  }, [error]);

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    if (error === 'Passwords do not match!') {
      setConfirmPasswordError(true);
    }
  }, [error]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError('');

    if (input.name === 'firstName') {
      setFirstNameError(false);
    } else if (input.name === 'lastName') {
      setLastNameError(false);
    } else if (input.name === 'email') {
      setEmailError(false);
    } else if (input.name === 'password') {
      setPasswordError(false);
      setConfirmPasswordError(false);
      setError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    if (e.target.name === 'confirmPassword') {
      setConfirmPasswordError(false);
      setPasswordError(false);
      setError('');
    }
  };

  const handleFirstNameBlur = (e) => {
    if (!e.target.value.trim()) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
      setFirstNameIconColor('gray');
    }
  };

  const handleLastNameBlur = (e) => {
    if (!e.target.value.trim()) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
      setLastNameIconColor('gray');
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

  const handleConfirmPasswordBlur = (e) => {
    if (!e.target.value) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordIconColor('gray');
    }
  };

  const [firstNameIconColor, setFirstNameIconColor] = useState('gray');

  const handleFirstNameFocus = () => {
    setFirstNameIconColor('#2e7d32');
  };

  const [lastNameIconColor, setLastNameIconColor] = useState('gray');

  const handleLastNameFocus = () => {
    setLastNameIconColor('#2e7d32');
  };

  const [emailIconColor, setEmailIconColor] = useState('gray');

  const handleEmailFocus = () => {
    setEmailIconColor('#2e7d32');
  };

  const [passwordIconColor, setPasswordIconColor] = useState('gray');

  const handlePasswordFocus = () => {
    setPasswordIconColor('#2e7d32');
  };

  const [confirmPasswordIconColor, setConfirmPasswordIconColor] =
    useState('gray');

  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordIconColor('#2e7d32');
  };

  const responseFacebook = (response) => {
    if (response.accessToken) {
      localStorage.setItem('facebookToken', response.accessToken);
      localStorage.setItem('facebookName', response.name);
      localStorage.setItem('facebookEmail', response.email);
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
      window.location = '/homepage';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: '10px', textAlign: 'center' }}
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
          Create your account
        </Typography>
        {accountCreatedMessage && (
          <Collapse in={openAccountCreateMessageBox}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAccountCreateMessageBox(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              variant="filled"
              sx={{ mt: 1.5 }}
            >
              {accountCreatedMessage}
            </Alert>
          </Collapse>
        )}
        <TextField
          required
          error={firstNameError}
          name="firstName"
          onChange={handleChange}
          onBlur={handleFirstNameBlur}
          onFocus={handleFirstNameFocus}
          value={data.firstName}
          inputRef={setFirstNameRef}
          type="text"
          label="First Name"
          variant="outlined"
          size="small"
          id="outlined-basic-first-name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon
                  sx={{
                    color: firstNameError ? '#d32f2f' : firstNameIconColor,
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {firstNameError ? <ErrorIcon sx={{ color: '#d32f2f' }} /> : ''}
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            mt: 2.5,
            '& label.Mui-focused': {
              color: firstNameError ? '#d32f2f' : '#2e7d32',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: firstNameError ? '#d32f2f' : '#2e7d32',
              },
            },
          }}
        />
        <TextField
          required
          error={lastNameError}
          name="lastName"
          onChange={handleChange}
          onBlur={handleLastNameBlur}
          onFocus={handleLastNameFocus}
          value={data.lastName}
          type="text"
          label="Last Name"
          variant="outlined"
          size="small"
          id="outlined-basic-last-name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon
                  sx={{ color: lastNameError ? '#d32f2f' : lastNameIconColor }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {lastNameError ? <ErrorIcon sx={{ color: '#d32f2f' }} /> : ''}
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            mt: 2.5,
            '& label.Mui-focused': {
              color: lastNameError ? '#d32f2f' : '#2e7d32',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: lastNameError ? '#d32f2f' : '#2e7d32',
              },
            },
          }}
        />
        <TextField
          required
          error={emailError}
          name="email"
          onChange={handleChange}
          onBlur={handleEmailBlur}
          onFocus={handleEmailFocus}
          value={data.email}
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
        <TextField
          required
          error={confirmPasswordError}
          name="confirmPassword"
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          onFocus={handleConfirmPasswordFocus}
          value={confirmPassword}
          type="password"
          label="Confirm Password"
          variant="outlined"
          size="small"
          id="outlined-basic-confirm-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon
                  sx={{
                    color: confirmPasswordError
                      ? '#d32f2f'
                      : confirmPasswordIconColor,
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {confirmPasswordError ? (
                  <ErrorIcon sx={{ color: '#d32f2f' }} />
                ) : (
                  ''
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            mt: 2.5,
            '& label.Mui-focused': {
              color: confirmPasswordError ? '#d32f2f' : '#2e7d32',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: confirmPasswordError ? '#d32f2f' : '#2e7d32',
              },
            },
          }}
        />
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
          Sign up
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
          Already have an account?
          <Link
            component={RouteLink}
            to="/signin"
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
            Sign in
          </Link>
        </Stack>
        <Divider sx={{ width: '100%', mb: 2, fontWeight: 'bold' }}>OR</Divider>
      </FormControl>
      <Stack spacing={0.5} justifyContent="center" alignItems="center">
        <FacebookLogin
          appId="487185063270333"
          textButton="&nbsp;&nbsp;Sign in with Facebook"
          fields="name,email"
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

export default SignupForm;
