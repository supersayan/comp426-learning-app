import { useSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";
import React from "react";

export default function AuthButton() {
  const [ session, loading ] = useSession();

  if (!session) {
    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <span>
          {"Hello, " + session.user.name + " — "}
        </span>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  }
}

// const AuthButton = ({
//   session,
// }) => {
//   const signInButtonNode = () => {
//     if (session) {
//       return false;
//     }

//     return (
//       <div>
//         <Link href="/api/auth/signin">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               signIn();
//             }}
//           >
//             Sign In
//           </button>
//         </Link>
//       </div>
//     );
//   };

//   const signOutButtonNode = () => {
//     if (!session) {
//       return false;
//     }

//     return (
//       <div>
//         <Link href="/api/auth/signout">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               signOut();
//             }}
//           >
//             Sign Out
//           </button>
//         </Link>
//       </div>
//     );
//   };

//   return (
//     <div className="authButton">
//         {signOutButtonNode()}
//         {signInButtonNode()}
//     </div>
//   );
// };

// export const getServerSideProps = async ({ req }) => {
//   return {
//     props: {
//       session: await getSession(),
//     },
//   };
// };

// export default AuthButton;