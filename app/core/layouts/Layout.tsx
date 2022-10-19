import Head from 'next/head'
import React, { FC } from 'react'
import { BlitzLayout, Routes } from '@blitzjs/next'
import { AppShell, Header } from '@mantine/core'
import Link from 'next/link'

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{title || 'Athalon Charakter'}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AppShell
				padding="md"
				// navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
				header={<Header height={60} className="bg-blue-600 text-lg">
					<div className="flex items-center h-full text-white">
						<Link href={Routes.HomePage()}>
							<a className="flex items-center h-full mr-8 font-bold text-xl">
								<img alt="" className="h-full mr-4" width="auto" src="https://athalon.net/wp-content/uploads/2020/02/Athalon_Schriftzug2020_HoheAufl%C3%B6sung.png" />
								Charakter Datenbank
							</a>
						</Link>
						<a target="_blank" href="https://athalon.de" className="hover:bg-white hover:text-black h-full items-center flex px-2" rel="noreferrer">Homepage</a>
						<a target="_blank" href="https://athalon.de" className="hover:bg-white hover:text-black h-full items-center flex px-2" rel="noreferrer">Verein</a>
						<a target="_blank" href="https://board.athalon.de" className="hover:bg-white hover:text-black h-full items-center flex px-2" rel="noreferrer">Forum</a>
						<a target="_blank" href="https://wiki.athalon.de" className="hover:bg-white hover:text-black h-full items-center flex px-2" rel="noreferrer">Wiki</a>
						<a target="_blank" href="https://rezepte.athalon.de" className="hover:bg-white hover:text-black h-full items-center flex px-2" rel="noreferrer">Rezepte</a>
					</div>
				</Header>}
				styles={(theme) => ({
					main: {
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						backgroundImage: 'url(https://athalon.net/wp-content/uploads/2020/02/Hintergrund_Holz.jpg)',
					},
				})}
			>
				{children}
			</AppShell>
		</>
	)
}

export default Layout
