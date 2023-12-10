'use client'

import { useState } from "react"

export default function RegisterPage() {

    const [isProcessing, setIsProcessing] = useState(false);
    const [registerFormData, setRegisterFormData] = useState({
        email: "",
        password: ""
    })

    async function handleSubmit(e: any) {
        setIsProcessing(true);
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4800/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(registerFormData)
            })
            const data = await response.json();
            window.localStorage.setItem("access-token", data.accessToken)
            setIsProcessing(false);
            cleanUpForm();
        }
        catch (error) {
            console.log(error);
            setIsProcessing(false);
        }

    }

    function cleanUpForm() {
        setRegisterFormData({ email: "", password: "" })
    }

    function handleChange(e: any) {
        setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value })
    }

    return <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">User Registration</h1>
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                   value={registerFormData.email} onChange={handleChange} />
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
                value={registerFormData.password} onChange={handleChange} />
            </div>
            <button disabled={isProcessing} type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500">Register User</button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
            already a member?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              login to App Here
            </a>
          </p>
    </div>
    </div>
}