import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export class UserRepository {
    async findByUsername(username: string) {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        return result[0] ?? null;
    }
}
