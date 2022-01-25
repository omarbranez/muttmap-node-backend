import React from 'react'
import Tooltip from '@mui/material/Tooltip'

const ReportReactionButton = ({reactions, liked}) => {

    const usersWhoLiked = () => {
        return reactions.map(reaction => reaction.username)
    }

    return (
        <div>
            <Tooltip title={`People who have liked this: ${usersWhoLiked()}`}   placement='right-start'>
            <div style={{boxSizing: 'content-box', width: '100%', border: 'solid #5B6DCD 10px', margin: 'auto', background: `${liked ? 'coral' : 'white' }`}}>
                <img src='/reaction.png' height={'40rem'} />
                {reactions.length > 0 ? <p style={{display: 'inline-block'}}>{reactions.length} {reactions.length == 1 ? 'user liked this' : 'users liked this'} </p> : <p style={{display: 'inline-block'}}>Be the first user to like this!</p>}
                {liked ? <p>Click to Unlike</p> : <p>Click to Like</p>}
            </div>
            </Tooltip>
        </div>
    )
}

export default ReportReactionButton