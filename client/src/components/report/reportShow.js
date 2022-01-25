import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { setSelectedReport, unsetSelectedReport, addLiked, undoLiked, deleteComment, addComment } from '../../actions/reportActions'
import ReportMap from './reportMap'
import ReportReactionButton from './reportReactionButton'
import CommentForm from '../comments/commentForm'
import CommentIndex from '../comments/commentIndex'

const ReportShow = ({ 
    addLiked, 
    undoLiked, 
    setSelectedReport, 
    unsetSelectedReport, 
    deleteComment, 
    id, 
    user,
    user_id,
    breed,
    name,
    color,
    gender,
    lat,
    lng,
    age,
    features,
    demeanor,
    photo,
    created,
    reactions,
    comments,
    liked,
    like_id, 
    commented}) => {
    
    const {reportId} = useParams()

    useEffect(()=> {
        id ? setSelectedReport(id) : setSelectedReport(reportId)
        return unsetSelectedReport
    }, [setSelectedReport, reportId, unsetSelectedReport])

    const handleClick = () => {
        liked ? undoLiked(like_id, id) : addLiked(user.id, id) 
    }

    const handleDelete = (e, userId, comment) => {
        e.preventDefault()
        console.log(userId, comment)
        userId === comment.user_id ? deleteComment(id, comment.id) : alert("You cannot delete someone else's comment!")
    }

    const loadedReport = () => 
        <div>
            <h2>{name}, the {breed}</h2>
            <p>on: {created}</p>
            <div onClick={handleClick} style={{display: 'inline-block', margin: '0 auto'}}>
                <ReportReactionButton user={user} userId={user.id} reportId={id} liked={liked} reactions={reactions}/>
            </div>
                {user.id === user_id ? <p>Reported by: You!</p> : <p>Reported by: {user.username}</p>}
                <p>Breed: {breed}</p>
                <p>Color: {color}</p>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
                <p>Features: {features}</p>
                <p>Demeanor: {demeanor}</p>
                <img className="photo" src={photo.url} style={{maxWidth: '30%', height:'auto'}}/>
                <p>Location:</p>
            <div>
                < ReportMap lat={lat} lng={lng} />
            </div>
            <div>
                <CommentForm user={user} reportId={id} commented={commented}/>
            </div>
            <div>
                <CommentIndex user={user} comments={comments} handleDelete={handleDelete}/>
            </div>
        </div>


    return id ? loadedReport() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    ...state.reports.selectedReport,
    user: state.user,
    reactionsCount: state.reports.reactionsCount,
})

export default connect(mapStateToProps, { setSelectedReport, unsetSelectedReport, addLiked, undoLiked, addComment, deleteComment})(ReportShow)