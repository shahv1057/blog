import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/Layout"

export default ({ data }) => {
  return (
    <Layout title="Home">
      <div>
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
            <div key={node.id}>
              <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <h3
                  css={css`
                    margin-bottom: ${rhythm(1 / 3)};
                    color: Black;
                    text-decoration: none;
                  `}
                >
                  {node.frontmatter.title}{" "}
                  <span
                    css={css`
                      color: hsla(0,0%,50%,0.7);
                      font-size: 23px;
                      text-decoration: none;
                      
                    `}
                  >
                    — {node.frontmatter.date}
                  </span>
                </h3>
                <p>{node.description}</p>
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
