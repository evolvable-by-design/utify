import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

import Input from "@material-ui/core/Input";

import Grid from "@material-ui/core/Grid";

import API from "../../utils/API";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2,
    width: "40%",
    marginLeft: "20%",
    marginTop: "-1.5em"
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  inputPosition: {
    marginLeft: "30px"
  }
});

class Chips extends React.Component {
  state = {
    chipData: [],
    chip: "",
    userid: localStorage.getItem("userid")
  };

  componentDidMount() {
    this.loadChipData();
  }

  loadChipData = () => {
    API.passUserIdGetChipData({
      userid: this.state.userid
    })
      .then(res => {
        console.log(res.data[0].chips);
        let chipData = res.data[0].chips;
        this.setState({ chipData }, () => {
          console.log("updated chip data " + this.state.chipData[0]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    let chip = this.state.chip;
    chip = e.currentTarget.value;
    this.setState({ chip }, () => {
      console.log(this.state.chip);
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.chip);

    API.passUserChip({
      chip: this.state.chip,
      userid: this.state.userid
    }).then(() => {
      this.loadChipData();
      let chip = "";
      this.setState({ chip });
    });
  };

  handleDelete = data => () => {
    if (data.label === "Music Videos") {
      alert("Why would you want to delete Music Videos?! :)"); // eslint-disable-line no-alert
      return;
    }

    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" alignItems="center" justify="center">
        <Paper className={classes.root}>
          {this.state.chipData.map(data => {
            let icon = null;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return (
              <Chip
                key={data._id}
                icon={icon}
                label={data.label}
                onDelete={this.handleDelete(data)}
                className={classes.chip}
              />
            );
          })}
        </Paper>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Enter your tag"
            className={classes.input}
            inputProps={{
              "aria-label": "Description"
            }}
            className={classes.inputPosition}
            onChange={this.handleChange}
            value={this.state.chip}
          />
        </form>
      </Grid>
    );
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chips);
