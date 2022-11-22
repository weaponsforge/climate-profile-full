import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProfileCenteredComponent from '@/components/profile-centered'
import textData from '@/data/text_data'
import donutChartData from '@/data/donut_data'
import countries from '@/data/countries'
import { options, labels, data } from '@/data/bar_data'
import { capitalizeFirstLetter } from '@/utils/text'

function ProfileCentered () {
  const router = useRouter()
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (router.isReady) {
      const cntry = router.query.country

      if (cntry) {
        setCountry(capitalizeFirstLetter(cntry))
      } else {
        console.error('country is not defined')
      }

    }
  }, [router.isReady, router.query])

  const handleSelectCountry = (e) => {
    const { value } = e.target
    setCountry(value)
  }

  return (
    <ProfileCenteredComponent
      country={country}
      countries={countries}
      textData={textData}
      donutData={donutChartData}
      barData={{ options, labels, data }}
      handleSelectCountry={handleSelectCountry}
    />
  )
}

export default ProfileCentered