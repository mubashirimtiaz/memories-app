import Post from "./post/Post.component";
import Masonry from "react-masonry-css";
import CardSkeleton from "../cards_skeleton/Skeleton";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Posts = ({ refetch, isLoading, memories, error }) => {
  const history = useHistory();
  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    700: 2,
    500: 1,
  };
  if (isLoading)
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry_grid"
        columnClassName="masonry_grid_column"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((elem) => (
          <div key={elem}>
            <CardSkeleton />
          </div>
        ))}
      </Masonry>
    );
  if (error)
    return (
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-2xl text-gray-700 my-5">
          Hi👋, Something went Wrong!
        </h3>
        <p className="text-xl text-gray-700">Please come back after a while.</p>
      </div>
    );
  if (!memories) {
    return (
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-2xl text-gray-700 my-5">
          Hi👋, Something went Wrong!
        </h3>
        <p className="text-xl text-gray-700">Please come back after a while.</p>
      </div>
    );
  }
  if (!memories.length)
    return (
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-2xl text-gray-700 my-5">Hi👋, No Memory Found</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/create")}
        >
          Create
        </Button>
      </div>
    );
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry_grid"
      columnClassName="masonry_grid_column"
    >
      {memories?.map((memory) => (
        <div key={memory._id}>
          <Post {...memory} refetch={refetch} />
        </div>
      ))}
    </Masonry>
  );
};

export default Posts;
