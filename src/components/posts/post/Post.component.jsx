import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { deletePost } from "../../../redux/post/post.slice";
import axios from "axios";
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

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  card: {
    maxWidth: 350,
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
const getLikes = async ({ queryKey }) => {
  try {
    const response = await axios.patch(`/post/${queryKey[1]}/likePost`, {});
    const memory = await response.data;
    return memory;
  } catch (error) {
    console.log(error);
  }
};
const Post = ({
  title,
  createdAt,
  creator,
  likeCount,
  selectedFile,
  tags,
  message,
  _id: id,
  refetch,
}) => {
  const [likes, setLikes] = useState(likeCount);
  const { refetch: reget, data, isFetched, error } = useQuery({
    queryKey: ["getLikes", id],
    queryFn: getLikes,
    staleTime: Infinity,
    enabled: false,
  });
  const likeFromServer = data && data.likeCount;
  const classes = useStyles();
  const history = useHistory();
  const { isPending } = useSelector(
    ({ post }) => ({
      isPending: post.isPending,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLikeCount = async () => {
    await setLikes(likes + 1);
    await reget();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      handleClose();
      refetch();
    });
  };
  if (error)
    return (
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-2xl text-gray-700 my-5">
          Hi👋, Something went Wrong!
        </h3>
        <p className="text-xl text-gray-700">Please come back after a while.</p>
      </div>
    );
  return (
    <Card elevation={3}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {title[0]}
          </Avatar>
        }
        action={
          <div>
            <IconButton
              aria-label="hit like"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() =>
                  history.push("/create", {
                    title,
                    createdAt,
                    creator,
                    likeCount,
                    selectedFile,
                    tags,
                    message,
                    _id: id,
                  })
                }
                disabled={isPending}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(id)} disabled={isPending}>
                {!isPending ? "Delete" : "Deleting..."}
              </MenuItem>
            </Menu>
          </div>
        }
        title={title}
        subheader={moment(createdAt).format("MM-DD-YYYY")}
      />
      <Link to={`/posts/${id}`}>
        <CardMedia
          className={classes.media}
          image={selectedFile}
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {message.slice(0, 120)}...
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="hit like" onClick={handleLikeCount}>
          <ThumbUpAltOutlinedIcon />
        </IconButton>
        <Typography variant="body2" component="p" color="textSecondary">
          {!isFetched ? likes : likeFromServer}
        </Typography>
        <div className="ml-auto">
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
      </CardActions>
    </Card>
  );
};

export default Post;
