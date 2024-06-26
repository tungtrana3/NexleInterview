import { loginAPI, singUpAPI } from "../user.api";
import { getCategoryAPI } from "../category.api";

describe('Fetching Tests', () => {
  it('Should return correct message', async () => {
    await loginAPI({
      'email': 'xuanha@gmail.com',
      "password": '123'
    });
    const post = await getCategoryAPI();
    expect(post.msg).toEqual(expect.stringContaining('Get category success'));
  });
})