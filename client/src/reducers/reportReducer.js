const nullReport = {
    // id: null,
    // user_id: null,
    // dog_id: null,
    name: '',
    color: '',
    gender: '',
    lat: null,
    lng: null,
    age: null,
    features: '',
    imageUrl: null,
    demeanor: ''
    // created: '',
    // liked: false,
    // like_id: null,
    // commented: false,
    // comment_id: null,
    // reactions: [],
    // comments: []
}

const initialState = {
    reports: [],
    liked: false,
    commented: false,
    selectedReport: nullReport,
    loading: false,
}

const reportReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOADING_REPORTS":
            return {
                ...state,
                reports: [...state.reports],
                loading: true,
            }
        case "ADD_REPORTS":
            return {
                ...state, 
                reports: action.payload,
                loading: false,
            }
        case "SET_SELECTED_REPORT": 
            console.log(action.payload)
            return {...state, selectedReport: action.payload, loading: false}
                // liked: action.payload.liked, commented: action.payload.commented, loading: false}
        case "UNSET_SELECTED_REPORT":
            return {...state, selectedReport: nullReport}
        case "REPORT_FORM_CHANGE":
            return { ...state, reportForm: {
                ...state.reportForm,
                [action.payload.name]: action.payload.value
            }
        }
        case "TOGGLE_SHOW_WINDOW":
            const toggledReport = state.reports.find((report) => report.id == action.payload)
            toggledReport.show = !toggledReport.show
            return { ...state,
                    reports: [
                        ...state.reports.slice(0, toggledReport), ...state.reports.slice(toggledReport + 1)
                    ]
            }
        default: 
            return {...state}
    }

}

export default reportReducer
