import { useSelector } from 'react-redux'
import Blog from '../Blog/Blog'

const BlogList = ({ user }) => {
  const { blogs } = useSelector((state) => {
    return state.blogs
  })

  if (!blogs?.length) {
    return <p>loading...</p>
  }

  const filterBlogs = [...blogs].sort((blogA, blogB) => {
    return blogB.likes - blogA.likes
  })

  return (
    <ul>
      {filterBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </ul>
  )
}

export default BlogList
