import PropTypes from 'prop-types'
import Container from '@mui/material/Container'
import AppCard from '@/components/common/ui/appcard'

function Section ({ maxWidth, children }) {
  const mWidth = maxWidth || 'md'

  return (
    <Container maxWidth={mWidth} sx={{
      maxWidth: {
        sm: '100% !important'
      }
    }}>
      <AppCard>
        {children}
      </AppCard>
    </Container>
  )
}

Section.propTypes = {
  maxWidth: PropTypes.string,
  children: PropTypes.node
}

export default Section
