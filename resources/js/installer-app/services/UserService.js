import api from "../http";

export default class UserService {
    static async updateProfile({avatar, name, email}) {
        const form = new FormData();

        form.append('name', name);
        form.append('email', email);

        if (avatar) form.append('avatar', avatar);
        
        return api.post('/user/edit', form);
    }

    static async updatePassword(passwords) {
        return api.post('/user/password', passwords);
    }
}