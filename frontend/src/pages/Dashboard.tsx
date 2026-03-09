import { Checklist } from "@/components/CheckList";
import { Navbar } from "@/components/common/Navbar";

function Dashboard() {

  return (
    <div className="min-h-screen bbg-gray-100">
      <Navbar/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/**Encabezado de Hábitos*/}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Actividades de hoy</h2>
        </div>

        {/**Checklist de Hábitos*/}
        <Checklist/>

      </main>
    </div>
  );
}

export default Dashboard;
