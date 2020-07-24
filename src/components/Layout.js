import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import SEO from "./seo"
import SocialIcons from "./SocialIcons"
import Header from "./Header"
import { css } from "@emotion/core"
import { steelblue } from "color-name"

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
    <div style={{ margin: `3rem auto`, maxWidth: 1300, padding: `0 1em` }}>
      <SEO
        title={title || data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
      />
      <header style={{ marginBottom: `3rem`, backgroundColor: `whitesmoke`,textAlign: "center"}}>
        <Link to="/" style={{ backgroundColor: `none` }}>
          <h1 style={{color: "black", fontSize: "290%", fontFamily: "American Typewriter"}}>
            {data.site.siteMetadata.title}
          </h1>
        </Link>

        <ul
          style={{
            listStyle: `none`,
            float: `right`,
            border: `none`,
            fontSize: "120%",
            fontFamily: "American Typewriter",
          }}
        >
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about">About</ListLink>
          <ListLink to="/contact">Contact</ListLink>
        </ul>
        <SocialIcons />
        {/* <Header /> */}
      </header>


      {children}
      <footer>
      {/* <div style={{textAlign:'center', float:'center', */}
      {/* clear: "left", marginTop: `3rem`, backgroundColor: `whitesmoke`,textAlign: "center", lineHeight:'10px'}}> */}
      <li style={{
      width: "100%", 
      height:"270px",
      display: `flex`,  
      backgroundColor: "whitesmoke",
      alignItems: "flex-end",
      justifyContent: "space-between",
      }}
      >
      <SocialIcons style={{alignItems: "flex-end"}}></SocialIcons>
      <div style={{alignItems: "center",marginBottom:'35px',textAlign: "center"}}>
      {/* <img src="/logo.png" width="100" marginBottom='10px' ></img> */}
      <h3 style = {{}}>Contact Me</h3>
      <form action="https://www.flexyform.com/f/741fb57755e870b536ff3891610201ea6ef4f9cd" method="post" enctype="text/plain">
        <textarea placeholder="Name" rows="1" cols="24" name="comment" form="usrform" fontSize='40px'></textarea>
        <textarea placeholder="Email" rows="1" cols="24" name="comment" form="usrform" ></textarea>
        <br/>
        <textarea placeholder="Type your message here..." rows="3" cols="50" name="comment" form="usrform"></textarea>
        <div style={{marginTop: '.2rem',textAlign: 'center'}}>
          <button type="submit" style={{backgroundColor:"steelblue", color:"white",cursor:'pointer'}} className="button special">Submit</button>
        </div>
      </form>
      </div>
 
      <div style={{alignItems: "flex-end",marginRight:'15px'}}>
      <img src="/logo.png" width="50" marginBottom='10px' marginRight='10px' ></img>

      {/* Email: <a href="mailto:shahv1057@gmail.com"> shahv1057@gmail.com</a> */}
      </div>


      </li>

      </footer>
    </div>
  )
}
// TODO: add headers, footers, global nav, sidebars
