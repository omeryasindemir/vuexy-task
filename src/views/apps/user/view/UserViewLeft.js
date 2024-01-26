// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import { useRouter } from 'next/router'

const data = {
  id: undefined,
  role: undefined,
  status: undefined,
  username: undefined,
  avatarColor: 'primary',
  billing: 'Manual - Cash',
  contact: undefined,
  currentPlan: undefined,
  email: undefined,
  avatar: undefined,
  firstName: undefined,
  lastName: undefined
}

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}))

const UserViewLeft = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [Status, setStatus] = useState('')
  const [Role, setRole] = useState('')
  const [Age, setAge] = useState('')

  const handleEditOK = e => {
    e.preventDefault()
    console.log('Updated!')
    handleEditClose()
    // const EData = JSON.parse(localStorage.getItem('users_L_Data'))
    // EData.firstName = FirstName
    // localStorage.setItem('users_L_Data', JSON.stringify(EData))
  }

  const storedUData = localStorage.getItem('users_L_Data')
  const router = useRouter()
  const { id } = router.query
  if (storedUData) {
    const parsedUData = JSON.parse(storedUData)
    const elementWithID = parsedUData.find(item => item.id == id)
    if (elementWithID) {
      if (FirstName != elementWithID.firstName && FirstName != '') {
        elementWithID.firstName = FirstName
        localStorage.setItem('users_L_Data', JSON.stringify(parsedUData))
      }
      if (LastName != elementWithID.lastName && LastName != '') {
        elementWithID.lastName = LastName
        localStorage.setItem('users_L_Data', JSON.stringify(parsedUData))
      }
      if (Username != elementWithID.username && Username != '') {
        elementWithID.username = Username
        localStorage.setItem('users_L_Data', JSON.stringify(parsedUData))
      }
      if (Email != elementWithID.email && Email != '') {
        elementWithID.email = Email
        localStorage.setItem('users_L_Data', JSON.stringify(parsedUData))
      }
      if (Status != elementWithID.status && Status != '') {
        elementWithID.status = Status
        localStorage.setItem('users_L_Data', JSON.stringify(parsedUData))
      }
      if (Role != elementWithID.role && Role != '') {
        elementWithID.role = Role
        localStorage.setItem('users_L_Data', JSON.stringify(parsedUData))
      }
      if (Age != elementWithID.age && Age != '') {
        elementWithID.age = Age
        localStorage.setItem('users_L_Data', JSON.stringify(parsedUData))
      }

      console.log(elementWithID)
      data.username = elementWithID.username
      data.email = elementWithID.email
      data.role = elementWithID.role
      data.status = elementWithID.status
      data.currentPlan = elementWithID.currentPlan
      data.contact = elementWithID.age
      data.firstName = elementWithID.firstName
      data.lastName = elementWithID.lastName
      data.avatar = elementWithID.image
      data.id = elementWithID.id
    }
  }

  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar ? (
                <CustomAvatar
                  src={data.avatar}
                  variant='rounded'
                  alt={data.username}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(data.username)}
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {data.username}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={data.role}
                color={roleColors[data.role]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Full Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.firstName + ' ' + data.lastName}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Age:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.contact}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={data.status}
                    color={statusColors[data.status]}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.role}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='tonal' onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form onSubmit={handleEditOK}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        onChange={e => setFirstName(e.target.value)}
                        fullWidth
                        label='First Name'
                        placeholder='John'
                        defaultValue={data.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        onChange={e => setLastName(e.target.value)}
                        fullWidth
                        label='Last Name'
                        placeholder='Doe'
                        defaultValue={data.lastName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        label='Username'
                        placeholder='John.Doe'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        type='email'
                        label='E-Mail'
                        defaultValue={data.email}
                        placeholder='john.doe@gmail.com'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        onChange={e => setStatus(e.target.value)}
                        select
                        fullWidth
                        label='Status'
                        defaultValue={data.status}
                      >
                        <MenuItem value='pending'>Pending</MenuItem>
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='inactive'>Inactive</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        onChange={e => setRole(e.target.value)}
                        select
                        fullWidth
                        label='Role'
                        defaultValue={data.role}
                      >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='author'>Author</MenuItem>
                        <MenuItem value='editor'>Editor</MenuItem>
                        <MenuItem value='maintainer'>Maintainer</MenuItem>
                        <MenuItem value='subscriber'>Subscriber</MenuItem>
                      </CustomTextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        onChange={e => setAge(e.target.value)}
                        fullWidth
                        label='Age'
                        placeholder='17'
                        defaultValue={`${data.contact}`}
                      />
                    </Grid>
                  </Grid>
                  <Button type='Submit' variant='contained' sx={{ mr: 2 }} style={{ marginTop: '20px' }}>
                    Save
                  </Button>
                  <Button
                    variant='tonal'
                    color='secondary'
                    style={{ marginTop: '20px', marginLeft: '20px' }}
                    onClick={handleEditClose}
                  >
                    Cancel
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
