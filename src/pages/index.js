import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/Layout"

export default ({ data }) => {
  return (
    <Layout title="Home">
      <div>
        <h4>
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
        </h4>
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
                    margin-bottom: ${rhythm(1 / 4)};
                  `}
                >
                  {node.frontmatter.title}{" "}
                  <span
                    css={css`
                      color: #bbb;
                    `}
                  >
                    — {node.frontmatter.date}
                  </span>
                </h3>
                <p>{node.excerpt}</p>
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
            date(formatString: "DD MMMM, YYYY")
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
