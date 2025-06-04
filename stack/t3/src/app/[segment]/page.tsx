import { notFound } from "next/navigation"
import { NAVITEMS, type ModelName, type ApiListResponse } from "~/types/types"
import PageLayout from "~/app/_components/PageLayout"
import ApiClient from "~/app/_components/ApiClient"
import { CardWrapper } from "../_components/ContentTypes"
import { SelectionCount } from "../_components/SelectionCount"

interface PageProps {
  params: {
    segment: string
  }
}

// This enables static generation for all nav item segments
export function generateStaticParams() {
  return NAVITEMS.map((item) => ({
    segment: item.segment,
  }))
}

// This enables dynamic data fetching at request time
export const dynamic = 'force-dynamic'
export const revalidate = 0


export default async function DynamicPage({ params }: PageProps) {
  const { segment } = params;

  const navItem = NAVITEMS.find(item => item.segment === segment)

  if (!navItem) {
    notFound()
  }

  const response = await ApiClient.get<ApiListResponse<T>>(navItem.api)

  return (
    <PageLayout navItem={navItem}>
      <div id="EntityList">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {navItem.plural} ({navItem.permissions})
          </p>
          <SelectionCount type={navItem.type} />
        </div>
        <div>

          {response.error ? (
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-red-700">
              {response.error}
            </div>
          ) : (!response.success || !response.data) ? (<div className="p-4 border border-red-200 bg-red-50 rounded-lg text-red-700">
            {response.error}
          </div>) : (
            <div className="mt-4">
              {response.data.results.length > 0 ? (
                <div className="grid gap-4">
                  {response.data.results.map((item: any) => {
                    return <CardWrapper key={item.id} item={item} navItem={navItem} />
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No {navItem.plural.toLowerCase()} found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
} 