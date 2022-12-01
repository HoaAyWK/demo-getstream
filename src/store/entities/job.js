import { createSlice, combineReducers, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { ACTION_STATUS, apiUrl } from "../../common/consts";
import api from '../../app/api';

const initialGetJobsState = {
    jobs: [],
    status: ACTION_STATUS.IDLE
};

export const  getJobs = createAsyncThunk(
    'jobs/getJobs',
    async () => {
        const { data } = await api.get('/job/show');
        console.log(data);
        return data;
    }
);

const getJobsSlice = createSlice({
    name: 'getJobs',
    initialState: initialGetJobsState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state, action) => {
                state.action = ACTION_STATUS.LOADING;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.action = ACTION_STATUS.SUCCESSEED;
                state.jobs = action.payload.jobs;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.action = ACTION_STATUS.FAILED;
            });
    }
});

const initialGetMyJobsState = {
    jobs: [],
    status: ACTION_STATUS.IDLE,
    message: ''
};


export const getMyJobs = createAsyncThunk(
    'jobs/myJobs',
    async () => {
        const { data } = await api.get('/job/my');

        return data;
    }
);

const myJobsSlice = createSlice({
    name: 'myJobs',
    initialState: initialGetJobsState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyJobs.pending, (state, action) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(getMyJobs.fulfilled, (state, action) => {
                state.status = ACTION_STATUS.SUCCESSEED;
                state.jobs = action.payload.jobs;
            })
            .addCase(getMyJobs.rejected, (state, action) => {
                state.status = ACTION_STATUS.FAILED;
            })
    }
});

// query jobs
const initStateQueryJobs = {
    loadingQueryJobs: false,
    successQueryJobs: false,
    results: [],
    categories: [],
    totalPages: 0
}

export const queryJobsAction = createAsyncThunk(
    "query jobs",
    async (dataQuery) => {
        /* const {data} = await axios.get(`${apiUrl}/jobs/search?name=${dataQuery.name}&status=${dataQuery.status}&sortBy=${dataQuery.sortBy}&limit=${dataQuery.limit}&page=${dataQuery.page}&exclude=${dataQuery.exclude}`) */
        const {data} = await axios.get(`${apiUrl}/search/search?&status=${dataQuery.status}&limit=${dataQuery.limit}&page=${dataQuery.page}`)
        console.log(data)
        return data
    }
)

export const queryJobsSlice = createSlice({
    initialState: initStateQueryJobs,
    name: "query jobs",
    extraReducers: (builder) => {
        builder.addCase(queryJobsAction.pending, (state)=>{
            state.loadingQueryJobs = true
        })
        builder.addCase(queryJobsAction.fulfilled, (state, data) => {
            state.loadingQueryJobs = false
            state.successQueryJobs = data.payload.success
            state.results = data.payload.results
            state.categories = data.payload.categories
            state.totalPages = data.payload.totalPages
            state.totalResults = data.payload.totalResults
        })
        builder.addCase(queryJobsAction.rejected, (state, data) => {
            state.loadingQueryJobs = false
            state.successQueryJobs = false
        })
    }
})


// get job by id
const initStateGetJobById = {
    loadingGetJobById: false,
    successGetJobById: false,
    job: {},
    user: {}
}

