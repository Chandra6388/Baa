import { Schema , model} from "mongoose";

const adminActivityLogModel = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    activity_type: {
        type: String,
        enum: ['login', 'logout', 'update', 'delete'],
        required: true
    },
    details: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}); 
const adminActivityLog = model('adminActivityLogs', adminActivityLogModel);
export default adminActivityLog;