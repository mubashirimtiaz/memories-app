import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { IconButton, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  blue,
  green,
  orange,
  purple,
  red,
  yellow,
  pink,
  lime,
  cyan,
  teal,
} from "@material-ui/core/colors";
import DetailSkeleton from "../detail_skeleton/Skeleton.component";

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: "45.25%", // 16:9
  },
  avatar: () => {
    const colors = [
      purple[500],
      lime[500],
      blue[500],
      yellow[800],
      green[500],
      red[500],
      orange[500],
      pink[500],
      cyan[700],
      teal[500],
    ];
    return {
      backgroundColor: colors[Math.floor(colors.length * Math.random())],
    };
  },
}));

const fetchMemory = async ({ queryKey }) => {
  try {
    const response = await axios.get(`/post/${queryKey[1]}`);
    const memory = await response.data;
    return memory;
  } catch (error) {
    console.log(error);
  }
};
const PostDetail = () => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const { data: memory, error, isLoading } = useQuery({
    queryKey: ["fetchMemory", id],
    queryFn: fetchMemory,
    staleTime: Infinity,
  });
  if (isLoading) return <DetailSkeleton />;
  if (error)
    return (
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-2xl text-gray-700 my-5">
          Hi👋, Something went Wrong!
        </h3>
        <p className="text-xl text-gray-700">Please come back after a while.</p>
      </div>
    );
  if (!memory)
    return (
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-2xl text-gray-700 my-5">
          Hi👋, No Memory Found with that id.
        </h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/create")}
        >
          Create One
        </Button>
      </div>
    );
  const {
    createdAt,
    message,
    title,
    selectedFile,
    tags,
    likeCount,
    creator,
  } = memory;
  return (
    <Container maxWidth="lg">
      <Grid container>
        <div className="mb-3">
          <h3 className="text-2xl md:text-4xl text-gray-500 mb-2">{title}</h3>
          {/* </Typography> */}
          <Typography variant="h6" component="h3" color="textSecondary">
            Created By:{" "}
            <span className="text-pink-500">{creator.toUpperCase()}</span>
          </Typography>
        </div>
        <Grid item xs={12}>
          <Card>
            <CardMedia
              className={classes.media}
              image={selectedFile}
              title={title}
            />
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-xl text-gray-700">
                  {moment(createdAt).format("MMMM Do YYYY")}
                </h5>
                <div>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      className={`${classes.avatar} p-2 m-1 text-xs text-gray-100 rounded-full cursor-auto shadow`}
                      disabled
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex "></div>
              <Typography variant="body1" color="textSecondary" component="p">
                {message}
              </Typography>
            </CardContent>
          </Card>
          <div className="my-2">
            <IconButton
              aria-label="hit like"
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              <FavoriteBorderIcon color="error" />
            </IconButton>
            <span className="font-bold text-gray-700">{likeCount}</span>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostDetail;
