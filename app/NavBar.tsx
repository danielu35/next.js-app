import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='flex bg-slate-200 p-5 space-x-3'>
      <Link href={'/'} className='mr-5'>Next.Js</Link>
      <Link href={'/users'} className='mr-5'>Users</Link>
      <Link href={'/admin'} className='mr-5'>Admin</Link>
      <Link href={'/products'} className='mr-5'>Products</Link>
      <Link href={'/api/auth/signin'}>Login</Link>
    </div>
  )
}

export default NavBar
