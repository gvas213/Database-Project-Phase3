CREATE OR REPLACE FUNCTION unsafe_course_srearch(course_name TEXT)
RETURNS SETOF public.courses
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY EXECUTE format('SELECT * FROM courses WHERE course_name LIKE ''%%%s%%''', course_name);
END;
$$;
