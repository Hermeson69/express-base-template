CREATE TABLE `todo_lists_table` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`deliverySchedule` text NOT NULL,
	`isCompleted` text DEFAULT 'false' NOT NULL,
	`userId` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);