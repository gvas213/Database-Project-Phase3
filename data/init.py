from faker import Faker
import random
import csv


NUM_ROWS = 50

fake = Faker()

fall_grades_file = open("24F.csv", mode="r", newline="")
fall_grades = csv.DictReader(fall_grades_file)


def id():
    return fake.random_number(digits=6, fix_len=True)


def address():
    return fake.address().replace("\n", ", ")


def run_gen(gen, rows):
    return [[x[1]() for x in gen] for _ in range(rows)]


def header(gen):
    return [x[0] for x in gen]


counselor_gen = [
    ("cid", id),
    ("ssn", fake.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("alpha_range", lambda: random.choice(["A-G", "G-N", "N-T", "T-Z"])),
]

counselors = run_gen(counselor_gen, 50)

cids = [x[0] for x in counselors]


student_gen = [
    ("sid", id),
    ("cid", lambda: random.choice(cids)),
    ("ssn", fake.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("gpa", lambda: fake.random_int(min=0, max=4)),
    ("dob", fake.date_of_birth),
    ("email", fake.email),
    ("address", address),
]

students = run_gen(student_gen, 1000)
random_sids = random.sample([x[0] for x in students], len(students))

senior_gen = [("sid", lambda: random_sids.pop()), ("grad_status", fake.boolean)]
seniors = run_gen(senior_gen, 30)

junior_gen = [
    ("sid", lambda: random_sids.pop()),
    ("sat", lambda: fake.random_int(min=500, max=1600)),
]
juniors = run_gen(junior_gen, 30)

sophmore_gen = [
    ("sid", lambda: random_sids.pop()),
    ("psat", lambda: fake.random_int(min=500, max=1600)),
]

sophmores = run_gen(sophmore_gen, 30)

teacher_gen = [
    ("tid", id),
    ("ssn", fake.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("email", fake.email),
    ("phone", fake.phone_number),
    ("room_no", id),
]

teachers = run_gen(teacher_gen, 77)

administrator_gen = [
    ("aid", id),
    ("ssn", fake.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("email", fake.email),
    ("phone", fake.phone_number),
    ("room_no", id),
]

administrators = run_gen(administrator_gen, 33)

random_teachers = random.sample([x[0] for x in teachers], len(teachers))

supervises_gen = [
    ("aid", lambda: random.choice(administrators)[0]),
    ("tid", lambda: random_teachers.pop()),
]
supervises = run_gen(supervises_gen, 77)


course_nums = list(set(x["Subject"] + x["Catalog Nbr"] for x in fall_grades))

random_course_nums = course_nums.copy()
course_gen = [
    ("course_num", id),
    ("course_name", lambda: random_course_nums.pop()),
    ("course_description", fake.sentence),
]
courses = run_gen(course_gen, len(course_nums))

ap_course_gen = [
    ("course_num", id),
    ("exam_date", lambda: fake.date_between(start_date="today", end_date="+1y")),
]

ap_courses = run_gen(ap_course_gen, 50)

prereq_gen = [
    ("course_num", lambda: random.choice(course_nums)),
    ("prereq_num", lambda: random.choice(course_nums)),
]

prereqs = run_gen(prereq_gen, 100)


section_gen = [
    ("section_id", id),
    ("course_number", lambda: random.choice(course_nums)),
    ("tid", lambda: random.choice(teachers)[0]),
    ("time", lambda: f"{fake.day_of_week()} {fake.time(pattern="%H:%M")}"),
    ("room_no", id),
]

sections = run_gen(section_gen, len(courses) * 3)

enroll_gen = [
    ("sid", lambda: random.choice(students)[0]),
    ("section_id", id),
    ("course_number", lambda: random.choice(course_nums)),
]

enrolls = run_gen(enroll_gen, 4000)


def write_fake_csv(file_name, fake_header, fake_data):

    with open(file_name, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)

        writer.writerow(fake_header)

        for row in fake_data:
            writer.writerow(row)


write_fake_csv("student.csv", header(student_gen), students)
write_fake_csv("senior.csv", header(senior_gen), seniors)
write_fake_csv("junior.csv", header(junior_gen), juniors)
write_fake_csv("sophmore.csv", header(sophmore_gen), sophmores)
write_fake_csv("teacher.csv", header(teacher_gen), teachers)
write_fake_csv("administrator.csv", header(administrator_gen), administrators)
write_fake_csv("supervises.csv", header(supervises_gen), supervises)
write_fake_csv("course.csv", header(course_gen), courses)
write_fake_csv("ap_course.csv", header(ap_course_gen), ap_courses)
write_fake_csv("prereq.csv", header(prereq_gen), prereqs)
write_fake_csv("section.csv", header(section_gen), sections)
write_fake_csv("enroll.csv", header(enroll_gen), enrolls)
