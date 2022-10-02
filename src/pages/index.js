import React, { useState } from 'react';
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Tag from "../components/tag"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allPosts = data.allContentfulRecipe.nodes
  
  const emptyQuery = ""

  const [filteredData, setFilteredData] = useState(data.allContentfulRecipe.nodes || []);
  const [selectedTags, setSelectedTags] = useState([]);
  const [query, setQuery] = useState(emptyQuery);

  const updateFilteredPosts = () => {
    const posts = data.allContentfulRecipe.nodes || []
    const filteredPosts = posts.filter(post => {
      const { description, title } = post
      const tags = post.metadata.tags.map(function(tag) {
        return tag['name'];
      });
      const hasAllSelectedTags = selectedTags.every(v => tags.includes(v))
      return (
        hasAllSelectedTags &&
        ((description && description.toLowerCase().includes(query.toLowerCase())) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags &&
           tags
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase())))
      )
    })

    setFilteredData(filteredPosts);
  }

  const handleInputChange = event => {
    const targetQuery = event.target.value
    setQuery(targetQuery);
    updateFilteredPosts();
  }

  const updateSelectedTags = (isSelected, tagName) => {
    const index = selectedTags.indexOf(tagName);
    if(isSelected) {
      if(index === -1) {
        selectedTags.push(tagName);
      }
    } else {
      if(index > -1) {
        selectedTags.splice(index, 1);
      }
    }
    setSelectedTags(selectedTags);
    updateFilteredPosts();
  }

  var tags = []
  allPosts.map(post => {
    return post.metadata.tags.map(function(tag) {
      if(!tags.includes(tag['name'])) {
        tags.push(tag['name']);
      }
    })
  });
  
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />

      <div className="my-2">
        {tags.map(tag => {
          return (<Tag parentFunction={updateSelectedTags} name={tag}/>)
        })}
      </div>

      <input
        type="text"
        className="post-search"
        aria-label="Search"
        placeholder="Type to filter recipes..."
        onChange={handleInputChange}
      />

      <div>
        {filteredData.map(post => {
          const title = post.title

          return (
            <div>
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
                  <small>{post.author} — {post.createdAt}</small>
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
            </div>
          )
        })}
      </div>
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
        author
        title
        id
        createdAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
