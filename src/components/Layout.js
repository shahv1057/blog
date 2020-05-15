import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import SEO from "./seo"
import SocialIcons from "./SocialIcons"

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
    <div style={{ margin: `3rem auto`, maxWidth: 750, padding: `0 1em` }}>
      <SEO
        title={title || data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
      />
      <header style={{ marginBottom: `3rem` }}>
        <Link to="/" style={{ backgroundImage: `none` }}>
          <h2 style={{ display: `inline`, color: "black" }}>
            {data.site.siteMetadata.title}
          </h2>
        </Link>

        <ul
          style={{
            listStyle: `none`,
            float: `right`,
            border: `none`,
            fontSize: "medium",
          }}
        >
          <ListLink to="/">Home</ListLink>
          <ListLink to="/">Blog</ListLink>
          <ListLink to="/about">About</ListLink>
        </ul>
        <SocialIcons />
      </header>

      {children}
    </div>
  )
}
// TODO: add headers, footers, global nav, sidebars
