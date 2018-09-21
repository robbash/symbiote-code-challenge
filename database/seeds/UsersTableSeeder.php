<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\User::create([
            'name' => 'test1',
            'email' => 'test1@test1.com',
            'password' => bcrypt('test1')
        ]);
        \App\User::create([
            'name' => 'john',
            'email' => 'john@doe.com',
            'password' => bcrypt('doe')
        ]);
    }
}
