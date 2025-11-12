-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `dateRegistered` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `restaurantId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `priceRange` VARCHAR(191) NULL,
    `openingTime` DATETIME(3) NULL,
    `closingTime` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `ownerId` INTEGER NULL,

    PRIMARY KEY (`restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `branchId` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `restaurantId` INTEGER NOT NULL,

    PRIMARY KEY (`branchId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table` (
    `tableId` INTEGER NOT NULL AUTO_INCREMENT,
    `capacity` INTEGER NOT NULL,
    `tableNumber` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,

    PRIMARY KEY (`tableId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `reservationId` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationDateTime` DATETIME(3) NOT NULL,
    `numberOfPeople` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    PRIMARY KEY (`reservationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuisine` (
    `cuisineId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`cuisineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuItem` (
    `menuItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `numberOfPeople` INTEGER NULL,
    `cuisineId` INTEGER NOT NULL,

    PRIMARY KEY (`menuItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BranchCuisine` (
    `branchId` INTEGER NOT NULL,
    `cuisineId` INTEGER NOT NULL,

    PRIMARY KEY (`branchId`, `cuisineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Branch` ADD CONSTRAINT `Branch_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`tableId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_cuisineId_fkey` FOREIGN KEY (`cuisineId`) REFERENCES `Cuisine`(`cuisineId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BranchCuisine` ADD CONSTRAINT `BranchCuisine_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BranchCuisine` ADD CONSTRAINT `BranchCuisine_cuisineId_fkey` FOREIGN KEY (`cuisineId`) REFERENCES `Cuisine`(`cuisineId`) ON DELETE RESTRICT ON UPDATE CASCADE;
