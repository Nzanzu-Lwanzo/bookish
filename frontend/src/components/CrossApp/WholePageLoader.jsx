import Loader from "./Loader";

const WholePageLoader = () => {
  return (
    <div className="center whole-page-loader" style={{ height: "100vh" }}>
      <Loader height={100} width={100}></Loader>
    </div>
  );
};

export default WholePageLoader;
