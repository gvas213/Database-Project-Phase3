LOAD DATA LOCAL INFILE
'../data/course.csv'
INTO TABLE courses
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(course_num, course_name, course_description);

LOAD DATA LOCAL INFILE
'../data/ap_course.csv'
INTO TABLE ap_courses
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(course_num, exam_date);

LOAD DATA LOCAL INFILE
'../data/prereq.csv'
INTO TABLE prereqs
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(course_num, prereq_num);

LOAD DATA LOCAL INFILE
'../data/teacher.csv'
INTO TABLE teachers
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(tid, ssn, fname, lname, email, phone, room_no);

LOAD DATA LOCAL INFILE
'../data/administrator.csv'
INTO TABLE administrators
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(aid, ssn, fname, lname, email, phone, room_no);

LOAD DATA LOCAL INFILE
'../data/supervises.csv'
INTO TABLE supervises
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(tid, aid);

LOAD DATA LOCAL INFILE
'../data/counselor.csv'
INTO TABLE counselors
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(cid, ssn, fname, lname, alpha_range );

LOAD DATA LOCAL INFILE
'../data/student.csv'
INTO TABLE students
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(sid, cid, ssn, fname, lname, gpa, dob, email, address);

LOAD DATA LOCAL INFILE
'../data/senior.csv'
INTO TABLE seniors
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(sid, grad_status);

LOAD DATA LOCAL INFILE
'../data/junior.csv'
INTO TABLE juniors
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(sid, sat);

LOAD DATA LOCAL INFILE
'../data/sophmore.csv'
INTO TABLE sophmores
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(sid, psat);

LOAD DATA LOCAL INFILE
'../data/section.csv'
INTO TABLE sections
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(section_id, course_num, tid, class_time, room_no);

LOAD DATA LOCAL INFILE
'../data/enroll.csv'
INTO TABLE enrollment
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(sid, section_id, course_num);
