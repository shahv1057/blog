import React from "react"
import ContactForm from "../components/ContactForm"
import Layout from "../components/Layout"

export default function Contact() {
  return (
    <Layout title="Contact">
      <div style={{ marginLeft: "130px", marginRight: "130px" }}>
        <h1>Contact</h1>
        <p>
          <strong>
            I would love to hear any of your comments, questions, or feedback!{" "}
          </strong>
        </p>
        <div
          style={{
            display: "flex",
            marginLeft: "80px",
            marginTop: "40px",
            marginRight: "40px",
          }}
        >
          <img
            src="/Plots/coding-stock-pic.png"
            height="300"
            margin-right="80px"
          ></img>
          <ContactForm></ContactForm>
        </div>
      </div>
    </Layout>
  )
}
