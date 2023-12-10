'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServiceRequestList () {

  const [totalSR, setTotalSR] = useState([]);

  useEffect(() => {
      async function getSRList() {
          const response = await fetch("http://localhost:4800/servicerequest", {
              headers: {
                  'Authorization': `bearer ${window.localStorage.getItem("access-token") || ''}`
              }
          });
          const data = await response.json();
          setTotalSR(data);
      }
      getSRList();
  }, [])

    return (
      <div>
        <h1>Service Request List</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {totalSR.map((serviceRequest: any) => (
            <li key={serviceRequest.id} className="flex justify-between gap-x-6 py-5">
              <div className="min-w-0 flex-auto">
                  <Link href={`service-request/${serviceRequest.id}`} className="text-sm font-semibold leading-6 text-white">{serviceRequest.title}</Link>
                  <p className="mt-1 truncate text-xs leading-5 text-white">{serviceRequest.description}</p>
                </div>
            </li>
          ))}
        </ul>
        </div>
      )
}