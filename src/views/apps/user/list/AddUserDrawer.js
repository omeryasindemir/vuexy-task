// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  gender: yup.string().required(),
  email: yup.string().email().required(),
  age: yup
    .number()
    .typeError('Age field is required')
    .min(2, obj => showErrors('Age', obj.value.length, obj.min))
    .required(),
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  lastName: yup
    .string()
    .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
  username: yup
    .string()
    .min(3, obj => showErrors('Username', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  email: '',
  gender: '',
  firstName: '',
  lastName: '',
  username: '',
  age: Number('')
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    if (store.allData.some(u => u.email === data.email || u.username === data.username)) {
      store.allData.forEach(u => {
        if (u.email === data.email) {
          setError('email', {
            message: 'Email already exists!'
          })
        }
        if (u.username === data.username) {
          setError('username', {
            message: 'Username already exists!'
          })
        }
      })
    } else {
      dispatch(addUser({ ...data, role, currentPlan: plan }))
      toggle()
      reset()
    }
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('age', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Add User</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='firstName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='First Name'
                onChange={onChange}
                placeholder='John'
                error={Boolean(errors.firstName)}
                {...(errors.firstName && { helperText: errors.firstName.message })}
              />
            )}
          />
          <Controller
            name='lastName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Last Name'
                onChange={onChange}
                placeholder='Doe'
                error={Boolean(errors.lastName)}
                {...(errors.lastName && { helperText: errors.lastName.message })}
              />
            )}
          />
          <Controller
            name='username'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Username'
                onChange={onChange}
                placeholder='johndoe'
                error={Boolean(errors.username)}
                {...(errors.username && { helperText: errors.username.message })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='email'
                label='Email'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder='johndoe@email.com'
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />

          <Controller
            name='age'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Age'
                onChange={onChange}
                placeholder='17'
                error={Boolean(errors.age)}
                {...(errors.age && { helperText: errors.age.message })}
              />
            )}
          />
          <Controller
            name='gender'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label='Gender'
                id='validation-billing-select'
                error={Boolean(errors.billing)}
                aria-describedby='validation-billing-select'
                {...(errors.gender && { helperText: errors.gender.message })}
                SelectProps={{ value: value, onChange: e => onChange(e) }}
              >
                <MenuItem value=''>Gender</MenuItem>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
              </CustomTextField>
            )}
          />
          <CustomTextField
            select
            fullWidth
            value={role}
            sx={{ mb: 4 }}
            label='Select Role'
            onChange={e => setRole(e.target.value)}
            SelectProps={{ value: role, onChange: e => setRole(e.target.value) }}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='author'>Author</MenuItem>
            <MenuItem value='editor'>Editor</MenuItem>
            <MenuItem value='maintainer'>Maintainer</MenuItem>
            <MenuItem value='subscriber'>Subscriber</MenuItem>
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            sx={{ mb: 6 }}
            label='Select Plan'
            SelectProps={{ value: plan, onChange: e => setPlan(e.target.value) }}
          >
            <MenuItem value='basic'>Basic</MenuItem>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='enterprise'>Enterprise</MenuItem>
            <MenuItem value='team'>Team</MenuItem>
          </CustomTextField>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
