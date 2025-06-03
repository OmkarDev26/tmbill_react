import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div>Welcome !!</div>
    </>
  );
};

export default Dashboard;
