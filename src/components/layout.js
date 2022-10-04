import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const data = useStaticQuery(graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteRepo
        social {
          twitter
        }
      }
    }
  }
`)

  let header = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  )
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href={"https://twitter.com/" + data.site.siteMetadata.social.twitter}>a busy dude</a>.
        {` `}
        See the source <a href={data.site.siteMetadata.siteRepo}>here</a>
      </footer>
    </div>
  )
}

export default Layout
