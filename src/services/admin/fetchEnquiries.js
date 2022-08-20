import {EnquiryLog} from '../../models';

const fetchEnquiries = async () => {
  try{
    return await EnquiryLog.find({'status.state': 'PENDING'})
      .sort({createdAt: 'desc'}).
      limit(50).
      populate('provider', 'name').exec();
  }catch(error){
    throw error;
  }
};

export default fetchEnquiries;