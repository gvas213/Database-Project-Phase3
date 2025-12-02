CREATE TABLE courses
  ( course_num INT PRIMARY KEY
  , course_name VARCHAR(50) NOT NULL
  , course_description TEXT
  );

CREATE TABLE ap_courses
  ( course_num INT PRIMARY KEY
  , exam_date DATE NOT NULL
  , FOREIGN KEY (course_num) REFERENCES courses(course_num)
  );

CREATE TABLE prereqs
  ( course_num INT NOT NULL
  , prereq_num INT NOT NULL
  , FOREIGN KEY (course_num) REFERENCES courses(course_num)
  , FOREIGN KEY (prereq_num) REFERENCES courses(course_num)
  , PRIMARY KEY (course_num, prereq_num)
  );

CREATE TABLE teachers
  ( tid INT PRIMARY KEY
  , ssn CHAR(11) NOT NULL UNIQUE
  , fname VARCHAR(50) NOT NULL
  , lname VARCHAR(50) NOT NULL
  , email VARCHAR(100) NOT NULL
  , phone VARCHAR(15)
  , room_no INT
  );

CREATE TABLE administrators
  ( aid INT PRIMARY KEY
  , ssn CHAR(11) NOT NULL UNIQUE
  , fname VARCHAR(50) NOT NULL
  , lname VARCHAR(50) NOT NULL
  , email VARCHAR(100) NOT NULL
  , phone VARCHAR(15)
  , room_no INT
  );

CREATE TABLE supervises
  ( tid INT NOT NULL
  , aid INT NOT NULL
  , PRIMARY KEY (tid, aid)
  , FOREIGN KEY ( tid ) REFERENCES teachers(tid)
  , FOREIGN KEY ( aid ) REFERENCES administrators(aid)
  );


CREATE TABLE counselors
  ( cid INT PRIMARY KEY
  , ssn CHAR(11) NOT NULL UNIQUE
  , fname VARCHAR(50) NOT NULL
  , lname VARCHAR(50) NOT NULL
  , alpha_range CHAR(3)
  );

CREATE TABLE students
  ( sid INT PRIMARY KEY
  , cid INT NOT NULL REFERENCES counselors(cid)
  , ssn CHAR(11) NOT NULL UNIQUE
  , fname VARCHAR(50) NOT NULL
  , lname VARCHAR(50) NOT NULL
  , gpa REAL
  , dob DATE NOT NULL
  , email VARCHAR(100) NOT NULL UNiQUE
  , address VARCHAR(255)
  );

CREATE TABLE seniors
  ( sid INT PRIMARY KEY REFERENCES students(sid)
  , grad_status BOOLEAN );

CREATE TABLE juniors
  ( sid INT PRIMARY KEY REFERENCES students(sid)
  , sat SMALLINT  );

CREATE TABLE sophmores
  ( sid INT PRIMARY KEY REFERENCES students(sid)
  , psat SMALLINT );


CREATE TABLE sections
  ( section_id INT NOT NULL
  , course_num INT NOT NULL
  , tid INT NOT NULL
  , class_time VARCHAR(20) NOT NULL
  , room_no INT
  , PRIMARY KEY (section_id, course_num)
  , FOREIGN KEY (course_num) REFERENCES courses(course_num)
  , FOREIGN KEY (tid) REFERENCES  teachers(tid)
  );

CREATE TABLE enrollment
  ( sid INT not null
  , section_id INT not null
  , course_num INT not null
  , PRIMARY KEY (sid, section_id, course_num)
  , foreign key (sid) references students(sid)
  , foreign key (section_id, course_num) references sections(section_id, course_num)
  );
