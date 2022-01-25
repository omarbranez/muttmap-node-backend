import React, {useState} from 'react'
import ReportMap from './reportMap'
import Modal from 'react-modal'

const ReportModal = (props) => {

    const [showModal, setShowModal] = useState(false)

    return(
        <div>
            <h2 className='grow' style={{color:'blue'}} onClick={()=> setShowModal(!showModal)}>{props.name}, the {props.breed}</h2>
            <p>on: {props.created}</p>
            <Modal
                isOpen={showModal}>
                {showModal ? <button onClick={()=>setShowModal(!showModal)}>Close Window</button> : null }
                {showModal ? <h2>{props.name}</h2> : null }
                {props.user.id === props.user_id ? <p>Reported by: You!</p> : <p>Reported by: {props.username}</p>}
                <p>Breed: {props.breed}</p>
                <p>Color: {props.color}</p>
                <p>Age: {props.age}</p>
                <p>Features: {props.features}</p>
                <p>Demeanor: {props.demeanor}</p>
                <img className="photo" src={props.photo.url}/>
                <p>Location:</p>
                <div>
                    < ReportMap lat={props.lat} lng={props.lng}/>
                </div>
            </Modal>
        </div>
    )
}

export default ReportModal