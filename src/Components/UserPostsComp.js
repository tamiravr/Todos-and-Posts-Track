import SinglePostComp from "./SinglePostComp";



export default function UserPostsComp({posts, callback : sendUserIdIfAddBtnClicked})
{

    const checkIfNewUser = () => {
        if (Number.isInteger(posts[0])){
            return posts[0]
        }
        return posts[0].userId
    }

    return (
        <div className="card card-limited">
            <div className="card-header scorlive-header">
                <strong>User {checkIfNewUser()}'s Posts</strong>
                <br/>
                <input className="btn btn-search" type="button" value="Add Post" onClick={() => sendUserIdIfAddBtnClicked(checkIfNewUser())}/>
            </div>
            
            <div>
                {
                    !Number.isInteger(posts[0]) && posts.map(post => {
                        return <SinglePostComp key={post.id} post={post} />
                    })
                }
            </div>
        </div>

    );
}