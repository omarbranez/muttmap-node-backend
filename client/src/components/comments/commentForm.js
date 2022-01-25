import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../actions/reportActions'

const CommentForm = ({commented, user, reportId}) => {

    const dispatch = useDispatch()
    const [ content, setContent ] = useState('')

    const handleSubmit = (e, content) => {
        console.log(content)
        e.preventDefault()
        dispatch(addComment(user.id, reportId, content))
        setContent('')
    }

    return(
        <div>
        <h2>Submit a Comment</h2>
        <form onSubmit={(e) => handleSubmit(e, content)}> 
            <h3>Commenting as {user.username} </h3>
            <input type="textarea" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
            <input type="submit" value="Post Comment"/>
        </form>
        </div>
    )
}

export default CommentForm