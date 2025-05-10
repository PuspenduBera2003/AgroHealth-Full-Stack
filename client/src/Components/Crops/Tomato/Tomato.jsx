import React from 'react'
import UploadAPI from './UploadAPI/UploadAPI.jsx'
import TomatoDetailsDisplay from './TomatoDetailsDisplay.jsx';
import TomatoGrid from './TomatoGrid.jsx';

const Tomato = () => {

  return (
    <div className='bg-neutral-50 dark:bg-stone-800 transition-colors duration-200 ease-in-out' style={{ minHeight: 'calc(100vh - 57px)' }}>
      <UploadAPI />
      <TomatoDetailsDisplay />
      {/* {userDetails && (userDetails.uploadcount >= 5) ? <PrimeWarning /> : ''} */}
      <TomatoGrid />
    </div>
  )
}

export default Tomato