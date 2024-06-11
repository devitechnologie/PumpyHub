import React from 'react'
import Paragraph from './ui/Paragraph'

const Biobox = () => {
  return (
    <div>
      <div className='space-y-2'>
        <Paragraph className='font-medium text-[15px]'>
          Tel: {' '}
          <span className='font-normal'>
            32 (0)9 381 55 40
          </span>
        </Paragraph>
        <Paragraph className='font-medium text-[15px]'>
          Telefonish bereikbaar: {' '}
          <span className='font-normal'>
            Ma t.e.m Vr: 09:00 - 12:30 en 13:30-17
          </span>
        </Paragraph>
        <Paragraph className='font-medium text-[15px]'>
          Email: {' '}
          <span className='font-normal'>
            biobox@dewassendemaan.be
          </span>
        </Paragraph>
      </div>
    </div>
  )
}

export default Biobox