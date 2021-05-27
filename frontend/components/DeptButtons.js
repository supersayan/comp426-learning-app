import Link from "next/link";

const DeptButtons = ({ departments = [] }) => {
  return (
    <div className="container flex flex-wrap mx-auto gap-2 mt-8">
      {departments.map((_dept) => (
        <Link href={`/departments/${_dept.name}`} key={_dept.did}>
          <a className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            {_dept.full_name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default DeptButtons;
