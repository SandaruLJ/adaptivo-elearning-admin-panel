import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFetch } from "../../components/useFetch";
import { addConcept, getAllConcepts } from "../../service/concept.service";
import Select from "../Select/SelectBox";
import "./DialogComponent.css";
let concepts = [];

const DialogComponent = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const { loading, data } = useFetch(getAllConcepts);

  React.useImperativeHandle(ref, () => ({
    handleClickOpen() {
      handleClickOpen();
    },
  }));
  React.useEffect(() => {
    data &&
      data.map((concept, i) => {
        concepts.push({
          value: concept._id,
          label: concept.name,
        });
      });
  }, [data]);

  React.useEffect(() => {
    concepts = [];
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleOkay = () => {
    const concept = data.filter((elem) => elem._id == value);
    props.setValue(concept[0]);
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogTitle>Select Concept</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select a concept</DialogContentText>
          <Select value={value} id="concept" name="concept" onChange={handleChange} placeholder={"Select a concept"} hideLabel={true} values={concepts} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOkay} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export default DialogComponent;
