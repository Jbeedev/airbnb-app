"use client";

import Image from 'next/image';
import { useRouter } from 'next/Navigation';

const Logo = () => {
    return (
        <Image
        className='hidden md:block cursor-pointer'
        alt='Logo'
        width={100}
        height={100}
        src='/images/logo.png' 
        />
    )
}

export default Logo;