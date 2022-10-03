import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import RecipeBody from "../components/recipeBody"
import RecipeImages from "../components/recipeImages"
import RecipeIngredients from "../components/recipeIngredients"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulRecipe
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const comments = data.allContentfulRecipeComment.nodes
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.description}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 itemProp="headline">{post.title}</h2>
        </header>
        <section>
          <div className="row">
            <dt className="col-sm-3">Author</dt>
            <dd className="col-sm-9">{post.author}</dd>
            <dt className="col-sm-3">Date</dt>
            <dd className="col-sm-9">{post.createdAt}</dd>            
            <dt className="col-sm-3">Servings</dt>
            <dd className="col-sm-9">{post.size}</dd>
          </div>
        </section>
        <RecipeImages images={post.images}/>
        <RecipeIngredients ingredients={post.ingredients} />
        <RecipeBody body={post.body.childMarkdownRemark.html}/>
        <h4>History</h4>
        <ul>
          {comments.map(comment => {
            const date = comment.date
            const commentBody = comment.body.body

            return (
              <li>{date} - {commentBody}</li>
            )
          })}
        </ul>     
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"/recipes/" + previous.id} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/recipes/" + next.id} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query RecipeBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulRecipe(id: {eq: $id}) {
      id
      size
      title
      createdAt(formatString: "MMMM DD, YYYY")
      description
      author
      images {
        id
        file {
          url
        }        
        gatsbyImageData
      }      
      body {
        childMarkdownRemark {
          html
        }
      }
      ingredients {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulRecipeComment(
      filter: {recipe: {elemMatch: {id: {eq: $id}}}}
      sort: {fields: date, order: ASC}
    ) {
      nodes {
        id
        date(formatString: "MMMM, YYYY")
        body {
          body
        }
      }
    }
    previous: contentfulRecipe(id: {eq: $previousPostId}) {
      id
      size
      title
      createdAt
      description
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    next: contentfulRecipe(id: {eq: $nextPostId}) {
      id
      size
      title
      createdAt
      description
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
