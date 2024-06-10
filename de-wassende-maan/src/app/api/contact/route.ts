import { TContactUs } from '@/services/types/contactUsType'

import axios from 'axios'
import { NextResponse } from 'next/server'

export const GET = async () => {
  return NextResponse.json({ message: 'GET /api/contact' })
}

export const POST = async (request: Request) => {
  const listId = process.env.MAILCHIMP_LIST_ID;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const body: TContactUs = await request.json()

  try {
    const payload = {
      email_address: body.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: body.fullName,
        PHONE: body.phone,
      }
    }
    const { data } = await axios.post(`https://us22.api.mailchimp.com/3.0/lists/${listId}/members`, payload, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      }
    });

    return NextResponse.json({
      message: 'Success',
      data
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'Error',
      error
    }, { status: 500 })
  }
}