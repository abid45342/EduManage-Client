import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const salesData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 200 },
  { month: "Mar", sales: 300 },
  { month: "Apr", sales: 450 },
];

const topCourses = [
  { name: "React Mastery", sales: 150 },
  { name: "Node.js Basics", sales: 120 },
  { name: "MongoDB Guide", sales: 100 },
];

export default function Overview() {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg">
          <h3 className="text-lg">Total Sales</h3>
          <p className="text-2xl font-bold">1,500</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h3 className="text-lg">Revenue</h3>
          <p className="text-2xl font-bold">$12,00</p>
        </div>
        <div className="p-4 bg-purple-500 text-white rounded-lg">
          <h3 className="text-lg">Students</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      {/* Monthly Sales Chart */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-2">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top-Selling Courses */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Top-Selling Courses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCourses}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
