import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/categories";

const RootPage = async () => {
  // serve component can access to database instead of fetch in Nextjs
  const categories = await prismadb.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      {/*<UserButton afterSignOutUrl="/sign-in" />*/}
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;
