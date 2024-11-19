"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingLoaders from "../components/loaders/LoadingLoaders";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UnauthorizedPage from "../utils/UnauthorizedPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  const { isAuthenticated, loading, user }: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      return router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingLoaders />;
  }

  if (!isAuthenticated) {
    return <UnauthorizedPage />;
  }

  const dashboardData = {
    posts: 150,
    likes: 1200,
    comments: 350,
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Posts Growth",
        data: [10, 20, 30, 15, 13, 56],
        fill: false,
        borderColor: "#3498db",
        tension: 0.1,
      },
      {
        label: "Likes Growth",
        data: [5, 10, 15, 67, 25, 25],
        fill: false,
        borderColor: "#e74c3c",
        tension: 0.1,
      },
      {
        label: "Comments Growth",
        data: [3, 6, 90, 29, 15, 18],
        fill: false,
        borderColor: "#f1c40f",
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Posts Distribution",
        data: [15, 20, 25, 30, 35, 40],
        backgroundColor: "#3498db",
        borderColor: "#2980b9",
        borderWidth: 1,
      },
      {
        label: "Likes Distribution",
        data: [5, 10, 15, 20, 25, 30],
        backgroundColor: "#e74c3c",
        borderColor: "#c0392b",
        borderWidth: 1,
      },
      {
        label: "Comments Distribution",
        data: [2, 4, 8, 12, 18, 22],
        backgroundColor: "#f1c40f",
        borderColor: "#f39c12",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 p-6 rounded-lg shadow-lg flex justify-between items-center hover:scale-105 transition duration-300 ease-in-out">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Posts
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {dashboardData.posts}
            </p>
          </div>
          <div className="text-6xl text-blue-500">
            <i className="fas fa-edit"></i>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 p-6 rounded-lg shadow-lg flex justify-between items-center hover:scale-105 transition duration-300 ease-in-out">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Likes
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {dashboardData.likes}
            </p>
          </div>
          <div className="text-6xl text-pink-500">
            <i className="fas fa-thumbs-up"></i>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 p-6 rounded-lg shadow-lg flex justify-between items-center hover:scale-105 transition duration-300 ease-in-out">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Comments
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {dashboardData.comments}
            </p>
          </div>
          <div className="text-6xl text-green-500">
            <i className="fas fa-comment"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Posts Growth Over Time
          </h3>
          <Line data={lineChartData} />
        </div>

        <div className="bg-white dark:bg-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Posts, Likes, and Comments Distribution
          </h3>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
}
