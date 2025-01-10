// import { GetServerSideProps } from "next";

// const ProfileRedirectPage = () => {
//   return <div>Redirecting...</div>;
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as { id: string };
// console.log(id);

//   if (id ) {
//     // To test redirection, directly use the destination URL
//     return {
//       redirect: {
//         destination: "/profile", // Manual redirection to /profile
//         permanent: false, // Temporary redirection
//       },
//     };
//   }

//   return {
//     props: {}, // No data if not redirected
//   };
// };

// export default ProfileRedirectPage;
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const ProfileRedirectPage = () => {
  const router = useRouter();

  // Redirecting logic - you can display a "Redirecting..." message while processing
  return <div>Redirecting...</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  console.log("Redirecting to profile with ID:", id);

  // If there's an ID, redirect to the profile page with the ID in the query
  if (id) {
    return {
      redirect: {
        destination: `/profile?id=${id}`, // Redirect to the profile page with the id as query param
        permanent: false, // Temporary redirection
      },
    };
  }

  // If no id is provided, you can either show an error or redirect to a default page
  return {
    props: {}, // No data if not redirected
  };
};

export default ProfileRedirectPage;

