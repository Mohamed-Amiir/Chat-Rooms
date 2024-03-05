import { Request, Response, NextFunction } from 'express';
import validator from '../util/userValidatior';

const validate = (req: any, res: Response, next: NextFunction): void => {
  let valid = validator.validate(req.body);
  if (valid) {
    req.valid = 1;
    next();
  } else {
    res.status(403).send('Forbidden command !!');
  }
};

export default validate;
