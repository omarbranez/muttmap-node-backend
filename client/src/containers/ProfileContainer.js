import React, { useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReports } from '../actions/reportActions'
import ReportModal from '../components/report/reportModal'

// import Report from '../components/report/report'

const ProfileContainer = (props) => {
    // const navigate = useNavigate()
    // const [showModal, setShowModal] = useState(false)
    const params = useParams()
    const { username } = params
    console.log(params)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    return(
        <div>
            <h1>Welcome Back, {props.user.username}</h1>
            <h2>You have made {props.reports.length} reports</h2>
            <div>
                {props.reports.map((report) => <ReportModal key={report.id} {...report} user={props.user}/>)}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    reports: state.reports.reports.filter((report) => report.user_id == state.user.id ),
    user: state.user
})
export default connect(mapStateToProps, {getReports})(ProfileContainer)