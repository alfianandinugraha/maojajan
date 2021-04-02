import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const AboutImage = styled.img`
  height: 100px;
  width: 100px;
  margin-top: 28px;
  margin-bottom: 16px;
`

const AboutBody = styled.section`
  line-height: normal;

  b {
    font-weight: bold;
  }
`
const AboutFooter = styled.footer`
  margin-top: 16px;
  a {
    color: ${(props) => props.theme.color.primary};
    text-decoration: none;
  }
`

export default function index(): ReactElement {
  return (
    <MainLayout>
      <HeadingLayout>Tentang</HeadingLayout>
      <AboutImage src="/the-developer.png" alt="Alfian andi" />
      <AboutBody>
        <p>
          Perkenalkan nama saya Alfian Andi Nugraha, saya seorang mahasiswa
          Informatika. Terinspirasi dari pengalaman pribadi, sering belanja tapi
          lupa apa yang mau dibelanjakan, dan untuk mengatasi masalah tadi
          dibuatlah aplikasi ini, <b>MaoJajan</b>. Aplikasi ini sekaligus bagian
          dari pembelajaran saya tentang front-end Reactjs.
        </p>
      </AboutBody>
      <AboutFooter>
        <a href="https://alfianandi.dev">https://alfianandi.dev</a>
      </AboutFooter>
    </MainLayout>
  )
}
