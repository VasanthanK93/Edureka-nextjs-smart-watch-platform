'use client'
import { useEffect, useState } from "react";

export default function IncidentsDetailsPage(id: any){

    const [totalIncidents, setTotalIncidents] = useState([]);

    useEffect(() => {
        async function getIncidents(id: number) {
            const response = await fetch(`http://localhost:4800/incidents/${id}`, {
                headers: {
                    'Authorization': `bearer ${window.localStorage.getItem("access-token") || ''}`
                }
            });
            const data = await response.json();
            setTotalIncidents(data);
        }
        getIncidents(parseInt(id.params.id));
    }, [])
    
    return( <div>
    <div className="px-4 sm:px-0">
      <h3 className="text-base font-semibold leading-7 text-white">Incident Details</h3>
    </div>
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-white">Title</dt>
          <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">{totalIncidents.title}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-white">Description</dt>
          <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">{totalIncidents.description}</dd>
        </div>
        </dl>
        </div>
        </div>);
}