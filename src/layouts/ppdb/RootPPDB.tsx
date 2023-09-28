import {
  Collapse,
  Group,
  Header as MantineHeader,
  Paper,
  useMantineTheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, Outlet, ScrollRestoration } from "react-router-dom"
import { Link as Anchor } from 'react-scroll'
import { useBreakPoints } from '../../utils/UseBreakpoints'
import ToggleTheme from '../../components/toggleTheme'

const RootPPDB = () => {
  const { sm } = useBreakPoints()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === 'dark'
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <React.Fragment>
      <ScrollRestoration />

      <MantineHeader
        height={'13vh'}
        sx={{
          boxShadow: `${dark ? "" : "0px -40px 50px 10px black"}`,
          display: "flex",
          justifyContent: 'space-between',
          alignItems: "center",
          paddingInline: "2rem",
          position: "fixed"
        }}
      >
        <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[60px]" />
        {sm && <Group ml={60}>
          <Anchor to='beranda' smooth={true} duration={500} offset={-200} className='cursor-pointer'>
            Beranda
          </Anchor>
          <Anchor to='alur-pendaftaran' smooth={true} duration={500} offset={-100} className='cursor-pointer'>
            Alur Pendaftaran
          </Anchor>
          <Anchor to='jalur-pendaftaran' smooth={true} duration={500} offset={-100} className='cursor-pointer'>
            Jalur Pendaftaran
          </Anchor>

        </Group>
        }
        {sm &&
          <Group sx={{ color: 'blue' }}>
            <ToggleTheme color={`${dark ? "#6449da" : "#020731"}`} />
            <Link
              to={'/ppdb/login'}
              className={`border   rounded-[3px] h-[35px] flex justify-center items-center px-[1.125rem] font-bold 
              ${dark ? "border-[#6449da] text-[#876cff] " : "border-[#020731] text-[#020731] "}
              `}
            >
              Masuk
            </Link>
            <Link
              to={'/ppdb/login'}
              className={`  text-white rounded-[3px] h-[35px] flex justify-center items-center px-[1.125rem] font-bold 
              ${dark ? "bg-[#876cff] shadow-[0_0_30px_-10px_#876cff]" : "bg-[#020731] shadow-[0_0_30px_-10px_#020731]"}
              `}
            >
              Daftar
            </Link>
          </Group>}
        {!sm && (
          <div className='flex items-center gap-5'>
            <ToggleTheme color={`${dark ? "#6449da" : "#020731"}`} />
            <FaBars size={30} onClick={toggle} />
          </div>
        )}
      </MantineHeader>
      <Paper pt={'13vh'} className='relative'>
        <Collapse
          in={opened}
          transitionDuration={200}
          transitionTimingFunction='linear'
          className='menu-bar-collapse h-[100%] w-full  fixed top-[13vh] z-[10000] text-white '
        >
          <Paper className='flex flex-col min-h-[100vh] py-6 gap-4 text-xl px-8' >
            <Anchor to='beranda' smooth={true} duration={500} offset={-200} className='w-fit ' onClick={toggle}>
              Beranda
            </Anchor>
            <Anchor to='alur-pendaftaran' smooth={true} duration={500} offset={-100} className='w-fit' onClick={toggle}>
              Alur Pendaftaran
            </Anchor>
            <Anchor to='jalur-pendaftaran' smooth={true} duration={500} offset={-100} className='w-fit' onClick={toggle}>
              Jalur Pendaftaran
            </Anchor>
            <Link to={'/ppdb/login'} className='w-fit'>
              Masuk
            </Link>
            <Link to={'/ppdb/login'} className='w-fit'>
              Daftar
            </Link>
          </Paper>
        </Collapse>
        <Outlet />
      </Paper>
    </React.Fragment>
  )
}

export default RootPPDB