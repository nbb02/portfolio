import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const profiles = pgTable("profiles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: uuid().notNull(),
  username: varchar({ length: 255 }),
  first_name: varchar({ length: 255 }).notNull(),
  middle_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatar_image: text(),
  cover_photo: text(),
  role: varchar({ length: 45 }),
  about: text(),
  country: varchar({ length: 128 }),
  province: varchar({ length: 128 }),
  city: varchar({ length: 128 }),
  created_at: timestamp().defaultNow().notNull(),
})
