export default function KpiCards({ totalRevenue, totalOrders, avgTicket }: { totalRevenue: string; totalOrders: number; avgTicket: string }) {
  return (
    <div className="kpi-cards">
      <div className="kpi-card">
        <h3>Total Revenue</h3>
        <p>{totalRevenue}</p>
      </div>
      <div className="kpi-card">
        <h3>Total Orders</h3>
        <p>{totalOrders}</p>
      </div>
      <div className="kpi-card">
        <h3>Average Ticket</h3>
        <p>{avgTicket}</p>
      </div>
    </div>
  );
}