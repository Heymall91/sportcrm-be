import * as dotenv from 'dotenv'
dotenv.config()
import { registerAs } from '@nestjs/config';
import { User } from 'src/modules/users/entities/user.entity';
import { Club } from 'src/modules/clubs/entities/club.entity';
import { ClubStaff } from 'src/modules/club-staff/entities/club-staff.entity'; 

export default registerAs("database", () => ({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'sportcrm-be',
    entities: [User, Club, ClubStaff]
}))