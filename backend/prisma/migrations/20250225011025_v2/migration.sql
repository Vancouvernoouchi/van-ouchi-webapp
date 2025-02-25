-- CreateTable
CREATE TABLE "owners" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "profile_image_url" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "memo" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "owner_id" UUID NOT NULL,
    "area_id" INTEGER NOT NULL,
    "closest_station_id" INTEGER NOT NULL,
    "rent_payment_method_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "zone" SMALLINT NOT NULL,
    "closest_station_duration" SMALLINT NOT NULL,
    "other_transportation" TEXT,
    "other_transportation_duration" SMALLINT,
    "thumbnail_url" VARCHAR(255),
    "google_photo_url" VARCHAR(255),
    "house_rules" TEXT,
    "rent_payment_day" VARCHAR(255),
    "countryId" INTEGER,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "closest_stations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "closest_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statuses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "country_id" INTEGER NOT NULL,
    "room_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "is_approved" BOOLEAN NOT NULL,
    "rent" DECIMAL(6,2) NOT NULL,
    "deposit" DECIMAL(6,2) NOT NULL,
    "move_out_date" DATE,
    "move_in_date" DATE,
    "thumbnail_url" VARCHAR(255),
    "google_photo_url" VARCHAR(255),
    "min_stay" SMALLINT,
    "is_female_only" BOOLEAN,
    "is_male_only" BOOLEAN,
    "has_gym" BOOLEAN,
    "has_pool" BOOLEAN,
    "has_sauna" BOOLEAN,
    "is_couple" BOOLEAN,
    "utilities_included" BOOLEAN,
    "has_laundry" BOOLEAN,
    "has_wifi" BOOLEAN,
    "has_lock" BOOLEAN,
    "housemate_share_count" SMALLINT,
    "bathroom_share_count" SMALLINT,
    "kitchen_share_count" SMALLINT,
    "staff_comment" TEXT,
    "area_description" TEXT,
    "restaurant_description" TEXT,
    "grocery_description" TEXT,
    "other_description" TEXT,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "owners_email_key" ON "owners"("email");

-- CreateIndex
CREATE INDEX "owner_id" ON "properties"("owner_id");

-- CreateIndex
CREATE INDEX "area_id" ON "properties"("area_id");

-- CreateIndex
CREATE INDEX "closest_station_id" ON "properties"("closest_station_id");

-- CreateIndex
CREATE INDEX "rent_payment_method_id" ON "properties"("rent_payment_method_id");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_rent_payment_method_id_fkey" FOREIGN KEY ("rent_payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_closest_station_id_fkey" FOREIGN KEY ("closest_station_id") REFERENCES "closest_stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
