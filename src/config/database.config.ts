import * as dotenv from 'dotenv'
dotenv.config()
import { registerAs } from '@nestjs/config';
import { User } from 'src/modules/users/entities/user.entity';
import { Club } from 'src/modules/clubs/entities/club.entity';
import { ClubStaff } from 'src/modules/club-staff/entities/club-staff.entity'; 

export default registerAs("database", () => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'loaclhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase',
    entities: [User, Club, ClubStaff],
    logging: true,
}))