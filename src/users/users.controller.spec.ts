import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUsersService = {
            findOne: (id: number) => {
                return Promise.resolve({
                    id,
                    email: 'test@gmail.com',
                    password: '12345',
                } as User);
            },
            find: (email: string) => {
                return Promise.resolve([
                    {
                        id: 1,
                        email,
                        password: '12345',
                    } as User,
                ]);
            },
            // remove: () => {},
            // update: () => {},
        };

        fakeAuthService = {
            // signup: () => {},
            // signin: () => {},
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // it('findAllUsers returns a list of users with given email', async () => {
    //     const users = await controller.findAllUsers('test@gmail.com');
    //     expect(users.length).toEqual(1);
    //     expect(users[0].email).toEqual('test@gmail.com');
    // });
});
