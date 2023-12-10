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

    return <div className="container mx-auto p-4">
        <h1 className="text-xl mb-4">Request for a Service</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label className="block">Title</label>
                <input className="w-full p-2 border rounded" type="text" id="title" name="title" value={serviceRequest.title} onChange={handleChange} />
            </div>
            <div>
                <label className="block">Description</label>
                <textarea className="w-full p-2 border rounded" id="description" name="description" value={serviceRequest.description} onChange={handleChange}></textarea>
            </div>
            <div>
                <label className="block">Image</label>
                <input className="w-full p-2 border rounded" type="file" id="image" name="image" onChange={handleChange} />
            </div>
            <button disabled={isProcessing} type="submit" className={`text-white px-4 py-2 rounded ${isProcessing ? 'bg-gray-800' : 'bg-blue-500 hover:bg-blue-600'}`}>Request a Service</button>
        </form>
    </div>
}