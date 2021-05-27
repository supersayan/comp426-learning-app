import Head from "next/head";
import { useRouter } from "next/router";
import CoursesList from "../../components/CoursesList";
import { getDepartments, getDepartmentByName } from "../../utils/api";

const DeptPage = ({ dept }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading dept...</div>;
  }

  return (
    <div>
      <Head>
        <title>{dept.name}</title>
      </Head>
      <CoursesList courses={dept.courses} dept={dept}/>
    </div>
  )
};

export default DeptPage;

export async function getStaticProps({ params }) {
  const dept = await getDepartmentByName(params.slug);
  return { props: { dept } };
}

export async function getStaticPaths() {
  const departments = await getDepartments();
  if (departments)
    return {
      paths: departments.map((_department) => {
        return {
          params: { slug: _department.name },
        };
      }),
      fallback: true,
    };
  else return {fallback: true};
}
