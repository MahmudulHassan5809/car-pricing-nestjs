import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(
                    (user) => user.email === email,
                );

                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 99999999),
                    email,
                    password,
                } as User;

                users.push(user);

                return Promise.resolve(user);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('create a new user with a salted and hashed password', async () => {
        const user = await service.signup('test@gmail.com', '12345');
        expect(user.password).not.toEqual('12345');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user sign up with email that is in use', async () => {
        await service.signup('test@gmail.com', '12345');
        try {
            await service.signup('test@gmail.com', '12345');
        } catch (error) {}
    });

    it('throws if signin is called with an unused email', async () => {
        try {
            await service.signin('test@gmail.com', '12345');
        } catch (error) {}
    });

    it('throws if an invalid password provided', async () => {
        await service.signup('test@gmail.com', '12345');
        try {
            await service.signin('test@gmail.com', '123455');
        } catch (error) {}
    });

    it('return a user if password is correct', async () => {
        await service.signup('test@gmail.com', '12345');
        const user = await service.signin('test@gmail.com', '12345');
        expect(user).toBeDefined();
    });
});
