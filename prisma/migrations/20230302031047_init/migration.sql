-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "app_name" TEXT NOT NULL,
    "app_token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelsApplication" (
    "id" SERIAL NOT NULL,
    "webpush" BOOLEAN NOT NULL DEFAULT false,
    "email" BOOLEAN NOT NULL DEFAULT false,
    "sms" BOOLEAN NOT NULL DEFAULT false,
    "applicationId" INTEGER NOT NULL,

    CONSTRAINT "ChannelsApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SettingWebPush" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "url_icon" TEXT NOT NULL,
    "message_text_allow_notification" TEXT NOT NULL,
    "allow_button_text" TEXT NOT NULL,
    "deny_button_text" TEXT NOT NULL,
    "message_title" TEXT NOT NULL,
    "message_text" TEXT NOT NULL,
    "enable_url_redirect" BOOLEAN NOT NULL,
    "url_redirect" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,

    CONSTRAINT "SettingWebPush_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_app_name_key" ON "Application"("app_name");

-- CreateIndex
CREATE UNIQUE INDEX "Application_app_token_key" ON "Application"("app_token");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelsApplication_applicationId_key" ON "ChannelsApplication"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "SettingWebPush_applicationId_key" ON "SettingWebPush"("applicationId");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelsApplication" ADD CONSTRAINT "ChannelsApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SettingWebPush" ADD CONSTRAINT "SettingWebPush_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
