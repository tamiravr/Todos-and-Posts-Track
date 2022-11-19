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
        <div style={{width :"300px", border : "orange 1px solid"}}>
            <label><strong>User {checkIfNewUser()}'s Posts</strong></label>
            <input type="button" value="Add Post" onClick={() => sendUserIdIfAddBtnClicked(checkIfNewUser())}/>
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