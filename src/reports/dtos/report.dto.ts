import { Expose, Transform } from 'class-transformer';

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    price: number;

    @Expose()
    year: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    mileage: string;

    @Expose()
    approved: boolean;

    @Transform(({ obj }) => {
        return { id: obj.user.id, email: obj.user.email };
    })
    @Expose()
    userData: object;
}
