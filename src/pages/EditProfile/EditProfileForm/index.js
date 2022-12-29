import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/system/Stack';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const EditProfileForm = () => {
  const firstNameRef = useRef();

  useEffect(() => {
    firstNameRef.current?.focus();
  }, [firstNameRef]);

  const setFirstNameRef = (element) => {
    firstNameRef.current = element;
  };

  const [data, setData] = useState({
    firstName: localStorage.getItem('userFirstName'),
    lastName: localStorage.getItem('userLastName'),
    email: localStorage.getItem('userEmail'),
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const [updateMessage, setUpdateMessage] = useState('');
  const [openUpdateMessageBox, setOpenUpdateMessageBox] = useState(true);

  const [deleteMessage, setDeleteMessage] = useState('');

  const params = useParams();
  const { userId } = params;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (confirmPassword === data.password) {
      try {
        const url = `http://localhost:8080/api/update_profile/${userId}`;
        const { data: res } = await axios.patch(url, data);
        localStorage.setItem('userFirstName', res.userFirstName);
        localStorage.setItem('userLastName', res.userLastName);
        localStorage.setItem('userEmail', res.userEmail);

        setData({ ...data, password: '' });
        setConfirmPassword('');

        setUpdateMessage(res.message);

        firstNameRef.current?.focus();
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

  const handleDelete = async () => {
    if (confirmPassword === data.password) {
      try {
        const url = `http://localhost:8080/api/delete_profile/${userId}`;
        const { data: res } = await axios.delete(url, { data });
        localStorage.removeItem('userToken');
        localStorage.removeItem('userFirstName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userEmail');

        setDeleteMessage(res.message);

        setTimeout(() => {
          window.location = '/signup';
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

  ////////// MODAL //////////
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (error) {
      setOpen(false);
    }
  }, [error]);
  ////////// MODAL //////////

  return (
    <>
      {!deleteMessage ? (
        <form
          onSubmit={handleUpdate}
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
              Edit your profile
            </Typography>
            {updateMessage && (
              <Collapse in={openUpdateMessageBox}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenUpdateMessageBox(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  variant="filled"
                  sx={{ mt: 1.5 }}
                >
                  {updateMessage}
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
                    {firstNameError ? (
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
                      sx={{
                        color: lastNameError ? '#d32f2f' : lastNameIconColor,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {lastNameError ? (
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
                      sx={{
                        color: passwordError ? '#d32f2f' : passwordIconColor,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {passwordError ? (
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
                width: '100%',
                mt: 1.5,
                px: 3,
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                borderRadius: 1,
                backgroundColor: '#1976d2',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#0059B2',
                },
              }}
            >
              Update profile
            </Button>
            {/* MODAL */}
            <Box>
              <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                  width: '100%',
                  mt: 1.5,
                  px: 3,
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderRadius: 1,
                  backgroundColor: '#d32f2f',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#c62828',
                  },
                }}
              >
                Delete profile
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    p: 4,
                    textAlign: 'center',
                    border: '2px solid #202329',
                    boxShadow: 24,
                    backgroundColor: '#f2f2f2',
                  }}
                >
                  <HighlightOffIcon
                    sx={{ fontSize: '100px', color: '#d32f2f' }}
                  />
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {localStorage.getItem('userFirstName') +
                      ' ' +
                      localStorage.getItem('userLastName')}
                    , are you sure?
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you really want to delete your profile?
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, color: '#d32f2f' }}
                  >
                    Warning! This action cannot be undone!
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 3 }}
                  >
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      sx={{
                        px: 3,
                        py: 1,
                        backgroundColor: '#787c87',
                        '&:hover': {
                          backgroundColor: '#60636c',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDelete}
                      variant="contained"
                      sx={{
                        px: 3,
                        py: 1,
                        backgroundColor: '#d32f2f',
                        '&:hover': {
                          backgroundColor: '#c62828',
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Box>
            {/* MODAL */}
          </FormControl>
        </form>
      ) : (
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: 'black',
          }}
        >
          {deleteMessage}
        </Typography>
      )}
    </>
  );
};

export default EditProfileForm;
