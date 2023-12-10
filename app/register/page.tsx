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

    return <div className="container mx-auto p-4">
        <h1 className="text-xl mb-4">User Registration</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="block">Email</label>
                <input className="w-full p-2 border rounded" type="text" id="email" name="email" value={registerFormData.email} onChange={handleChange} />
            </div>
            <div>
                <label className="block">Password</label>
                <input className="w-full p-2 border rounded" type="text" id="password" name="password" value={registerFormData.password} onChange={handleChange} />
            </div>
            <button disabled={isProcessing} type="submit" className={`text-white px-4 py-2 rounded ${isProcessing ? 'bg-gray-800' : 'bg-blue-500 hover:bg-blue-600'}`}>Register User</button>
        </form>
    </div>
}