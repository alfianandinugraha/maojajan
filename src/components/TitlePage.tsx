import React from 'react'
import useTitlePage from '@/hooks/useTitlePage'

interface TitleProps {
  title: string
}

const TitlePage = (props: TitleProps): React.ReactElement => {
  useTitlePage(props.title)
  return <></>
}

export default TitlePage
