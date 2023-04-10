import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardPreview from '../cardpreview'
import cardViewLabels from '../../constants/cardviewlabels.json'

function FormItemsView ({ card }) {
  return (
    <Grid container
      spacing={2}
      sx={{
        marginTop: (theme) => theme.spacing(3),
        '& h6': { marginBottom: '16px' }
      }}
    >
      <Grid item sm={12} md={3}>
        <Typography variant="h6">
          Card Preview
        </Typography>

        <CardPreview />
      </Grid>

      <Grid item sm={12} md={9}>
        <Typography variant="h4">
          {card.title}
        </Typography>

        <Typography variant="h5">
          {card.subtitle}
        </Typography>

        <Box sx={{ marginTop: '32px' }}>
          <Typography variant="p" sx={{ marginTop: '24px' }}>
            {card.description}
          </Typography>

          <Box sx={{ marginTop: '32px', '& .itemvalues': { marginBottom: '16px', overflowWrap: 'break-word' } }}>
            {cardViewLabels.map((item, index) => (
              <div key={index} className="itemvalues">
                <Typography variant='label' component="div">
                  <b>{item.label}</b>
                </Typography>

                <Typography variant='label'>
                  {card[item.key]}
                </Typography>
              </div>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

FormItemsView.propTypes = {
  card: PropTypes.object
}

export default FormItemsView
