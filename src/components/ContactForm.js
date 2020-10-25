import React from "react"
import SocialIcons from "./SocialIcons"

class ContactForm extends React.Component {
  render() {
    const formStyle = {
      textAlign: "center",
      margin: "3%",
    }
    const buttonsStyle = {
      marginTop: "2%",
      textAlign: "center",
    }
    return (
      <form
        method="post"
        action="https://www.flexyform.com/f/741fb57755e870b536ff3891610201ea6ef4f9cd"
        height="45%"
        width="45%"
      >
        <div
          style={{
            textAlign: "left",
            border: "1%",
          }}
        >
          <textarea
            style={{ border: "none" }}
            placeholder="Name..."
            rows="1"
            cols="30"
            type="text"
            name="fullname"
            fontSize="40px"
          ></textarea>
          <br />
          <textarea
            style={{ border: "none" }}
            placeholder="Email..."
            rows="1"
            cols="30"
            type="email"
            name="email"
          ></textarea>
          <br />
          <textarea
            style={{ border: "none" }}
            placeholder="Type your message here..."
            height="100%"
            name="comment"
          ></textarea>
          <div style={{ marginTop: ".2rem", textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#289494",
                color: "white",
                cursor: "pointer",
              }}
              className="button special"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default ContactForm
