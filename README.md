# USYDBC-WG-14-Tech-Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This website is a fully functional, full-stack tech blog, where you can create an account, post, comment and edit previous posts and comments.

## Table of Contents
 
[Installation](#Installation)   
[Usage](#Usage)   
[Link](#Link)  
[License](#License)    

<a name="Installation"></a>
## Installation

Install using git clone SSH:

```bash
git clone git@github.com:wilgru/USYDBC-WG-14-Tech-Blog.git
```

<a name="Usage"></a>
## Usage

Fist you need to set up your database. You can do this by using the schema.sql file found under /db. To do this run the following command in your Mysql shell:

```bash
SOURCE db/schema.db
```

Next is to seed the database. To seed the data base, run the following script:

```bash
npm run seed
```

This will give you some data to work with.

Now use the following command in your terminal to start your local server:

```bash
npm start
```

make sure you have all dependencies installed and have created your own local .env file to store your sql password and database.


<a name="Link"></a>
## Link

You can visit the deployed Tech Blog [here](https://usydbc-14-tech-blog.herokuapp.com/).

<a name="License"></a>
## License

&copy; William Gruszka

Licensed under the [MIT License](./LICENSE.txt)

