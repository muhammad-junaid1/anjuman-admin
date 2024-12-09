import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { MdBarChart, MdEvent, MdNotifications, MdPerson } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "services/api";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Card from "components/card";
import LineChart from "components/linechart/LineChart";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [dashboardData, setDashboarData] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await getApi("api/admin/dashboard-data");
      setDashboarData(response.data?.data || {});
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  let graphData = dashboardData?.graphData || {};

  const chartData = {
    labels: graphData?.engagementOverTime?.map((item) => item._id), // Dates or labels (e.g., "2024-12-06")
    datasets: [
      {
        label: "Total Likes",
        data: graphData?.engagementOverTime?.map((item) => item.totalLikes),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light teal for Likes
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Comments",
        data: graphData?.engagementOverTime?.map((item) => item.totalComments),
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Light purple for Comments
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

    const chartData2 = {
    labels: graphData?.eventAttendanceOverTime?.map(item => item._id), // Dates (X-axis)
    datasets: [
      {
        label: 'Total Attendees',
        data: graphData?.eventAttendanceOverTime?.map(item => item.totalAttendees), // Total attendees (Y-axis)
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light teal color for the bars
        borderColor: 'rgba(75, 192, 192, 1)', // Darker teal for the borders
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* Card widget */}

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {/* Display widgets for various dashboard metrics */}
        <Widget
          icon={<MdPerson className="h-7 w-7" />}
          title="Total Users"
          subtitle={dashboardData?.userMetrics?.totalUsers?.toString()}
          extraClasses="bg-blue-100"
        />
        <Widget
          icon={<MdPerson className="h-7 w-7" />}
          title="Active Users"
          subtitle={dashboardData?.userMetrics?.activeUsers?.toString()}
          extraClasses="bg-green-100"
        />
        <Widget
          icon={<MdEvent className="h-7 w-7" />}
          title="Total Events"
          subtitle={dashboardData?.eventMetrics?.totalEvents?.toString()}
          extraClasses="bg-yellow-100"
        />
        <Widget
          icon={<MdEvent className="h-7 w-7" />}
          title="Upcoming Events"
          subtitle={dashboardData?.eventMetrics?.upcomingEvents?.toString()}
          extraClasses="bg-orange-100"
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="Total Posts"
          subtitle={dashboardData?.engagementMetrics?.totalPosts?.toString()}
          extraClasses="bg-teal-100"
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="Total Likes"
          subtitle={dashboardData?.engagementMetrics?.totalLikes?.toString()}
          extraClasses="bg-purple-100"
        />
        <Widget
          icon={<MdNotifications className="h-7 w-7" />}
          title="Total Notifications"
          subtitle={dashboardData?.notificationMetrics?.totalNotifications?.toString()}
          extraClasses="bg-red-100"
        />
        <Widget
          icon={<MdNotifications className="h-7 w-7" />}
          title="Total Announcements"
          subtitle={dashboardData?.announcementMetrics?.totalAnnouncements?.toString()}
          extraClasses="bg-pink-100"
        />
      </div>

      {/* Charts */}

      <Box p={5}>
        <Heading mb={5}>Analytics</Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={5}>
          {/* Line Chart for Event Attendance Over Time */}
          <Card p={4}>
            <Heading p={4} size="md">
              Event Attendance Over Time
            </Heading>
           <Bar data={chartData2} />
          </Card>

          {/* Line Chart for Engagement Over Time */}
          <Card p={4}>
            <Heading p={4} size="md">
              Engagement Over Time
            </Heading>
            <Bar data={chartData} />;
          </Card>
        </SimpleGrid>
      </Box>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
