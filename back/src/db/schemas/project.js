import { Schema, model } from 'mongoose';
// import { UserModel } from './user';

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
    userId:{ // 참조할 User Schema
        type: String
        ,required: true
        ,ref: 'User' // UserModel 이름
        ,
    }
},
    {
        timestamps: true,    
    }
);

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };