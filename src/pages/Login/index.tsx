import React, { ReactElement } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

export default function index(): ReactElement {
  return (
    <>
      <Input
        placeholder="hello"
        icon="https://res.cloudinary.com/alfianandidev/image/upload/web/javascript.svg"
      />
      <Button
        icon="https://res.cloudinary.com/alfianandidev/image/upload/web/javascript.svg"
        variant="primary"
      >
        Hello
      </Button>
      <Button
        icon="https://res.cloudinary.com/alfianandidev/image/upload/web/javascript.svg"
        variant="secondary"
      >
        Hello
      </Button>
      <Button variant="auth" fullWidth style={{ textAlign: 'center' }}>
        Hello
      </Button>
    </>
  )
}
