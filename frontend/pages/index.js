import Head from "next/head";
import CoursesList from "../components/CoursesList";
import { getCourses } from "../utils/api";

const HomePage = ({ courses }) => {
  return (
    <div>
      <Head>
        <title>question bank</title>
      </Head>
      <CoursesList courses={courses} />
    </div>
  );
};

export async function getStaticProps() {
  const courses = await getCourses();
  return { props: { courses } };
}

export default HomePage;
