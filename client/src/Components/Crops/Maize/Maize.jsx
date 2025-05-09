import React from 'react'
import MaizeGrid from './MaizeGrid'
import UploadAPI from './UploadAPI/UploadAPI'
import MaizeDetailsDisplay from './MaizeDetailsDisplay'

const Maize = () => {


  return (
    <div className='bg-neutral-50 dark:bg-stone-800' style={{ minHeight: 'calc(100vh - 57px)' }}>
      <UploadAPI />
      <MaizeDetailsDisplay />
      {/* {userDetails && (userDetails.uploadcount >= 5) ? <PrimeWarning /> : ''} */}
      <MaizeGrid />
    </div>
  )
}

export default Maize
