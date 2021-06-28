import { useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

//pass in post id and comment ref from comment
const CommentForm = ({ post_id, comment_ref }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (value, post_id, comment_ref) => {
    //convert comment values to key value pairs
    const textObject = {
      text: value,
    };

    const idObject = {
      post_id: post_id,
    };

    const refObject = {
      comment_ref: comment_ref,
    };

    const dateObject = {
      date: new Date().toUTCString(),
    };
    //combine all objects and send to api
    const comment = Object.assign(idObject, refObject, dateObject, textObject);

    const res = await fetch("/api/createComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  };

  return (
    <div>
      <TextField
        id="outlined-textarea"
        label="Multiline Placeholder"
        placeholder="Placeholder"
        multiline
        variant="outlined"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Button onClick={() => handleSubmit(value, post_id, comment_ref)}>
        Save
      </Button>
    </div>
  );
};

export default CommentForm;
