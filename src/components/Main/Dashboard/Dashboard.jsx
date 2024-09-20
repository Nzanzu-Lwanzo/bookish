import Collections from "./components/Collections";
import ListBooks from "./components/ListBooks";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <Collections />
      <ListBooks />
    </section>
  );
};

export default Dashboard;
