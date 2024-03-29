import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import items from './items'

function MetadataForm ({ disabled, post }) {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        marginTop: (theme) => theme.spacing(4),
        marginBottom: (theme) => theme.spacing(4),
        width: '100%'
      }}
    >
      {items.map((item, index) => (
        <Grid item sm={12} md={6} key={index}>
          <TextField
            id={item.id}
            label={item.label}
            placeholder={item.placeholder}
            disabled={disabled}
            defaultValue={post?.[item.id] ?? ''}
            size='small'
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              width: '100%',
              marginBottom: (theme) => theme.spacing(2)
            }}
          />
        </Grid>
      ))
      }
    </Grid>
  )
}

MetadataForm.propTypes = {
  disabled: PropTypes.bool,
  post: PropTypes.object
}

export default MetadataForm
