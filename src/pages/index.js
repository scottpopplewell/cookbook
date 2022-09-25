import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allPosts = data.allContentfulRecipe.nodes

  const emptyQuery = ""

  const [state, setState] = React.useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    const query = event.target.value
    const posts = data.allContentfulRecipe.nodes || []

    const filteredData = posts.filter(post => {
      const { description, title } = post
      const tags = post.metadata.tags.map(function(tag) {
        return tag['name'];
      });
      return (
        (description && description.toLowerCase().includes(query.toLowerCase())) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags &&
          tags
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase()))
      )
    })

    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts
  
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <input
        type="text"
        className="post-search"
        aria-label="Search"
        placeholder="Type to filter recipes..."
        onChange={handleInputChange}
      />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title

          return (
            <li key={post.id}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={"/recipes/" + post.id} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.createdAt}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.description
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}
  

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe {
      nodes {
        metadata {
          tags {
            name
          }
        }
        description
        title
        id
        createdAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
