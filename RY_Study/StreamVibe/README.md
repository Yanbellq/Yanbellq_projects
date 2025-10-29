To run this project you will need have 
  1. jdk version 21 or newer
  2. (optionaly) docker-desktop or docker-engine

Firstly you open this project in your IDE, search file DemoApplication.java, run this file.
After you click run, project will be run in localhost:8081.
Next in your browser in search_tab type: <a href="http://127.0.0.1:8081/" targer="_blank">http://127.0.0.1:8081/</a>   or   <a href="http://localhost:8081/" targer="_blank">http://localhost:8081/</a>

And now I congratulate you, use it as you like)


------------------------------------------------------------------------------------------------------------


!OPTIONALY
If you want that you data from form will be save permanently use docker container db

  1.Search file application.properties<br>
  2.Uncomment 5,6,7 and 10,11,12 lines<br>
  3.Open terminal in project folder, and type: docker-compose up --build , this will be start project<br>

! Attention! If it takes a long time to load, don't worry, it just essentially creates a new container for the project each time, but the data is stored permanently. On average, the launch lasts from half a minute to three.

4. To stop the project, open a new terminal window in the project folder and type: docker-compose down
