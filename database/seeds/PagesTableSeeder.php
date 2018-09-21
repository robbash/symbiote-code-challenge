<?php

use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            \App\Page::create([
                'name' => $faker->unique()->text(50),
                'content' => $faker->paragraph
            ]);
        }
    }
}
