import { LoginDTO } from '../../dto';
import { LoginModel, SignUpModel, UserModel } from '../../models';
import { HttpData, api } from '../../helpers/api.helper';
import { strings } from '../../constants';
import { ApiResponse } from 'apisauce';

export async function loginAPI({
  ...payload
}: LoginDTO): Promise<HttpData<LoginModel>> {
  const result: any = api
    .post('auth/signin', payload)
    .then((res: ApiResponse<any>) => {
      if (res.ok) {
        return { data: res.data as SignUpModel, msg: res.data?.message ? res.data?.message : 'SignUp Success' };
      }
      if (res.problem) {
        return { error: true, msg: res.data.message ? res.data?.message : strings.somethingsWrong };
      }
    })
  return result
}

export async function singUpAPI({
  ...payload
}: LoginDTO): Promise<HttpData<SignUpModel>> {
  let result: any = api
    .post('auth/signup', payload)
    .then((res: ApiResponse<any>) => {
      if (res.ok) {
        return { data: res.data as SignUpModel, msg: res.data.message ? res.data.message : 'Signin Success' };
      }
      if (res.problem) {
        return { error: true, msg: res.data.message ? res.data.message : strings.somethingsWrong };
      }
    })
  return result
}
