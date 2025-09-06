import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);
  // 12:05
  return (
    <>
      <Header />
    </>
  );
};

export default BookingsPage;
