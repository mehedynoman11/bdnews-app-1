'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user
    const hnadleSignOut = async () => {
        await authClient.signOut();
    }
    return (
        <div>
            {
                user ? <div>
                    <Link href={'/profile'}>

                    </Link>
                    <div className="avatar flex flex-col gap-1` justify-center items-center">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                           <Link href={'/profile'}>
                            <Image
                                className=''
                                width={20} height={20}
                                alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
                           </Link>
                        </div>
                        <h2 className='font-bold text-sm'>{user?.name}</h2>
                        <button className='btn btn-sm bg-red-600 text-white font-bold'
                            onClick={hnadleSignOut}
                        >Sign Out</button>
                    </div>
                </div> :
                    <>
                        <Link href={'/sign-in'}><button className='btn btn-sm'>সাইন ইন</button></Link>
                        <Link href={'/sign-up'}> <button className='btn btn-sm bg-red-700 text-white'>সাইন আপ</button></Link>
                    </>
            }
        </div>
    );
};

export default UserInfo;