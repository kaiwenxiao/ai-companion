import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  // serve component can access to database instead of fetch in Nextjs
  const categories = await prismadb.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      {/*<UserButton afterSignOutUrl="/sign-in" />*/}
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data}></Companions>
    </div>
  );
};

export default RootPage;
