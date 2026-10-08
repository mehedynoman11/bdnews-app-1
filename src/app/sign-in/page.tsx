'use client'
import { authClient } from '@/lib/auth-client';

import React from 'react';
import { toast } from 'react-toastify';

const SignInPage = () => {
    const onSubmit = async (e:React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {email: string, password: string};

        const {data, error} = await authClient.signIn.email({
            ...user,
            callbackURL:'/'
        })

        if (data) {
            // console.log(data);
            toast.success('সাইন ইন সফল হয়েছে');
        }
        if (error) {
            toast.error(error.message || error.statusText || 'সাইন ইন ব্যর্থ হয়েছে')
        }
    }
    return (
        <div className="flex flex-col max-w-xl mx-auto justify-center mt-15">
            <h2 className="text-2xl text-center text-red-600 font-bold">সাইন ইন
            </h2>
            <form action="" onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-md p-4">
                
                    <label className="label">ইমেইল</label>
                    <input name='email' type="email" className="input w-md" placeholder="Email" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-md" placeholder="Password" />

                    <button type='submit' className="btn bg-red-700 text-white mt-4">সাইন ইন করুন</button>
                </fieldset>
            </form>
        </div>
    );
};

export default SignInPage;