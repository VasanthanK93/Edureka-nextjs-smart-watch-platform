import ServiceRequestList from "@/components/SRList/serviceRequestList"
import IncidentList from "@/components/incidentList/incidentList"
export default function Home() {
  return (
    <main className="flex lg:flex-row flex-col">
      <div className="basis-1/2 mr-2">
      <IncidentList />
      </div>
      <div className="basis-1/2">
      <ServiceRequestList />
      </div>
    </main>
  )
}
