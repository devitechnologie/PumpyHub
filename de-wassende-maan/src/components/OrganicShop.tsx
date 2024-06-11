import React from 'react'
import Paragraph from './ui/Paragraph'

const OrganicShop = () => {
  return (
    <div className='space-y-2'>
      <Paragraph className='font-medium text-[15px]'>
        Di t.e.M Vr: {' '}
        <span className='font-normal'>
          09:00 - 18:30
        </span>
      </Paragraph>
      <Paragraph className='font-medium text-[15px]'>
        Zat: {' '}
        <span className='font-normal'>
          09:00 - 16:00
        </span>
      </Paragraph>
      <Paragraph className='font-medium text-[15px]'>
        Tel: {' '}
        <span className='font-normal'>
          32 (0)9 381 55 40
        </span>
      </Paragraph>
      <Paragraph className='font-medium text-[15px]'>
        Email: {' '}
        <span className='font-normal'>
          winkel@dewassendemaan.be
        </span>
      </Paragraph>
    </div>
  )
}

export default OrganicShop