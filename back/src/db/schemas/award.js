import { Schema, model } from 'mongoose';

// award schema
const AwardSchema = new Schema({
    awardName:{ // award 이름
        type:String
        ,required: true
        ,
    },
    date :{ // award 시작 날짜
        type: Date
        ,required: true
        ,
    },
    organization:{ // award 발급 기관
        type: String
        ,required: true
        ,
    }
    ,
    content :{ // award 설명
        type: String
        ,required: true
        ,
    }, 
    userId:{ // userId
        type: String,
    },
},
    {
        timestamps: true,    
    }
);

const AwardModel = model('Award', AwardSchema);

export { AwardModel };