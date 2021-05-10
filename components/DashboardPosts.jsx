import DashboardPost from './DashboardPost'

// pass down posts from database through posts.js to PostList as a prop
const DashboardPosts = ({posts}) => {
    return (
        <div>
            {/* for each post in posts data create a new PostItem component */}
            {/* pass in each post as a prop to PostItem */}
            {posts.map((post) => 
            (<DashboardPost post={post}/>
            ))}
        </div>
    )
}

export default DashboardPosts