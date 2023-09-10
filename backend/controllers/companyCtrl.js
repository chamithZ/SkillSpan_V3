const Company = require('../models/Company')
const RoadMap = require('../models/RoadMap'); 

// add employee
const addCompany = async(req,res)=>{
    const newCompany = new Company({
        ...req.body
    })

    await newCompany.save().then(()=>{
        res.json(newCompany)
    }).catch((err)=>{
        res.json(err.message)
    })
}   

const getAllCompanies = async(req,res)=>{
    await Company.find().then((companies)=>{
        res.json(companies);
    }).catch((err)=>{
        res.json(err.message)
    })
}

const getOneCompany = async(req,res)=>{

    const id = req.params.id;
    const company = await Company.findById(id).then((company)=>{
        res.json(company)
    }).catch((err)=>{
        res.json(err.message)
    })
}

const deleteCompany = async(req,res)=>{

    const id = req.params.id 

    await Company.findByIdAndDelete(id).then(()=>{
        res.json("deleted company")
    }).catch((err)=>{
        res.json(err.message)
    })
}

const updateCompany = async(req,res)=>{
    const id = req.params.id

    const { Name,Address,companyRegID,industry,contactNumber,email} = req.body ;

    const updatedCompany = {
        Name,Address,companyRegID,industry,contactNumber,email
    }

    await Company.findByIdAndUpdate(id,updatedCompany).then(()=>{
        res.json(updatedCompany)
    }).catch((err)=>{
        res.json(err.message)
    })
}

const getRoadMapsByCompanyID = async(req,res)=>{
    const companyID = req.params.id; // Get the company ID from the request params

//   try {
//     const roadMaps = await RoadMap.find({ company: companyID })
//     res.json(roadMaps);
//   } catch (error) {
//     console.error('Error fetching roadmaps:', error);
//     res.status(500).json({ error: 'Error fetching roadmaps' });
//   }

    const roadMaps = await RoadMap.find({company:companyID}).then((roadMaps)=>{
        res.json(roadMaps)
    }).catch((error)=>{
        res.json(error.message)
    })
}






module.exports = {
    addCompany,
    getAllCompanies,
    getOneCompany,
    deleteCompany,
    updateCompany,
    getRoadMapsByCompanyID,
}