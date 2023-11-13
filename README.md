# README
This is a Ruby on Rails with React Frontend Application for Managing Expense for users. 

Login page view,
![image](https://github.com/dhanavishnu13/Ruby-on-Rails-with-React/assets/83368841/279f0dce-f45b-4e70-aff4-cd879c45fd57)

Sign Up page
![image](https://github.com/dhanavishnu13/Ruby-on-Rails-with-React/assets/83368841/614a9172-2dfd-4a0c-8b1a-eb089c314682)

Inital Dashboard view
![image](https://github.com/dhanavishnu13/Ruby-on-Rails-with-React/assets/83368841/8179636d-2210-4c4a-94d3-97ad62aa91a3)

Here the Sample Dashboard view.
![image](https://github.com/dhanavishnu13/Ruby-on-Rails-with-React/assets/83368841/0a2b4324-4b46-4053-9c21-4a2f1e6f49ec)

* Database creation
  Here is the DB Scheme,
![Expense DB Scheme (1)](https://github.com/dhanavishnu13/Ruby-on-Rails-with-React/assets/83368841/a676b24f-b599-4b1f-abef-be50293e4a5f)

Teachinal Feature of the Application are:
- Authendication System: Bulit with signUp and SignIn
- Data Authorization: Each user has access to thier own data only
- Single Dashboard UI
- Summary Dashboard
- Filter based on Due Date
- Search for Payee Name

Installations
- rails new expense_app
- npm install --save react-route react-router react-router-dom axios --force
- npm install react-bootstrap bootstrap  

Startup Command
- Rails: '''rails s'''
- React: '''npm start'''

* Integrating authendication with User model
- rails g model User email password_digest

Some of the frequently used commands:
- rails new expense_app
- rails generate controller <controller_name>
- rails g model <model_name>
- rails g model User email password_digest
- rails g migration <migration_name>
- After updation of migration file use: rails db:migrate or rails db:migrate --trace
- After every cahnge to Gem file do: bundle install or bundle
- rails generate rspec:install
- To check available routes: rails routes
- To create basic DB: rails db:create

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version: ruby 3.2.2

* System dependencies:
  - Ruby installer for install Ruby and Rails
  - Node

* Configuration

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