export const getJobByIdAction = createAsyncThunk(
    "get job by id",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/jobs/${id}`)

        return data
    }
)

export const getJobByIdSlice = createSlice({
    initialState: initStateGetJobById,
    name: "get job by id",
    extraReducers: (builder) => {
        builder.addCase(getJobByIdAction.pending, (state)=>{
            state.loadingGetJobById = true
        })
        builder.addCase(getJobByIdAction.fulfilled, (state, data) => {
            state.loadingGetJobById = false
            state.successGetJobById = data.payload.success
            state.job = data.payload.job
            state.user = data.payload.user
        })
        builder.addCase(getJobByIdAction.rejected, (state, data) => {
            state.loadingGetJobById = false
            state.successGetJobById = false
        })
    }
})

// delete job by id
const initStateDeleteJobById = {
    loadingDeleteJobById: false,
    successDeleteJobById: false,
    message: ''
}

export const deleteJobByIdAction = createAsyncThunk(
    "delete job by id",
    async (id) => {
        const {data} = await axios.delete(`${apiUrl}/jobs/${id}`)

        return data
    }
)

export const deleteJobByIdSlice = createSlice({
    initialState: initStateDeleteJobById,
    name: "delete job by id",
    extraReducers: (builder) => {
        builder.addCase(deleteJobByIdAction.pending, (state)=>{
            state.loadingDeleteJobById = true
        })
        builder.addCase(deleteJobByIdAction.fulfilled, (state, data) => {
            state.loadingDeleteJobById = false
            state.successDeleteJobById = data.payload.success
            state.message = data.payload.message
        })
        builder.addCase(deleteJobByIdAction.rejected, (state, data) => {
            state.loadingDeleteJobById = false
            state.successDeleteJobById = false
        })
    }
})

// get my jobs - employer
const initStateGetMyJobs = {
    loadingGetMyJobs: false,
    successGetMyJobs: false,
    resultsOpen: [],
    categoriesOpen: [],
    offersOpen: [],
    totalResultsOpen: 0,
    totalPagesOpen: 0
}

export const getMyJobsAction = createAsyncThunk(
    "get my jobs - employer",
    async (queryData) => {
        try{
            const config = {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('job')}`
                }
            }
            const {data} = await axios.get(`${apiUrl}/my/jobs?status=Open&limit=${queryData.limit}&page=${queryData.page}`, config)
            return data
        }
        catch(error){
            console.log(error)
        }
    }
)

export const getMyJobsSlice = createSlice({
    initialState: initStateGetMyJobs,
    name: "get my jobs - employer",
    extraReducers: (builder) => {
        builder.addCase(getMyJobsAction.pending, (state)=>{
            state.loadingGetMyJobs = true
        })
        builder.addCase(getMyJobsAction.fulfilled, (state, data) => {
            state.loadingGetMyJobs = false
            state.successGetMyJobs = data.payload.success
            state.resultsOpen = data.payload.results
            state.categoriesOpen = data.payload.categories
            state.offersOpen = data.payload.offers
            state.totalResultsOpen = data.payload.totalResults
            state.totalPagesOpen = data.payload.totalPages
        })
        builder.addCase(getMyJobsAction.rejected, (state, data) => {
            state.loadingGetMyJobs = false
            state.successGetMyJobs = false
        })
    }
})

// get my jobs - employer
const initStateGetMyJobsProcessing = {
    loadingGetMyJobsProcessing: false,
    successGetMyJobsProcessing: false,
    resultsProcessing: [],
    categoriesProcessing: [],
    totalResultsProcessing: 0
}

