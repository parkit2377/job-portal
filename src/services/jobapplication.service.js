const jobAppliesModel = require("../models/jobApplies.model")




const jobApplicationService = async(body , user) => {
    const application = await jobAppliesModel.create(body)
}