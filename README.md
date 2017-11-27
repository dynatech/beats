# beats
Builder of End-to-end Automated Tests System


/*****************************************************************************/

Dependencies:

1. Node JS v6.10.3
2. Log4JS v1.0 (node module)
3. Chrome Driver (node module)
4. Q Library (node module)

/*****************************************************************************/

Check these environment paths on your pc:
My current directory for <node_modules_path> = C:\Users\PradoArturo\node_modules

a. Selenium Web Driver path
<node_modules_path>\selenium-webdriver

b. Chrome Driver path
<node_modules_path>\chromedriver\lib\chromedriver

c. Log4JS path
<node_modules_path>\log4js

d. Q path
<node_modules_path>\q\

/*****************************************************************************/

Database initialization:

1. Run on your browser "http://localhost/api/initDB.php"
- Note: you can replace "localhost" with your chosen vhost path if you are 
	hosting multiple repositories on your development computer

Populate your database with test data:

2. Look for the file located at "api/beats.sql" and import it using MySQL

/*****************************************************************************/