export const getMyJobsProcessingAction = createAsyncThunk(
    "get my processing jobs - employer",
    async (queryData) => {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('job')}`
            }
        }
        const {data} = await axios.get(`${apiUrl}/my/jobs?status=Processing&limit=${queryData.limit}&page=${queryData.page}`, config)
        console.log(data)
        return data
    }
)

export const getMyJobsProcessingSlice = createSlice({
    initialState: initStateGetMyJobsProcessing,
    name: "get my processing jobs - employer",
    extraReducers: (builder) => {
        builder.addCase(getMyJobsAction.pending, (state)=>{
            state.loadingGetMyJobs = true
        })
        builder.addCase(getMyJobsAction.fulfilled, (state, data) => {
            state.loadingGetMyJobs = false
            state.successGetMyJobs = data.payload.success
            state.resultsProcessing = data.payload.results
            state.categoriesProcessing = data.payload.categories
            state.totalResultsProcessing = data.payload.totalResults
        })
        builder.addCase(getMyJobsAction.rejected, (state, data) => {
            state.loadingGetMyJobs = false
            state.successGetMyJobs = false
        })
    }
})


// get my jobs - freelancer
const initStateGetMyJobsByFreelancer = {
    loadingGetMyJobsByFreelancer: false,
    successGetMyJobsByFreelancer: false,
    result: []
}

export const getMyJobsByFreelancerAction = createAsyncThunk(
    "get my jobs - freelancer",
    async (queryData) => {
        const {data} = await axios.get(`${apiUrl}/my/jobs?name=${queryData.name}&status=${queryData.status}&sortBy=${queryData.sortBy}&limit=${queryData.limit}&page=${queryData.page}&exclude=${queryData.exclude}`)

        return data
    }
)

export const getMyJobsByFreelancerSlice = createSlice({
    initialState: initStateGetMyJobsByFreelancer,
    name: "get my jobs - freelancer",
    extraReducers: (builder) => {
        builder.addCase(getMyJobsByFreelancerAction.pending, (state)=>{
            state.loadingGetMyJobsByFreelancer = true
        })
        builder.addCase(getMyJobsByFreelancerAction.fulfilled, (state, data) => {
            state.loadingGetMyJobsByFreelancer = false
            state.successGetMyJobsByFreelancer = data.payload.success
            state.result = data.payload.result
        })
        builder.addCase(getMyJobsByFreelancerAction.rejected, (state, data) => {
            state.loadingGetMyJobsByFreelancer = false
            state.successGetMyJobsByFreelancer = false
        })
    }
})

// create job
const initStateCreateJob = {
    loadingCreateJob: false,
    successCreateJob: false,
    job: {}
}

export const createJobAction = createAsyncThunk(
    "create job",
    async (jobData) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("job")}`
            }
        }
        const {data} = await axios.post(`${apiUrl}/jobs/create`, jobData, config)
        console.log(data)
        return data
    }
)

export const createJobSlice = createSlice({
    initialState: initStateCreateJob,
    name: "create job",
    extraReducers: (builder) => {
        builder.addCase(createJobAction.pending, (state)=>{
            state.loadingCreateJob = true
        })
        builder.addCase(createJobAction.fulfilled, (state, data) => {
            state.loadingCreateJob = false
            state.successCreateJob = data.payload.success
            state.job = data.payload.job
        })
        builder.addCase(createJobAction.rejected, (state, data) => {
            state.loadingCreateJob = false
            state.successCreateJob = false
        })
    }
})

// offer job
const initStateOfferJob = {
    loadingOfferJob: false,
    successOfferJob: false,
    offer: {}
}

export const offerJobAction = createAsyncThunk(
    "offer job",
    async ({offerData, id}) => {
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('job')}`
                }
            }
            const {data} = await axios.post(`${apiUrl}/jobs/${id}/offer`, offerData, config)
    
            return data
        }
        catch(error){
            console.log(error)
            return error.response.data
        }
    }
)

export const offerJobSlice = createSlice({
    initialState: initStateOfferJob,
    name: "offer job",
    extraReducers: (builder) => {
        builder.addCase(offerJobAction.pending, (state)=>{
            state.loadingOfferJob = true
        })
        builder.addCase(offerJobAction.fulfilled, (state, data) => {
            state.loadingOfferJob = false
            state.successOfferJob = data.payload.success
            state.offer = data.payload.offer
        })
        builder.addCase(offerJobAction.rejected, (state, data) => {
            state.loadingOfferJob = false
            state.successOfferJob = false
        })
    }
})


// get offers by job
const initStateGetOffersByJob = {
    loadingGetOffersByJob: false,
    successGetOffersByJob: false,
    offers: [],
    count: 0
}

export const getOffersByJobAction = createAsyncThunk(
    "get offer by job",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/jobs/${id}/offers`)

        return data
    }
)

export const getOffersByJobSlice = createSlice({
    initialState: initStateGetOffersByJob,
    name: "get offer by job",
    extraReducers: (builder) => {
        builder.addCase(getOffersByJobAction.pending, (state)=>{
            state.loadingGetOffersByJob = true
        })
        builder.addCase(getOffersByJobAction.fulfilled, (state, data) => {
            state.loadingGetOffersByJob = false
            state.successGetOffersByJob = data.payload.success
            state.offers = data.payload.offers
            state.count = data.payload.count
        })
        builder.addCase(getOffersByJobAction.rejected, (state, data) => {
            state.loadingGetOffersByJob = false
            state.successGetOffersByJob = false
        })
    }
})

