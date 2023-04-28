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
    userId:{ // userId
        type: String,
        required:true,
    },
},
    {
        timestamps: true,    
    }
);

const AwardModel = model('Award', AwardSchema);

export { AwardModel };