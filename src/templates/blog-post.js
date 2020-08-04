import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"

export default ({ data }) => {
  // console.log(data)
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={
          post.frontmatter.description
            ? post.frontmatter.description
            : post.excerpt
        }
      />
      <div
        style={{
          marginLeft: "130px",
          marginRight: "130px",
          marginBottom: "150px",
        }}
      >
        <h1 className="blog-post-title">{post.frontmatter.title}</h1>
        <span
          css={css`
            margin-bottom: 10px;
          `}
        >
          {!post.frontmatter.draft && post.frontmatter.date}
        </span>
        <br />

        <div
          style={{ marginTop: "20px" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        draft
        description
        coverimage
      }
      excerpt
    }
  }
`