// get offers by freelancer
const initStateGetOffersByFreelancer = {
    loadingGetOffersByFreelancer: false,
    successGetOffersByFreelancer: false,
    offers: [],
    count: 0
}

export const getOffersByFreelancerAction = createAsyncThunk(
    "get offer by job - freelancer",
    async () => {
        const {data} = await axios.get(`${apiUrl}/my/offers`)

        return data
    }
)

export const getOffersByFreelancerSlice = createSlice({
    initialState: initStateGetOffersByFreelancer,
    name: "get offer by job - freelancer",
    extraReducers: (builder) => {
        builder.addCase(getOffersByFreelancerAction.pending, (state)=>{
            state.loadingGetOffersByFreelancer = true
        })
        builder.addCase(getOffersByFreelancerAction.fulfilled, (state, data) => {
            state.loadingGetOffersByFreelancer = false
            state.successGetOffersByFreelancer = data.payload.success
            state.offers = data.payload.offers
            state.count = data.payload.count
        })
        builder.addCase(getOffersByFreelancerAction.rejected, (state, data) => {
            state.loadingGetOffersByFreelancer = false
            state.successGetOffersByFreelancer = false
        })
    }
})

// get offer by id
const initStateGetOffersById = {
    loadingGetOffersById: false,
    successGetOffersById: false,
    offer: {}
}

export const getOffersByIdAction = createAsyncThunk(
    "get offer by id",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/offers/${id}`)

        return data
    }
)

export const getOffersByIdSlice = createSlice({
    initialState: initStateGetOffersById,
    name: "get offer by id",
    extraReducers: (builder) => {
        builder.addCase(getOffersByIdAction.pending, (state)=>{
            state.loadingGetOffersById = true
        })
        builder.addCase(getOffersByIdAction.fulfilled, (state, data) => {
            state.loadingGetOffersById = false
            state.successGetOffersById = data.payload.success
            state.offer = data.payload.offer
        })
        builder.addCase(getOffersByIdAction.rejected, (state, data) => {
            state.loadingGetOffersById = false
            state.successGetOffersById = false
        })
    }
})


/* // select offer by id
const initStateEditOffersById = {
    loadingGetOffersById: false,
    successGetOffersById: false,
    offer: {}
}

export const editOffersByIdAction = createAsyncThunk(
    "offer job",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/offers/${id}`)

        return data
    }
)

export const editOffersByIdSlice = createSlice({
    initialState: initStateEditOffersById,
    name: "offer job",
    extraReducers: (builder) => {
        builder.addCase(editOffersByIdAction.pending, (state)=>{
            state.loadingGetOffersById = true
        })
        builder.addCase(editOffersByIdAction.fulfilled, (state, data) => {
            state.loadingGetOffersById = false
            state.successGetOffersById = data.payload.success
            state.offer = data.payload.offer
        })
        builder.addCase(editOffersByIdAction.rejected, (state, data) => {
            state.loadingGetOffersById = false
            state.successGetOffersById = false
        })
    }
}) */


// cancel offer job
const initStateCannelOffer = {
    loadingCannelOffer: false,
    successCannelOffer: false,
    offer: {}
}

export const cannelOfferAction = createAsyncThunk(
    "cancel offer",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/offers/${id}`)

        return data
    }
)

export const cannelOfferSlice = createSlice({
    initialState: initStateCannelOffer,
    name: "cancel offer",
    extraReducers: (builder) => {
        builder.addCase(cannelOfferAction.pending, (state)=>{
            state.loadingCannelOffer = true
        })
        builder.addCase(cannelOfferAction.fulfilled, (state, data) => {
            state.loadingCannelOffer = false
            state.successCannelOffer = data.payload.success
            state.offer = data.payload.offer
        })
        builder.addCase(cannelOfferAction.rejected, (state, data) => {
            state.loadingCannelOffer = false
            state.successCannelOffer = false
        })
    }
})


// report user
const initStateReportUser = {
    loadingReportUser: false,
    successReportUser: false,
    job: {}
}

export const reportUserAction = createAsyncThunk(
    "report user",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/jobs/${id}/report`)

        return data
    }
)

