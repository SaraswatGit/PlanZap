import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Axios from "axios";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, emails } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  console.log(emails);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Movie</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails
          ? emails.map((email) => (
              <ListItem
                button
                onClick={() => handleListItemClick(email.imdb_id)}
                key={email.imdb_id}
              >
                <ListItemText primary={email.title} />
              </ListItem>
            ))
          : null}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  emails: PropTypes.array,
};

export default function SimpleDialogDemo({ title, setIMDB, setDescription }) {
  const [emails, setEmails] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  // React.useEffect(() => {
  //   if (typeof emails !== undefined) {
  //     setEmails(sendRequest(title).results);
  //   }
  // }, [title, emails]);

  const handleClickOpen = async () => {
    var options = {
      method: "GET",
      url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${title}/`,
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_PUBLIC_IMDB_API_KEY,
      },
    };

    // var data;
    const data = await Axios.request(options)
      .then((res) => {
        return res.data;
      })
      .catch((e) => e);
    setEmails(data.results);
    setOpen(true);
  };

  const handleClose = async (value) => {
    setOpen(false);
    setSelectedValue(value);
    var options = {
      method: "GET",
      url: `https://data-imdb1.p.rapidapi.com/movie/id/${value}/`,
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "4d9a5d0385msh520a8009f617595p1ac0c4jsn66f1251519a3",
      },
    };

    const response = await Axios.request(options)
      .then((res) => {
        return res.data;
      })
      .catch((e) => e);
    const details = response.results;
    setIMDB(details.rating);
    setDescription(details.description);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br /> */}
      <Button onClick={handleClickOpen}>Search</Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        emails={emails}
      />
    </div>
  );
}
