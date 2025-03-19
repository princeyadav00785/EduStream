import React from 'react'
import PaymentFailedPage from '@/components/payment/paymanet-failed'
import { BaseLayout } from '@/components/baseLayout/baseLayout'

function paymentFailedScreen() {
  return (
    <div>
        <BaseLayout>
        <PaymentFailedPage/>
        </BaseLayout>
    </div>
  )
}

export default paymentFailedScreen