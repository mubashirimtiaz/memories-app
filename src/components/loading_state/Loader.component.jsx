import { shallowEqual, useSelector } from "react-redux";
const Loader = ({ children, isLoading, isFetching }) => {
  const { isPending } = useSelector(
    ({ post }) => ({
      isPending: post.isPending,
    }),
    shallowEqual
  );
  return (
    <div className="relative box-border p-0 m-0">
      {(isPending || isLoading || isFetching) && (
        <div className="absolute w-screen h-full min-h-screen bg-gray-900 opacity-70 z-10">
          <div className=" top-10 fixed w-screen left-5 mt-10 text-sm opacity-100 text-center">
            <span className="bg-white px-5  py-2 rounded-full">Loading...</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Loader;
