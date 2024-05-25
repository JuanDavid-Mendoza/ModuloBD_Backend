import { Router } from 'express';

/* profiles */
import {
  CreateProfile,
  GetProfiles,
} from './profiles'

const profileRouter = Router();
const profilesPath = '/profiles';

/* profiles */
profileRouter.post(`${profilesPath}/create`, CreateProfile);
profileRouter.get(`${profilesPath}/getAll`, GetProfiles);

export { profileRouter };