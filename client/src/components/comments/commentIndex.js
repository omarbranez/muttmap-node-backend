import React from 'react'

const CommentIndex = ({comments, user, handleDelete}) => {

    function isEmpty(str) {
        return (!str || str.length === 0 );
    }
    
    return(
        <div>
        {!isEmpty(comments) ? comments.map(comment => 
            <div key={comment.id}>
                <div>
                    <p>On {comment.created}, {comment.username} said:</p>
                    <p>{comment.content} </p>
                    <div>
                        {comment.user_id == user.id && <button onClick={(e) => handleDelete(e, user.id, comment)}>Delete Comment</button>}
                    </div>
                </div>
            </div>) : <p>Be the first to comment!</p>}
        </div>
    )
}

export default CommentIndex