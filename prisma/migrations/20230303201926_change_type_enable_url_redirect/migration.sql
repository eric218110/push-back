/*
  Warnings:

  - Changed the type of `enable_url_redirect` on the `SettingWebPush` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SettingWebPush" DROP COLUMN "enable_url_redirect",
ADD COLUMN     "enable_url_redirect" INTEGER NOT NULL;
