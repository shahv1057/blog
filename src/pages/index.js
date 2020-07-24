import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/Layout"
import Header from "../components/Header"

export default ({ data }) => {
  return (
    <Layout title="Home">
      <div style={{fontFamily: "New Century Schoolbook", marginLeft: "25px"}}>
        <h1>My Blog</h1>
        <h5>
          {
            data.allMarkdownRemark.edges.filter(
              ({ node }) => !node.frontmatter.draft
            ).length
          }{" "}
          {data.allMarkdownRemark.edges.filter(
            ({ node }) => !node.frontmatter.draft
          ).length > 1
            ? "Posts"
            : "Post"}
        </h5>
        {data.allMarkdownRemark.edges
          .filter(({ node }) => !node.frontmatter.draft)
          .map(({ node }) => (
            <div key={node.id} style={{float: "left", width: "90%", lineHeight:"200%"}}>
              <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <div style={{float: "left", marginRight: "15px",}}>
                  {node.frontmatter.coverimage
                    ? <img src={node.frontmatter.coverimage} height="200" width="250" margin-right="10px"/>
                    : <img src="/Plots/IMG_2371.jpg" height="150" width="200" margin-right="10px"/>}       
                </div>
                <div style={{marginTop: "10px"}}          
                css={css`
                      color: black;
                      font-size: 35px;
                      text-decoration: none;
                      font-weight: bold;
                      margin-left: 10px;
                      
                    `}
                > 
                  {node.frontmatter.title}{" "}
                  <br/>
                  <span
                    css={css`
                      color: hsla(0,0%,50%,0.7);
                      font-size: 20px;
                      text-decoration: none;
                      
                    `}
                  >
                    {node.frontmatter.date}
                  </span>
                  <br/>
                  <p
                 css={css`
                  font-size: 19px;
                  text-decoration: none;
                  font-weight: 100;
                  line-height: 150%;
                    `}>
                  {node.frontmatter.description
                  ? node.frontmatter.description
                  : node.excerpt}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            draft
            description
            coverimage
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
