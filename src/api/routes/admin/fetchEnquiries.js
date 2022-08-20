import {Router} from 'express';
import {formatFromError} from '../../../utils/helpers';

const router = Router();

router.get('/enquiries', async (req, res) => {
  try{
    res.status(200).send({enquiries, success: true});
  }catch(error){
    console.log(error);
    const {status, ...data} = formatFromError(error);
    res.status(status).send(data);
  }
});

export default router;