export const reportUserSlice = createSlice({
    initialState: initStateReportUser,
    name: "report user",
    extraReducers: (builder) => {
        builder.addCase(reportUserAction.pending, (state)=>{
            state.loadingReportUser = true
        })
        builder.addCase(reportUserAction.fulfilled, (state, data) => {
            state.loadingReportUser = false
            state.successReportUser = data.payload.success
            state.job = data.payload.job
        })
        builder.addCase(reportUserAction.rejected, (state, data) => {
            state.loadingReportUser = false
            state.successReportUser = false
        })
    }
})

// get newest jobs
const initStateGetNewestJobs = {
    loadingGetNewestJobs: false,
    jobs: [],
    categories: []
}

export const getNewestJobsAction = createAsyncThunk(
    "get newest jobs",
    async ({num, status}) => {
        const {data} = await axios.get(`${apiUrl}/jobs/newest?num=${num}&status=${status}`)
        console.log(data)
        return data
    }
)

export const getNewestJobsSlice = createSlice({
    initialState: initStateGetNewestJobs,
    name: "get newest jobs",
    extraReducers: (builder) => {
        builder.addCase(getNewestJobsAction.pending, (state)=>{
            state.loadingGetNewestJobs = true
        })
        builder.addCase(getNewestJobsAction.fulfilled, (state, data) => {
            state.loadingGetNewestJobs = false
            state.jobs = data.payload.jobs
            state.categories = data.payload.categories
        })
        builder.addCase(getNewestJobsAction, (state, data) => {
            state.loadingGetNewestJobs = false
        })
    }
})

//
// get intro
const initStateGetIntro = {
    loadingGetIntro: false,
    numCompanies: 0,
    numJobs: 0
}

export const getIntroAction = createAsyncThunk(
    "get intro",
    async () => {
        const {data} = await axios.get(`${apiUrl}/intro`)
        return data
    }
)

export const getIntroSlice = createSlice({
    initialState: initStateGetIntro,
    name: "get intro",
    extraReducers: (builder) => {
        builder.addCase(getIntroAction.pending, (state)=>{
            state.loadingGetIntro = true
        })
        builder.addCase(getIntroAction.fulfilled, (state, data) => {
            state.loadingGetIntro = false
            state.numJobs = data.payload.numJobs
            state.numCompanies = data.payload.numCompanies
        })
        builder.addCase(getIntroAction.rejected, (state, data) => {
            state.loadingGetIntro = false
        })
    }
})




// reducer
const jobReducer = combineReducers({
    queryJobs: queryJobsSlice.reducer,
    getJobById: getJobByIdSlice.reducer,
    deleteJobById: deleteJobByIdSlice.reducer,
    getMyJobs: getMyJobsSlice.reducer,
    getMyJobsByFreelancer: getMyJobsByFreelancerSlice.reducer,
    createJob: createJobSlice.reducer,
    offerJob: offerJobSlice.reducer,
    getOffersByJob: getOffersByJobSlice.reducer,
    getOffersByFreelancer: getOffersByFreelancerSlice.reducer,
    getOffersById: getOffersByIdSlice.reducer,
    cannelOffer: cannelOfferSlice.reducer,
    reportUser: reportUserSlice.reducer,
    getIntro: getIntroSlice.reducer,
    getNewestJobs: getNewestJobsSlice.reducer,
    getMyJobsProcessing: getMyJobsProcessingSlice.reducer,
    getJobs: getJobsSlice.reducer,
    myJobs: myJobsSlice.reducer,
});

export default jobReducer

