import { CategoryModel } from '../../models';
import { HttpData, api } from '../../helpers/api.helper';
import { CategoryDTO } from '../../dto/category.dto';
import { userData } from '../../configs';

export async function getCategoryAPI(): Promise<HttpData<CategoryModel[]>> {
  api.setHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + userData.accessToken
  })
  let result: any = api
    .get('categories')
    .then(res => {
      if (res.ok) {
        return { data: res.data as CategoryModel[], msg: 'Get category success' };
      }
      if (res.problem) {
        return { error: true, msg: 'Something wrong, pleas try again!' };
      }
    })
  return result
}