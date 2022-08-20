import jwt from 'jsonwebtoken';
import {User} from '../../models';
import {formatFromError} from '../../utils/helpers';
import config from '../../config';

const removeTokenFromUser = async (token, User) => {
  try{
    await User.updateOne({'tokens.token': token}, {$pull: {tokens: token}});
  }catch(error){
    throw error;
  }
}

export const verifyToken = async ({token}) => {
  try{
    return jwt.verify(token, config.JWTSecret);
  }catch(error){
    console.log(error);
    await removeTokenFromUser(token, User);
    throw {status: 401, msgText: 'Not authorised!', error: new Error()};
  }
}

const auth = (authorisedRoles=null) => async (req, res, next) => {
  try{
    if(!req.header('Authorization')){
      throw {status: 401, msgText: 'Not authorised!', error: new Error()};
    }

    const token = req.header('Authorization').replace('Bearer ', '');
    const {_id, mobile, role} = await verifyToken({token});

    if(authorisedRoles && !authorisedRoles.includes(role)){
      await removeTokenFromUser(token, User);
      throw {status: 401, msgText: 'Not authorised!', error: new Error()};
    }

    const user = await User.findOne({_id, phone: mobile, role, isActive: true});

    if(!user){
      throw {status: 401, msgText: 'Not authorised!', error: new Error()};
    }

    req.user = user.toJSON();
    req.authToken = token;
    next();
  }catch(error){
    console.log(error);
    const {status, ...data} = formatFromError(error);
    return res.status(status).send(data);
  } 
}

export default auth;