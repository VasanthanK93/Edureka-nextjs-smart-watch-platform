'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function RequestServicePage() {
    const { push } = useRouter();
    const [serviceRequest, setServiceRequest] = useState({
        title: "",
        description: "",
        image: ""
    })

    const [isProcessing, setIsProcessing] = useState(false);

    function handleChange(e: any) {
        if (e.target.name === "image") {
            setServiceRequest({ ...serviceRequest, image: e.target.files[0] })
        }
        else {
            setServiceRequest({ ...serviceRequest, [e.target.name]: e.target.value })
        }
    }

    function cleanUpForm() {
        setServiceRequest({
            title: "",
            description: "",
            image: ""
        })
    }

    async function handleSubmit(e: any) {
        setIsProcessing(true);
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4800/servicerequest", {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(serviceRequest)
            })
            const data = await response.json();
            setIsProcessing(false);
            cleanUpForm();
            push('/')
        }
        catch (error) {
            console.log(error);
            setIsProcessing(false);
        }

    }

    return <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Request for a Service</h1>
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">Title</label>
                <div className="mt-2">
                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" id="title" name="title" value={serviceRequest.title} onChange={handleChange} />
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">Description</label>
                <div className="mt-2">
                <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="description" name="description" value={serviceRequest.description} onChange={handleChange}></textarea>
                </div>
            </div>
            <div>
                <label  className="block text-sm font-medium leading-6 text-white">Image</label>
                <div className="mt-2">
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="image" name="file" onChange={handleChange} />
                </div>
            </div>
            <button disabled={isProcessing} type="submit" className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isProcessing ? 'bg-gray-800' : 'bg-indigo-600 hover:bg-indigo-500'}`}>Request a Service</button>
        </form>
    </div>
    </div>
}