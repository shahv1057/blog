import React from "react"
import ContactForm from "../components/ContactForm"
import Layout from "../components/Layout"

export default function Contact() {
  return (
    <Layout title="Contact">
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <h1>Contact</h1>
        <p>
          I would love to hear any of your comments, questions, or feedback!{" "}
        </p>
        <div
          style={{
            display: "flex",
            marginLeft: "5%",
            marginTop: "5%",
            marginRight: "5%",
          }}
        >
          <img
            src="/Plots/coding-stock-pic.png"
            width="45%"
            height="45%"
            margin-right="10%"
          ></img>
          <ContactForm></ContactForm>
        </div>
      </div>
    </Layout>
  )
}
