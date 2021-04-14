import { useState } from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Avatar, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import { postMemory, updateMemory } from "../../redux/post/post.slice";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import Spinner from "../spinner/Spinner.component";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const validationSchema = yup.object({
  title: yup
    .string("Enter your Memory Title")
    .required("Memory Title is required"),
  creator: yup
    .string("Enter your Memory Creator")
    .required("Memory Creator is required"),
  tags: yup
    .array()
    .min(1, "Pick at least one tag")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  detail: yup
    .string("Enter your Memory Detail")
    .min(10, "Minimum 10 characters are required")
    .required("Memory Detail is required"),
  media: yup
    .string("Upload your Memory Media")
    .required("Memory Media is required"),
});

const useStyles = makeStyles((theme) => ({
  field: {
    display: "block",
    marginTop: 20,
    marginBottom: 20,
  },
  helperText: {
    fontSize: 12,
    marginTop: 3,
    marginLeft: 15,
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
  },
  reset: {
    marginLeft: 5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Create = ({ refetch }) => {
  const { state } = useLocation();
  const Prevtags =
    state &&
    state.tags.map((tag) => ({
      label: tag,
      value: tag.toLowerCase(),
    }));
  const dispatch = useDispatch();
  const history = useHistory();
  const [filePreview, setFilePreview] = useState(
    state ? state.selectedFile : ""
  );
  const options = [
    { value: "left", label: "Open Left" },
    { value: "right", label: "Open Right" },
    {
      value: "tilt,left",
      label: "Tilf and Open Left",
    },
    {
      value: "tilt,right",
      label: "Tilf and Open Right",
    },
  ];
  const optionsToDisplay = !Boolean(state)
    ? options
    : options.filter((option) => !state.tags.includes(option.label));
  const formik = useFormik({
    initialValues: {
      title: state ? state.title : "",
      detail: state ? state.message : "",
      creator: state ? state.creator : "",
      media: state ? state.selectedFile : "",
      tags: state ? Prevtags : [],
    },

    validationSchema: validationSchema,
    onSubmit: ({
      title,
      detail: message,
      creator,
      media: selectedFile,
      tags: options,
    }) => {
      const tags = options.map((tag) => tag.label);
      !Boolean(state)
        ? dispatch(
            postMemory({ title, message, creator, selectedFile, tags })
          ).then(() => {
            refetch();
            history.push("/");
          })
        : dispatch(
            updateMemory({
              id: state._id,
              selectedFile,
              selectedFilePublicID: state.selectedFilePublicID,
              createdAt: state.createdAt,
              title,
              message,
              creator,
              tags,
              likeCount: state.likeCount,
            })
          ).then(() => {
            refetch();
            history.push("/");
          });
    },
  });
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        {!Boolean(state) ? "Create a New Memory" : "Edit your Memory"}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.field}
          id="title"
          name="title"
          label="Memory Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="detail"
          name="detail"
          label="Memory Detail"
          value={formik.values.detail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          error={formik.touched.detail && Boolean(formik.errors.detail)}
          helperText={formik.touched.detail && formik.errors.detail}
          multiline
          rows={4}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="creator"
          name="creator"
          label="Memory Creator"
          value={formik.values.creator}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          error={formik.touched.creator && Boolean(formik.errors.creator)}
          helperText={formik.touched.creator && formik.errors.creator}
          required
          fullWidth
        />
        <Select
          className={`basic-multi-select  ${
            Boolean(formik.errors.tags) &&
            formik.touched.tags &&
            "border border-red-500"
          }
           rounded-md `}
          classNamePrefix="select"
          value={formik.values.tags}
          id="tags"
          options={optionsToDisplay}
          name="tags"
          isMulti
          onChange={(event) => formik.setFieldValue("tags", event)}
          onBlur={(event) => formik.setFieldTouched("tags", event)}
        />
        {Boolean(formik.errors.tags) && formik.touched.tags && (
          // <FormHelperText>
          <Typography color="error" className={classes.helperText}>
            {formik.errors.tags}
          </Typography>
          // </FormHelperText>
        )}
        <div
          className={`block flex items-center space-x-5 mt-5 border ${
            Boolean(formik.errors.media) && formik.touched.media
              ? "border-red-500"
              : "border-gray-300"
          } rounded p-2`}
        >
          {filePreview && (
            <>
              <div className="flex space-x-2 items-center">
                <div>
                  <IconButton
                    onClick={() => {
                      setFilePreview("");
                      formik.setFieldValue("media", "");
                    }}
                    size="small"
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </div>
                <Avatar
                  alt="File Preview"
                  src={filePreview}
                  className={classes.large}
                />
              </div>
              <Divider orientation="vertical" flexItem />
            </>
          )}
          <FileBase
            type="file"
            multiple={false}
            name="media"
            onDone={({ base64 }) => {
              formik.setFieldValue("media", base64);
              setFilePreview(base64);
            }}
            onBlur={(event) => formik.setFieldTouched("media", event)}
            onChange={(event) => formik.setFieldTouched("media", event)}
          />
        </div>
        {Boolean(formik.errors.media) && formik.touched.media && (
          // <FormHelperText>
          <Typography color="error" className={classes.helperText}>
            {formik.errors.media}
          </Typography>
          // </FormHelperText>
        )}

        {!formik.isSubmitting ? (
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        ) : (
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            disabled
          >
            Submitting <Spinner />
          </Button>
        )}
        {!Boolean(state) && (
          <Button
            className={`${classes.btn} ${classes.reset}`}
            variant="contained"
            color="secondary"
            onClick={formik.handleReset}
            disabled={formik.isSubmitting}
          >
            clear
          </Button>
        )}
      </form>
    </Container>
  );
};

export default Create;
