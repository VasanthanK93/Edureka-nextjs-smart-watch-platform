'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function IncidentList () {
    const [totalIncidents, setTotalIncidents] = useState([]);

    useEffect(() => {
        async function getIncidents() {
            const response = await fetch("http://localhost:4800/incidents", {
                headers: {
                    'Authorization': `bearer ${window.localStorage.getItem("access-token") || ''}`
                }
            });
            const data = await response.json();
            setTotalIncidents(data);
        }
        getIncidents();
    }, [])

    return (
        <div>
        <h1>Incident List</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {totalIncidents.map((incident: any) => (
            <li key={incident.id} className="flex justify-between gap-x-6 py-5">
              <div className="min-w-0 flex-auto">
                  <Link href={`incident/${incident.id}`} className="text-sm font-semibold leading-6 text-white">{incident.title}</Link>
                  <p className="mt-1 truncate text-xs leading-5 text-white">{incident.description}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
      )
}