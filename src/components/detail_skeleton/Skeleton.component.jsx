import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
const DetailSkeleton = () => {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="h3" component="div" gutterBottom>
              <Skeleton variant="text" />
            </Typography>
          </div>
          <div className="mb-3 w-96">
            <Typography variant="h6" component="div">
              <Skeleton variant="text" />
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Skeleton variant="rect" width="100%" height={480} />
          </Card>
          <div className="my-2">
            <Typography variant="body" component="div">
              <Skeleton variant="text" />
            </Typography>
          </div>
          <div className=" w-96">
            <Typography variant="body" component="div">
              <Skeleton variant="text" />
            </Typography>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={40} height={20} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailSkeleton;
