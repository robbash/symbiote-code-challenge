# Symbiote Code Challenge

This is my solution to the [Symbiote developer
excercise](https://github.com/symbiote/developer-exercise/blob/master/overview.md).

## Tech

Frameworks used:

* [Laravel](https://laravel.com)
* [ReactJS](https://reactjs.org/)

## Setup and running

This is a guide to get the project running on Linux/macOS. Please make sure to
meet the requirements:

* [Laravel
requirements](https://laravel.com/docs/5.7/installation#server-requirements)
* a MySQL/MariaDB database
* [Composer](https://getcomposer.org)
* [NPM](https://www.npmjs.com)

Then follow these steps:

    # Checkout this repo
    git clone git@github.com:robbash/symbiote-code-challenge.git

    # Go to the project directory
    cd symbiote-code-challenge

    # Copy `.env.example` to `.env` and adjust content as needed
    cp .env.example .env
    vim .env

    # Run composer
    composer install

    # Run NPM (optional, compiled `dev` version in repo included)
    npm i
    npm run dev

    # Run database migrations and seeders
    php artisan migrate
    php artisan php artisan db:seed --class=PagesTableSeeder
    php artisan php artisan db:seed --class=UsersTableSeeder

    # Run Laravel's `artisan` command to run web server
    # This will serve for without bind address on port 8000. Use `--port=` to
    # specify a different port.
    php artisan serve --host=0.0.0.0

Now you should be able to access the app via browser. To login use one of the
users defined in the `UsersTableSeeder`:

* email: john@doe.com; password: doe
* email: test1@test1.com; password: test1

You need to sign in to edit/add pages. The session is only valid until you leave
or refresh the page.

## What else

The app is supposed to give an overview of how I use to code. There is a certain
influence from the frameworks on code style and patterns used. There may also be
some default functionality that is not disabled or removed from the code. I have
hardly commented the code for I think it is easy to understand when comfortable
with the frameworks.
