import { Schema, model } from 'mongoose';

// project schema
const ProjectSchema = new Schema({
    projectName:{ // 프로젝트 이름
        type:String
        ,required: true
        ,
    },
    startDate :{ // 프로젝트 시작 날짜
        type: Date
        ,required: true
        ,
    },
    endDate:{ // 프로젝트 종료 날짜
        type: Date
        ,required : true
        ,
    },
    content :{ // 프로젝트 설명
        type: String
        ,required: true
        ,
    },
    userId:{ // userId
        type: String,
        required:true,
    }
},
    {
        timestamps: true,    
    }
);

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };