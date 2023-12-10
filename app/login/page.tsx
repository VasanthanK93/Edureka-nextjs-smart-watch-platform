'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const [isProcessing, setIsProcessing] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })
    const { push } = useRouter();

    async function handleSubmit(e: any) {
        setIsProcessing(true);
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4800/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(loginFormData)
            });
            const data = await response.json();
            window.localStorage.setItem("access-token", data.accessToken)
            setIsProcessing(false);
            cleanUpForm();
            push('/');
        }
        catch (error) {
            console.log(error);
            setIsProcessing(false);
        }

    }

    function cleanUpForm() {
        setLoginFormData({ email: "", password: "" })
    }

    function handleChange(e: any) {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
    }

    return <div className="container mx-auto p-4">
        <h1 className="text-xl mb-4">User Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email Address</label>
                <div className="mt-2">
                <input id="email"
                  name="email"
                  type="email"
                  autoComplete="email" 
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   value={loginFormData.email} onChange={handleChange} />
                </div>
            </div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={loginFormData.password} onChange={handleChange} />
            </div>
            <button disabled={isProcessing} type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500">Login</button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
            New member?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register Here
            </a>
          </p>
    </div>
}