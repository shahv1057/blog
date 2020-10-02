import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import SEO from "./seo"
import SocialIcons from "./SocialIcons"
import Header from "./Header"
import { css } from "@emotion/core"
import { steelblue } from "color-name"
import "fontsource-arsenal"
import "fontsource-spectral"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `2rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children, title = undefined }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return (
    <div style={{ marginTop: `3rem auto`, maxWidth: "100%", padding: `0 1em` }}>
      <SEO
        title={title || data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
      />
      <header
        style={{
          marginTop: "40px",
          backgroundColor: `#F1F1F1`,
          textAlign: "center",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <Link
          to="/"
          style={{
            backgroundColor: `none`,
            marginBottom: "2%",
            marginTop: "3%",
          }}
        >
          <h1 className="title">{data.site.siteMetadata.title}</h1>
        </Link>

        <ul className="menu-items">
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about">About</ListLink>
          <ListLink to="/contact">Contact</ListLink>
        </ul>
        <SocialIcons />
        {/* <Header /> */}
      </header>
      <hr
        color="white"
        style={{
          width: "79%",
          marginLeft: "10%",
          marginRight: "10%",
          marginTop: "15px",
        }}
      ></hr>

      <div>{children}</div>
      <div style={{ clear: "both" }}>
        <Footer></Footer>
      </div>

      {/* <footer>      
      <hr style={{width:"79%",marginLeft:"10%", marginRight:"10%"}}></hr>
      <li style={{
      width: "100%", 
      height:"270px",
      display: `flex`,  
      backgroundColor: "#F1F1F1",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginLeft: "10%"
      }}
      >
      <SocialIcons style={{alignItems: "flex-end", marginLeft: "10%"}}></SocialIcons>
      <div style={{alignItems: "center",marginBottom:'35px',textAlign: "center",marginRight: '10%'}}>
      <h3 style = {{fontFamily:"Arsenal"}}>Contact Me</h3>
      <form method="post" action="https://www.flexyform.com/f/741fb57755e870b536ff3891610201ea6ef4f9cd">
        <textarea type='text' style={{border:'none'}} name='fullname' placeholder="Name" rows="1" cols="24" fontSize='40px'></textarea>
        <textarea type="email" style={{border:'none'}} name="_reply_to" placeholder="Email" rows="1" cols="24" ></textarea>
        <br/>
        <textarea style={{border:'none'}} placeholder="Type your message here..." rows="3" cols="50" name="comment" ></textarea>
        <div style={{marginTop: '.2rem',alignItems: 'center'}}>
          <button type="submit" style={{backgroundColor:"#289494", color:"#F1F1F1",cursor:'pointer'}} className="button special">Submit</button>
        </div>
      </form>
      </div>
 
      <div style={{alignItems: "flex-end",marginRight:'280px'}}>
      <img src="/logo.png" width="50" marginBottom='10px' marginRight='10px' ></img>

      </div>


      </li>

      </footer> */}
    </div>
  )
}
// TODO: add headers, footers, global nav, sidebars

const Footer = () => (
  <footer style={{ marginTop: "100px" }}>
    <hr
      style={{
        width: "79%",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "100px",
      }}
    ></hr>
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        marginBottom: "10px",
      }}
    >
      <img
        src="/Plots/Logo.png"
        width="55"
        style={{
          float: "center",
        }}
      ></img>
    </div>
  </footer>
)
