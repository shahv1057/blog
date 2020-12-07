import React from "react"
import SocialIcons from "./SocialIcons"

class ContactForm extends React.Component {
  render() {
    const formStyle = {
      textAlign: "center",
      margin: "3%",
      width: "45%",
    }
    const buttonsStyle = {
      marginTop: "2%",
      textAlign: "center",
    }
    return (
      <form
        method="post"
        action="https://www.flexyform.com/f/741fb57755e870b536ff3891610201ea6ef4f9cd"
        style={{
          width: "45%",
          height: "45%",
          margin: "5%",
        }}
      >
        <div
          style={{
            textAlign: "left",
            border: "1%",
            width: "100%",
            height: "100%",
          }}
        >
          <textarea
            style={{ border: "none", width: "100%", height: "10%" }}
            placeholder="Name..."
            rows="1"
            type="text"
            name="fullname"
          ></textarea>
          <br />
          <textarea
            style={{ border: "none", width: "100%" }}
            placeholder="Email..."
            rows="1"
            type="email"
            name="email"
          ></textarea>
          <br />
          <textarea
            style={{ border: "none", width: "100%" }}
            placeholder="Type your message here..."
            rows="4"
            name="comment"
          ></textarea>
          <div
            style={{
              marginTop: ".2rem",
              textAlign: "center",
              width: "100%",
              height: "10%",
            }}
          >
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
