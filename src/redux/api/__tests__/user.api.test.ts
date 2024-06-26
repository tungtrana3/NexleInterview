import { HttpData } from "../../../helpers/api.helper";
import { LoginModel } from "../../../models";
import { loginAPI, singUpAPI } from "../user.api";

describe('Fetching Tests', () => {
    it('Should return correct userId', async () => {
        const post = await loginAPI({
            'email': 'xuanha@gmail.com',
            "password": '123'
        });
        expect(post.data?.user.id).toBe(330);
    });

    it('Should return correct email', () => {
        loginAPI({
            'email': 'xuanha@gmail.com',
            "password": '123'
        }).then((post: HttpData<LoginModel>) => {
            expect(post.data?.user.email).toEqual(expect.stringContaining('xuanha@gmail.com'));
        })
    });
})