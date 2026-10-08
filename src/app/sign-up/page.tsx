'use client'

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const onSubmit =  async (e:React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {name: string, email:string, image:string, password: string};
        // console.log(user)

        const {data, error} = await authClient.signUp.email({
            ...user,
            callbackURL: '/'
        });
        
        if (data) {
            toast.success('সাইন আপ সফল হয়েছে');
            redirect('/');
        }

        if (error) {
             toast.error(error.message || error.statusText || 'সাইন আপ ব্যর্থ হয়েছে')
        }
    }
    return (
        <div className="flex flex-col max-w-xl mx-auto justify-center mt-15">
            <h2 className="text-2xl text-center text-red-600 font-bold">সাইন আপ
            </h2>
            <form action="" onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-md p-4">
                    <label className="label">নাম</label>
                    <input name="name" type="name" className="input w-md" placeholder="Name" />

                    <label className="label">Image</label>
                    <input name="image" type="url" className="input w-md" placeholder="Image" />

                    <label className="label">ইমেইল</label>
                    <input name="email" type="email" className="input w-md" placeholder="Email" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name="password" type="password" className="input w-md" placeholder="Password" />

                    <button type="submit" className="btn bg-red-700 text-white mt-4">সাইন আপ করুন</button>
                </fieldset>
            </form>
        </div>
    );
};

export default SignUpPage;