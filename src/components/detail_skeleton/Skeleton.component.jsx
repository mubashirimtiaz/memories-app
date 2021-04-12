import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Container from "@material-ui/core/Container";
const DetailSkeleton = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h3" gutterBottom>
        <Skeleton style={{ width: "60%" }} />
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom>
        <Skeleton style={{ width: "40%" }} />
      </Typography>
      <Skeleton variant="rect" height={480} />
      <Typography variant="body1" component="p">
        <Skeleton />
      </Typography>
      <Typography variant="body1" component="p">
        <Skeleton />
      </Typography>
      <div className="flex space-x-2 items-center">
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rect" width={40} height={20} />
      </div>
    </Container>
  );
};

export default DetailSkeleton;
