import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { setSelectedReport, unsetSelectedReport, addLiked, undoLiked, deleteComment, addComment } from '../../actions/reportActions'
import ReportMap from './reportMap'
import ReportReactionButton from './reportReactionButton'
import CommentForm from '../comments/commentForm'
import CommentIndex from '../comments/commentIndex'

const ReportShow = ({ 
    // addLiked, 
    // undoLiked, 
    // setSelectedReport, 
    // unsetSelectedReport, 
    // deleteComment, 
report, user
    // created,
    // reactions,
    // comments,
    // liked,
    // like_id, 
    // commented
}) => {

    const dispatch = useDispatch()
    
    const {reportId} = useParams()

    
    useEffect(()=> {
        setSelectedReport(reportId, dispatch)
        // return unsetSelectedReport
    }, [])
    
    const {     
        _id, 
        createdBy,
        breed,
        name,
        color,
        gender,
        lat,
        lng,
        age,
        features,
        demeanor,
        imageUrl,} = report
    // const handleClick = () => {
    //     liked ? undoLiked(like_id, _id) : addLiked(user._id, _id) 
    // }

    // const handleDelete = (e, userId, comment) => {
    //     e.preventDefault()
    //     console.log(userId, comment)
    //     createdBy._id === comment.createdBy._id ? deleteComment(_id, comment._id) : alert("You cannot delete someone else's comment!")
    // }
    const loadedReport = () => 
        <div style={{marginTop:"10vh"}}>
            <h2>{name}, the {breed.name}</h2>
            {/* <p>on: {created}</p> */}
            {/* <div onClick={handleClick} style={{display: 'inline-block', margin: '0 auto'}}>
                <ReportReactionButton user={user} userId={user.id} reportId={_id} liked={liked} reactions={reactions}/>
            </div> */}
                {user._id === createdBy._id ? <p>Reported by: You!</p> : <p>Reported by: {user.username}</p>}
                <p>Breed: {breed.name}</p>
                <p>Color: {color}</p>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
                <p>Features: {features}</p>
                <p>Demeanor: {demeanor}</p>
                <img className="photo" src={imageUrl} style={{maxWidth: '30%', height:'auto'}}/>
                <p>Location:</p>
            <div>
                < ReportMap lat={lat} lng={lng} />
            </div>
            {/* <div>
                <CommentForm user={user} reportId={_id} commented={commented}/>
            </div>
            <div>
                <CommentIndex user={user} comments={comments} handleDelete={handleDelete}/>
            </div> */}
        </div>


    return _id ? loadedReport() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    report: state.reports.selectedReport,
    user: state.user.user,
    // reactionsCount: state.reports.reactionsCount,
})

export default connect(mapStateToProps, { setSelectedReport, unsetSelectedReport, addLiked, undoLiked, addComment, deleteComment})(ReportShow)