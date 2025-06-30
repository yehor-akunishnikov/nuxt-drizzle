CREATE TABLE "fragments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "fragments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"author_id" integer,
	"text" varchar(255) NOT NULL,
	"note" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fragments" ADD CONSTRAINT "fragments_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;