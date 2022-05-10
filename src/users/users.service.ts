import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    fundOne(id: number) {
        return this.repo.findOne(id);
    }

    find(email: string) {
        return this.repo.find({ email: email });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.fundOne(id);
        if (!user) {
            throw new Error('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    // remove(id: number) {
    //     const user = this.repo.remove(id);
    //     return this.repo.delete(user);
    // }
}
